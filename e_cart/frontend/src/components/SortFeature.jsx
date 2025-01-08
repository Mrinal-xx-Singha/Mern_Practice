import React from "react";

const SortFeature = ({ sortProducts }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <label htmlFor="sort" className="text-gray-700 font-medium">
        Sort By:
      </label>
      <select
        name=""
        id="sort"
        onChange={(e)=>sortProducts(e.target.value)}
        className="border px-4 py-2 rounded-md focus:outline-none "
      >
        <option value="">Select</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortFeature;
