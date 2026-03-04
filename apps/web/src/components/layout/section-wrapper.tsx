import { cn } from "@/lib/utils";
import Container from "@/components/layout/container";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative", className)}>
      <Container>{children}</Container>
    </section>
  );
}
