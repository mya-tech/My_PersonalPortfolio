import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/kv";
import { Cat } from "@/types";

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();
const ONE_HOUR = 60 * 60 * 1000;

export async function GET() {
  try {
    const cats = await db.getCats();
    return NextResponse.json({ cats, total: cats.length }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to load cats in GET /api/cats:", err);
    return NextResponse.json(
      { message: "Failed to load cats", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, role, baseId, accessoryIds, image } = body;

    // 1. Basic validation
    if (!name || !role || !baseId || !image) {
      return NextResponse.json(
        { message: "Missing required fields (name, role, baseId, and image canvas preview are required)." },
        { status: 400 }
      );
    }

    if (name.trim().length > 20) {
      return NextResponse.json(
        { message: "Cat name must be 20 characters or less." },
        { status: 400 }
      );
    }

    if (role.trim().length > 30) {
      return NextResponse.json(
        { message: "Job title must be 30 characters or less." },
        { status: 400 }
      );
    }

    // 2. IP-based rate limiting (1 cat per IP per hour)
    // Extract client IP address from headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    
    const now = Date.now();
    const lastSubmission = rateLimitMap.get(ip);

    if (lastSubmission && now - lastSubmission < ONE_HOUR) {
      const remainingMinutes = Math.ceil((ONE_HOUR - (now - lastSubmission)) / 60000);
      return NextResponse.json(
        { message: `Rate limit exceeded. Please wait ${remainingMinutes} more minute(s) before joining again.` },
        { status: 429 }
      );
    }

    // 3. Construct new Cat object
    const newCat: Cat & { image: string } = {
      id: `cat-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      role: role.trim(),
      baseId,
      accessoryIds: accessoryIds || [],
      image,
      createdAt: new Date().toISOString()
    };

    // 4. Save to Vercel KV / local fallback database
    const updatedCats = await db.saveCat(newCat);

    // Update the rate limiter timestamp for this IP
    rateLimitMap.set(ip, now);

    return NextResponse.json(
      { success: true, cat: newCat, total: updatedCats.length },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to add cat in POST /api/cats:", err);
    return NextResponse.json(
      { message: "Failed to create team member", error: errorMessage },
      { status: 500 }
    );
  }
}
