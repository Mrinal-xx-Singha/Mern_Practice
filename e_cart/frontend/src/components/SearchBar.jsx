import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchProduct(searchTerm);
  };

  return (
    <div className="flex justify-center items-center mb-2 gap-2">
      <input
        type="text"
        placeholder="Search Product.."
        className="border px-6 py-2 mt-2 shadow-md italic"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-[#386868]  text-white text-bold rounded-md hover:bg-[#315c5c]"
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
