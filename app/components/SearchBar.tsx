"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchIcon from "./SearchIcon";

interface ISearchBarProps {
  search?: string;
}

// TODO: reimplement submbit button for better UX
const SearchBar = (props: ISearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(props.search);
  const [query] = useDebounce(text, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/movies?search=${query}`);
  };

  useEffect(() => {
    if (query === undefined) return;
    if (!query) {
      if (pathname !== "/movies" || searchParams) {
        router.push("/movies");
      }
    } else {
      router.push(`/movies?search=${query}`);
    }
  }, [query, router, pathname]);

  return (
    <div className="flex items-center border-b-2 border-teal-500 py-2">
      <SearchIcon />
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
