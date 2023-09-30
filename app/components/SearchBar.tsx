import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";

interface ISearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = (props: ISearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm mx-auto">
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
