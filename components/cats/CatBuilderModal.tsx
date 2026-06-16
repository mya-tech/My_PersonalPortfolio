"use client";

import React, { useState } from "react";
import { CAT_BASES, CAT_HATS, CAT_ITEMS } from "@/data/cats";
import { CatCanvas } from "./CatCanvas";
import { Button } from "../ui/Button";
import { X, Check, Loader2 } from "lucide-react";

interface CatBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cat: { name: string; role: string; baseId: string; accessoryIds: string[]; image: string }) => Promise<void>;
}

export const CatBuilderModal: React.FC<CatBuilderModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState(CAT_BASES[0].id);
  const [selectedHat, setSelectedHat] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const [catName, setCatName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  const [base64Image, setBase64Image] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleHatSelect = (hatId: string) => {
    setSelectedHat(prev => (prev === hatId ? null : hatId));
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      if (prev.length >= 2) {
        // Limit to max 2 items, replace the first one
        return [prev[1], itemId];
      }
      return [...prev, itemId];
    });
  };

  const activeAccessories = [
    ...(selectedHat ? [selectedHat] : []),
    ...selectedItems
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !jobTitle.trim() || !base64Image) {
      setErrorMessage("Cat name, job title, and rendering are required.");
      return;
    }
    if (catName.length > 20) {
      setErrorMessage("Name must be 20 characters or less.");
      return;
    }
    if (jobTitle.length > 30) {
      setErrorMessage("Job title must be 30 characters or less.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await onSubmit({
        name: catName.trim(),
        role: jobTitle.trim(),
        baseId: selectedBase,
        accessoryIds: activeAccessories,
        image: base64Image
      });
      // Reset State on success
      setStep(1);
      setSelectedBase(CAT_BASES[0].id);
      setSelectedHat(null);
      setSelectedItems([]);
      setCatName("");
      setJobTitle("");
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add your cat. Please try again.";
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-bg-primary border border-border-light rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 animate-scale-up max-h-[90vh]">
        
        {/* Left Side: Builder Controls */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto min-h-[400px] md:max-h-[85vh]">
          <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-text-primary">Join the Team</h2>
                <p className="text-xs text-text-muted mt-0.5">Create your own custom developer cat</p>
              </div>
              <button 
                onClick={onClose}
                className="text-text-muted hover:text-text-primary p-1 rounded-full hover:bg-bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((num) => (
                <React.Fragment key={num}>
                  <div className="flex items-center justify-center">
                    <span 
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                        step >= num 
                          ? "bg-accent-mid border-accent-mid text-white" 
                          : "bg-bg-secondary border-border-light text-text-muted"
                      }`}
                    >
                      {num}
                    </span>
                  </div>
                  {num < 3 && (
                    <div className={`flex-1 h-0.5 rounded ${step > num ? "bg-accent-mid" : "bg-border-light"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* STEP 1: Select Cat Base */}
            {step === 1 && (
              <div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-3">
                  Step 1 — Pick your cat base
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {CAT_BASES.map((base) => (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => setSelectedBase(base.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        selectedBase === base.id
                          ? "border-accent-mid bg-bg-tertiary shadow-sm"
                          : "border-border-light hover:border-accent-light/50 hover:bg-bg-secondary/50"
                      }`}
                    >
                      <span className="text-3xl select-none">{base.imagePath}</span>
                      <span className="text-sm font-semibold text-text-primary">{base.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Select Accessories */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Hats Section */}
                <div>
                  <div className="flex justify-between items-baseline mb-2.5">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                      Step 2a — Add a hat
                    </h3>
                    <span className="text-[10px] text-text-muted">Pick 0 or 1</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {CAT_HATS.map((hat) => {
                      const isSelected = selectedHat === hat.id;
                      return (
                        <button
                          key={hat.id}
                          type="button"
                          onClick={() => handleHatSelect(hat.id)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                            isSelected
                              ? "border-accent-mid bg-bg-tertiary shadow-sm"
                              : "border-border-light hover:bg-bg-secondary/50"
                          }`}
                        >
                          <span className="text-2xl select-none mb-1">{hat.imagePath}</span>
                          <span className="text-[10px] font-semibold text-text-primary">{hat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Items Section */}
                <div>
                  <div className="flex justify-between items-baseline mb-2.5">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                      Step 2b — Add items
                    </h3>
                    <span className="text-[10px] text-text-muted">Pick 0 to 2 (Selected: {selectedItems.length}/2)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {CAT_ITEMS.map((item) => {
                      const isSelected = selectedItems.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemSelect(item.id)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all relative ${
                            isSelected
                              ? "border-accent-mid bg-bg-tertiary shadow-sm"
                              : "border-border-light hover:bg-bg-secondary/50"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-accent-mid text-white rounded-full flex items-center justify-center text-[8px]">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                          <span className="text-2xl select-none mb-1">{item.imagePath}</span>
                          <span className="text-[10px] font-semibold text-text-primary">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Cat Information */}
            {step === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2">
                  Step 3 — Name your cat
                </h3>
                
                <div>
                  <label htmlFor="cat-name" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                    Cat Name *
                  </label>
                  <input
                    id="cat-name"
                    type="text"
                    required
                    maxLength={20}
                    placeholder="e.g. Whiskers"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full rounded-md border border-border-light bg-bg-primary px-3 py-2 text-sm text-text-primary focus:border-accent-mid focus:ring-2 focus:ring-accent-light/50 focus:outline-none"
                  />
                  <div className="flex justify-between items-center mt-1 text-[10px] text-text-muted">
                    <span>Required, unique name</span>
                    <span>{catName.length}/20 chars</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="job-title" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                    Job Title *
                  </label>
                  <input
                    id="job-title"
                    type="text"
                    required
                    maxLength={30}
                    placeholder="e.g. Senior Nap Officer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full rounded-md border border-border-light bg-bg-primary px-3 py-2 text-sm text-text-primary focus:border-accent-mid focus:ring-2 focus:ring-accent-light/50 focus:outline-none"
                  />
                  <div className="flex justify-between items-center mt-1 text-[10px] text-text-muted">
                    <span>Required, e.g. QA Butter Roller</span>
                    <span>{jobTitle.length}/30 chars</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-border-light/40">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={step === 1 || isSubmitting}
            >
              Back
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="sm"
                onClick={handleFormSubmit}
                disabled={isSubmitting || !catName.trim() || !jobTitle.trim()}
                className="flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join the Team 🐾"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Right Side: Live Composite Preview */}
        <div className="md:w-80 bg-bg-secondary p-6 sm:p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-border-light/50">
          <div className="text-center mb-4">
            <span className="text-xs font-extrabold text-accent-dark tracking-widest uppercase block">Live Preview</span>
            <span className="text-[10px] text-text-muted">Updated in real-time</span>
          </div>

          <CatCanvas
            baseId={selectedBase}
            accessoryIds={activeAccessories}
            onExport={setBase64Image}
            className="shadow-md hover:scale-[1.01] transition-transform duration-200"
          />

          <div className="mt-4 text-center">
            <p className="font-serif font-bold text-text-primary text-base truncate max-w-[200px]">
              {catName.trim() || "Untitled Cat"}
            </p>
            <p className="text-xs text-text-secondary font-semibold italic truncate max-w-[200px] mt-0.5">
              {jobTitle.trim() || "Junior Tester"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
