"use client";

import React, { useRef, useEffect } from "react";
import { getCatAsset } from "@/data/cats";

interface CatCanvasProps {
  baseId: string;
  accessoryIds: string[];
  width?: number;
  height?: number;
  onExport?: (base64: string) => void;
  className?: string;
}

export const CatCanvas: React.FC<CatCanvasProps> = ({
  baseId,
  accessoryIds,
  width = 200,
  height = 200,
  onExport,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas (keep transparent)
    ctx.clearRect(0, 0, width, height);

    // Setup Text styles for Emojis
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 1. Draw Special Base Backgrounds (e.g. Nyan Cat Rainbow)
    if (baseId === "nyan") {
      ctx.font = `${width * 0.45}px Arial`;
      // Draw a rainbow offset to the left/background
      ctx.fillText("🌈", width * 0.35, height * 0.45);
    }

    // 2. Draw Cat Base Face / Body
    let baseEmoji = "🐱";
    if (baseId === "grumpy") baseEmoji = "😾";
    else if (baseId === "loaf") baseEmoji = "🍞"; // Loaf cat body
    else if (baseId === "business") baseEmoji = "😸";
    else if (baseId === "keyboard") baseEmoji = "🐱";
    else if (baseId === "smudge") baseEmoji = "😿";

    ctx.font = `${width * 0.55}px Arial`;
    // Draw the main cat body/face in the center
    ctx.fillText(baseEmoji, width * 0.5, height * 0.5);

    // If loaf cat, overlay a cute cat face on the bread
    if (baseId === "loaf") {
      ctx.font = `${width * 0.3}px Arial`;
      ctx.fillText("🐱", width * 0.5, height * 0.4);
    }

    // 3. Draw Base Special Accessories
    if (baseId === "business") {
      ctx.font = `${width * 0.25}px Arial`;
      ctx.fillText("👔", width * 0.5, height * 0.72); // Suit tie at neck
    } else if (baseId === "keyboard") {
      ctx.font = `${width * 0.3}px Arial`;
      ctx.fillText("🎹", width * 0.5, height * 0.75); // Keyboard at feet
    } else if (baseId === "smudge") {
      ctx.font = `${width * 0.3}px Arial`;
      ctx.fillText("🍽️", width * 0.5, height * 0.78); // Yelling at plate
    }

    // 4. Draw Selected Accessories
    // Filter accessory IDs by category
    const accessories = accessoryIds
      .map(id => getCatAsset(id))
      .filter((asset): asset is NonNullable<typeof asset> => !!asset);

    const hat = accessories.find(a => a.category === "hat");
    const items = accessories.filter(a => a.category === "item");

    // Draw Hat on top of head
    if (hat) {
      ctx.font = `${width * 0.35}px Arial`;
      // Position hat slightly higher than head
      let hatY = height * 0.22;
      const hatX = width * 0.5;

      // Adjustments based on base cat face shape
      if (baseId === "grumpy") hatY = height * 0.24;
      if (baseId === "loaf") hatY = height * 0.18;

      ctx.fillText(hat.imagePath, hatX, hatY);
    }

    // Draw Items
    items.forEach((item, index) => {
      ctx.font = `${width * 0.28}px Arial`;
      // Item 1 on the left, Item 2 on the right
      let itemX = index === 0 ? width * 0.2 : width * 0.8;
      let itemY = height * 0.7;

      // Special item adjustments
      if (item.id === "item-sunglasses") {
        // Sunglasses should go on the eyes!
        ctx.font = `${width * 0.32}px Arial`;
        itemX = width * 0.5;
        itemY = height * 0.48;
        if (baseId === "loaf") itemY = height * 0.4;
      }

      ctx.fillText(item.imagePath, itemX, itemY);
    });

    // 5. Export base64 string
    if (onExport) {
      onExport(canvas.toDataURL("image/png"));
    }
  }, [baseId, accessoryIds, width, height, onExport]);

  return (
    <div className="flex items-center justify-center bg-bg-tertiary border border-border-mid rounded-xl p-6 shadow-inner relative overflow-hidden">
      {/* Decorative grid pattern in background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#3B6D11_1px,transparent_1px)] [background-size:16px_16px]" />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};
