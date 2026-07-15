"use client";

import { Search } from "lucide-react";
import { cn } from "@/utils/cn";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  placeholder = "Search handcrafted products...",
  className,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-full items-center rounded-full border border-border bg-white px-5 transition-all duration-300 focus-within:border-primary focus-within:shadow-lg",
        className
      )}
    >
      <Search
        size={18}
        className="text-muted"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-muted"
      />
    </div>
  );
}