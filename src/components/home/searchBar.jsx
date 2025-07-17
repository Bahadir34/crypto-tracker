import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target[0].value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-w-xl   mx-auto   w-full"
    >
      <div className="flex items-center gap-4 ">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 size-5" />
          <input
            type="text"
            placeholder="Search coin (Bitcoin, BTC, etc.)"
            className="w-full pl-10 outline-none border-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default React.memo(SearchBar);
