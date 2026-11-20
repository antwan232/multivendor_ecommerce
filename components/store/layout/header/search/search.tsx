"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export default function Search() {
  return (
    <div className="relative flex-1 lg:w-full">
      <form className="relative flex h-10 rounded-3xl border-none bg-white">
        <input
          type="text"
          placeholder="Search..."
          className="m-2.5 flex-1 border-none bg-white pl-2.5 text-black outline-none"
        />

        <button
          type="submit"
          className="to mt-1 mr-1 mb-0 ml-0 grid h-8 w-14 cursor-pointer place-items-center rounded-[20px] border bg-slate-600 bg-linear-to-r from-slate-500"
        >
          <HugeiconsIcon icon={Search01Icon} />
        </button>
      </form>
    </div>
  );
}

