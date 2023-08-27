"use client";

import { BiSearch } from "react-icons/bi";

type Props = {};

function Search({}: Props) {
  return (
    <div
      className="
  border w-full md:w-auto py-2
  rounded-full shadow-sm hover:shadow-md
  transition cursor-pointer
  "
    >
      <div
        className="
      flex items-center justify-between
      "
      >
        <div
          className="
        text-sm font-semibold px-6 
        "
        >
          Anywhere
        </div>
        <div
          className="
        text-sm font-semibold px-6 hidden sm:block border-x 
        "
        >
          Anyweek
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
