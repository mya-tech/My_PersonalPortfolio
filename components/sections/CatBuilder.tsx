"use client";

import React, { useState } from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { TeamGrid } from "../cats/TeamGrid";
import { CatBuilderModal } from "../cats/CatBuilderModal";
import { useCats } from "@/hooks/useCats";
import { Button } from "../ui/Button";
import { Users, HelpCircle, Plus } from "lucide-react";

export const CatBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cats, addCat, isLoading, error } = useCats();

  const handleCatSubmit = async (newCatData: {
    name: string;
    role: string;
    baseId: string;
    accessoryIds: string[];
    image: string;
  }) => {
    // Call hook function which POSTs to API
    await addCat(newCatData);
  };

  return (
    <SectionWrapper id="team" className="py-20 bg-bg-secondary/40 border-y border-border-light/20 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-4">
        <div>
          <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
            07 · Interactive Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
            The Team
          </h2>
          <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
        </div>
        
        {/* Dynamic status badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted bg-bg-primary border border-border-light/40 px-3 py-1.5 rounded-full shadow-sm select-none">
          <Users className="h-3.5 w-3.5 text-accent-mid" />
          Community Members: {cats.length + 1}
        </div>
      </div>

      {/* Description paragraph */}
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mb-10 -mt-6">
        Meet the team! Here is me, &quot;The Human,&quot; alongside all the developer cats built by awesome visitors. Customize and add your own cat to our roster below.
      </p>

      {/* Grid containing human and cats */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-bg-primary border border-border-light rounded-xl shadow-sm">
          <div className="relative flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-accent-mid flex items-center justify-center">
              🐾
            </span>
          </div>
          <p className="text-xs font-semibold text-text-secondary mt-3">Fetching community cats...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <HelpCircle className="h-8 w-8 mb-2 opacity-80" />
          <p className="text-sm font-bold">Failed to load team cards</p>
          <p className="text-xs opacity-75 mt-1">Please try refreshing the page or check connection.</p>
        </div>
      ) : (
        <TeamGrid cats={cats} />
      )}

      {/* Centered CTA button underneath the grid */}
      <div className="flex justify-center items-center mt-12">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="md"
          className="flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="h-4.5 w-4.5" />
          Add a team member
        </Button>
      </div>

      {/* Cat Builder Step-by-Step Modal */}
      <CatBuilderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCatSubmit}
      />
    </SectionWrapper>
  );
};
