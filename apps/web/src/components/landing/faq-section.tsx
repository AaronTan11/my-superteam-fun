"use client";

import { faqItems } from "@/data/faq";
import Container from "@/components/layout/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-16 md:py-24">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
              FAQ
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Everything you need to know about Superteam Malaysia and how to get
              involved.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8">
            <Accordion className="gap-3">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-border bg-card transition-colors hover:border-border-visible data-[open]:border-primary/30 data-[open]:bg-primary/[0.04] not-last:border-b-0 mb-3"
                >
                  <AccordionTrigger className="px-5 py-4 text-sm font-medium text-foreground/90 hover:no-underline data-[open]:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}
