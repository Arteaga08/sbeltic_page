"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--pub-border)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer transition-all duration-200 hover:bg-black/3 active:bg-black/6 rounded-sm px-1 -mx-1"
      >
        <span
          className="font-semibold leading-snug"
          style={{
            color: "var(--pub-text)",
            fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
          }}
        >
          {item.title}
        </span>
        <CaretDownIcon
          size={22}
          weight="bold"
          className="shrink-0 transition-transform duration-300"
          style={{
            color: "var(--pub-gold)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "600px" : "0px" }}
      >
        <div className="pb-8">
          {item.type === "list" ? (
            <ul className="list-disc pl-6 space-y-3">
              {item.content.map((c, i) => (
                <li
                  key={i}
                  className="font-light leading-[1.75] text-justify"
                  style={{
                    color: "var(--pub-text-muted)",
                    fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="font-light leading-[1.85] text-justify"
              style={{
                color: "var(--pub-text-muted)",
                fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
              }}
            >
              {item.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-surface)" }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <SectionEyebrow variant="gold" className="mb-5">
          Preguntas frecuentes
        </SectionEyebrow>
        <h2
          className="font-bold uppercase leading-tight mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pub-text)",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
          }}
        >
          Todo Lo Que
          <br />
          Necesitas{" "}
          <span style={{ color: "var(--pub-accent)" }}>Saber</span>
        </h2>
        <GoldDivider size="sm" className="mb-12" />

        <div className="text-left border-t" style={{ borderColor: "var(--pub-border)" }}>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
