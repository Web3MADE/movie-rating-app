"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import SearchIcon from "./SearchIcon";

interface ISearchBarProps {
  search?: string;
}

const SearchBar = (props: ISearchBarProps) => {
  const router = useRouter();

  const [text, setText] = useState(props.search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!text) {
      router.push("/movies");
    } else {
      router.push(`/movies?search=${text}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-sm mx-auto"
      aria-label="form"
    >
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <SearchIcon />
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search"
          value={text}
          onChange={handleChange}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
