export default function ProductSkeleton() {
  return (
    <div
      className="
      rounded-[30px]
      border
      bg-white
      overflow-hidden
      animate-pulse
      "
    >
      <div className="h-[240px] bg-zinc-200" />

      <div className="p-5 space-y-4">

        <div className="h-3 w-24 rounded bg-zinc-200" />

        <div className="h-6 rounded bg-zinc-200" />

        <div className="h-5 w-36 rounded bg-zinc-200" />

        <div className="h-8 w-28 rounded bg-zinc-200" />

        <div className="h-11 rounded-full bg-zinc-200" />

      </div>
    </div>
  );
}