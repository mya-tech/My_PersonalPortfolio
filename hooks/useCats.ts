import useSWR from "swr";
import { Cat } from "@/types";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch cat data");
  }
  return res.json();
};

export function useCats() {
  const { data, error, isLoading, mutate } = useSWR<{ cats: Cat[]; total: number }>(
    "/api/cats",
    fetcher
  );

  const addCat = async (newCat: Omit<Cat, "id" | "createdAt"> & { image: string }) => {
    const res = await fetch("/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCat),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to add new cat");
    }

    const result = await res.json();
    
    // Revalidate the SWR cache with the response
    mutate();
    return result.cat;
  };

  return {
    cats: data?.cats || [],
    total: data?.total || 0,
    error,
    isLoading,
    addCat,
  };
}
