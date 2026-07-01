import Image from "next/image";

interface Props {
  src: string;

  alt: string;

  className?: string;
}

export default function ImageFrame({
  src,
  alt,
  className = "",
}: Props) {
  return (
    <div
      className={`
      relative
      overflow-hidden
      rounded-[28px]
      bg-paper
      ${className}
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="
        object-cover
        transition-all
        duration-700
        group-hover:scale-105
        "
      />
    </div>
  );
}