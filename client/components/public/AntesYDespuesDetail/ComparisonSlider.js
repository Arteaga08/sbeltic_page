"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function ComparisonSlider({ pairs, treatmentName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const pair = pairs[currentIndex];

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    },
    [dragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const goTo = (dir) => {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return pairs.length - 1;
      if (next >= pairs.length) return 0;
      return next;
    });
    setPosition(50);
  };

  if (!pair) return null;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl select-none"
        style={{ aspectRatio: "4 / 5", touchAction: "none" }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After image (base layer) */}
        <Image
          src={pair.after}
          alt={`${treatmentName} — Después`}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          draggable={false}
        />

        {/* Before image (clipped layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${treatmentName} — Antes`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-10"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            width: "2px",
            background: "white",
          }}
        />

        {/* Drag handle */}
        <div
          className="absolute z-20 flex items-center justify-center"
          style={{
            left: `${position}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
            cursor: dragging ? "grabbing" : "grab",
          }}
          onPointerDown={handlePointerDown}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: "#1A1614" }}
          >
            <path
              d="M6 10L3 7M3 7L6 4M3 7H9M14 10L17 7M17 7L14 4M17 7H11M3 13L6 16M6 16L9 13M6 16H3M17 13L14 16M14 16L11 13M14 16H17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ANTES label */}
        <span
          className="absolute bottom-5 left-5 z-10 text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          Antes
        </span>

        {/* DESPUES label */}
        <span
          className="absolute bottom-5 right-5 z-10 text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          Después
        </span>
      </div>

      {/* Navigation (multiple pairs) */}
      {pairs.length > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => goTo(-1)}
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{
              width: "40px",
              height: "40px",
              background: "#1A1614",
              color: "white",
            }}
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span
            className="text-xs font-medium tracking-wider"
            style={{ color: "var(--pub-text)" }}
          >
            {currentIndex + 1} / {pairs.length}
          </span>

          <button
            onClick={() => goTo(1)}
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{
              width: "40px",
              height: "40px",
              background: "#1A1614",
              color: "white",
            }}
            aria-label="Siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
