import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "container-max section-space relative",
        className
      )}
    >
      {children}
    </section>
  );
}