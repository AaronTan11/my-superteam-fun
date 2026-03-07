"use client";

import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqApp() {
  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Help
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">FAQ</h2>
      <Accordion className="gap-3">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-xl border border-border bg-card transition-colors hover:border-border-visible data-[open]:border-primary/30 data-[open]:bg-primary/[0.04] mb-3"
          >
            <AccordionTrigger className="px-4 py-3 text-sm font-medium text-foreground/90 hover:no-underline data-[open]:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
