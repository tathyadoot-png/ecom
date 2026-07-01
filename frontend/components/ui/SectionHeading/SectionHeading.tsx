import { Typography } from "@/components/ui/Typography";

interface Props {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  description,
  center = true,
}: Props) {
  return (
    <div
      className={
        center
          ? "text-center max-w-3xl mx-auto"
          : "max-w-2xl"
      }
    >
      {badge && (
        <Typography
          variant="caption"
          as="span"
        >
          {badge}
        </Typography>
      )}

      <Typography
        as="h2"
        variant="section"
        className="mt-4"
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body-lg"
          className="mt-6"
        >
          {description}
        </Typography>
      )}
    </div>
  );
}