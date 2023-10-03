"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchIcon from "./SearchIcon";

interface ISearchBarProps {
  search?: string;
}

const SearchBar = (props: ISearchBarProps) => {
  const router = useRouter();

  const [text, setText] = useState(props.search);
  const [query] = useDebounce(text, 250);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/movies?search=${query}`);
  };

  useEffect(() => {
    if (!query) {
      router.push(`/movies`);
    } else {
      router.push(`/movies?search=${query}`);
    }
  }, [query]);

  console.log("text ", text);
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
