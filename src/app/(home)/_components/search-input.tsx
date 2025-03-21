"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "@/hooks/use-search-params";

const SearchInput = () => {
  const [search, setSearch] = useSearchParams("search");

  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          placeholder="Search"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none shadow-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
        >
          <SearchIcon className="size-5" />
        </Button>
        {value && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
          >
            <XIcon className="size-5" />
          </Button>
        )}
      </form>
    </div>
  );
};

export { SearchInput };
