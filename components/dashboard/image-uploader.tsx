"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; url: string; name: string };

export function ImageUploader({
  initial = [],
  max = 12,
}: {
  initial?: { url: string; name?: string }[];
  max?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>(
    initial.map((it, i) => ({ id: `init-${i}`, url: it.url, name: it.name ?? `Photo ${i + 1}` })),
  );

  function addFiles(files: FileList | null) {
    if (!files) return;
    const next: Item[] = [];
    Array.from(files)
      .slice(0, max - items.length)
      .forEach((file, i) => {
        next.push({
          id: `f-${Date.now()}-${i}`,
          url: URL.createObjectURL(file),
          name: file.name,
        });
      });
    setItems((prev) => [...prev, ...next]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-lystra-champagne/40 bg-lystra-cream/40 px-6 py-10 text-center transition-colors hover:border-lystra-champagne/70 hover:bg-lystra-champagne/10"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-lystra-champagne/20 text-lystra-plum">
          <UploadCloud className="h-6 w-6" />
        </span>
        <span className="font-medium text-lystra-ink">Ajoutez vos photos</span>
        <span className="text-sm text-lystra-gray">
          Glissez-déposez ou cliquez · JPG, PNG · {items.length}/{max}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </button>

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it, idx) => (
            <div
              key={it.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-lystra-champagne/25 bg-lystra-cream"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.url} alt={it.name} className="h-full w-full object-cover" />
              {idx === 0 && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-lystra-plum/90 px-2 py-0.5 text-[0.65rem] font-medium text-lystra-cream">
                  <Star className="h-3 w-3" /> Couverture
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(it.id)}
                className={cn(
                  "absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-lystra-ink opacity-0 shadow-soft transition-opacity",
                  "group-hover:opacity-100",
                )}
                aria-label="Supprimer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
