import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";
import { Cat } from "@/types";

const FALLBACK_FILE_PATH = path.join(process.cwd(), "data", "cats_fallback.json");

// Helper to interact with a local mock database when Vercel KV is unavailable
function getFallbackCats(): Cat[] {
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(FALLBACK_FILE_PATH, "utf-8");
    return JSON.parse(data) as Cat[];
  } catch (err) {
    console.error("Failed to read fallback cats:", err);
    return [];
  }
}

function saveFallbackCats(cats: Cat[]) {
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(cats, null, 2));
  } catch (err) {
    console.error("Failed to save fallback cats:", err);
  }
}

// Is Vercel KV fully configured?
const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export const db = {
  async getCats(): Promise<Cat[]> {
    if (isKvConfigured) {
      try {
        const cats = await kv.get<Cat[]>("cats");
        return cats || [];
      } catch (err) {
        console.error("Vercel KV get error, falling back to local storage:", err);
        return getFallbackCats();
      }
    }
    return getFallbackCats();
  },

  async saveCat(cat: Cat): Promise<Cat[]> {
    if (isKvConfigured) {
      try {
        const cats = await this.getCats();
        // FIFO limit to 200 cats
        const updated = [cat, ...cats].slice(0, 200);
        await kv.set("cats", updated);
        return updated;
      } catch (err) {
        console.error("Vercel KV set error, falling back to local storage:", err);
      }
    }
    const cats = getFallbackCats();
    const updated = [cat, ...cats].slice(0, 200);
    saveFallbackCats(updated);
    return updated;
  }
};
