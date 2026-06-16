import { CatAsset } from "@/types";

export const CAT_BASES: CatAsset[] = [
  { id: "business", label: "Business Cat", imagePath: "💼", category: "base" },
  { id: "keyboard", label: "Keyboard Cat", imagePath: "🎹", category: "base" },
  { id: "smudge", label: "Smudge Cat", imagePath: "🍽️", category: "base" },
  { id: "loaf", label: "Loaf Cat", imagePath: "🍞", category: "base" },
  { id: "grumpy", label: "Grumpy Cat", imagePath: "😾", category: "base" },
  { id: "nyan", label: "Nyan Cat", imagePath: "🌈", category: "base" }
];

export const CAT_HATS: CatAsset[] = [
  { id: "hat-beret", label: "Beret", imagePath: "🎨", category: "hat" },
  { id: "hat-grad", label: "Graduation Cap", imagePath: "🎓", category: "hat" },
  { id: "hat-cowboy", label: "Cowboy Hat", imagePath: "🤠", category: "hat" },
  { id: "hat-beanie", label: "Beanie", imagePath: "🧶", category: "hat" },
  { id: "hat-party", label: "Party Hat", imagePath: "🥳", category: "hat" },
  { id: "hat-crown", label: "Crown", imagePath: "👑", category: "hat" }
];

export const CAT_ITEMS: CatAsset[] = [
  { id: "item-laptop", label: "Laptop", imagePath: "💻", category: "item" },
  { id: "item-coffee", label: "Coffee Cup", imagePath: "☕", category: "item" },
  { id: "item-sunglasses", label: "Sunglasses", imagePath: "🕶️", category: "item" },
  { id: "item-headphones", label: "Headphones", imagePath: "🎧", category: "item" },
  { id: "item-book", label: "Book", imagePath: "📖", category: "item" },
  { id: "item-code", label: "Code Bracket", imagePath: "⚙️", category: "item" }
];

// Helper to look up assets
export const getCatAsset = (id: string): CatAsset | undefined => {
  return [...CAT_BASES, ...CAT_HATS, ...CAT_ITEMS].find(asset => asset.id === id);
};
