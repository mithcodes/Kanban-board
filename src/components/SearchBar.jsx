import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";

import { setSearchTerm } from "../redux/taskSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector(
    (state) => state.task.searchTerm
  );

  const handleSearch = (event) => {
    dispatch(
      setSearchTerm(event.target.value)
    );
  };

  return (
    <div className="mx-auto mb-8 flex w-full max-w-xl items-center rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3">
      <Search
        size={20}
        className="mr-3 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search task..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchBar;