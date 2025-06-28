import { useState } from "react";

function SearchBar({ links, setFilteredLinks, activeCategory, getCategoryName }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = links.filter((link) => {
      const categoryName = getCategoryName(link.category_id).toLowerCase();
      return (
        link.title.toLowerCase().includes(value) ||
        link.description.toLowerCase().includes(value) ||
        categoryName.includes(value)
      );
    });

    const finalFiltered =
      activeCategory === "All"
        ? filtered
        : filtered.filter((link) => link.category_id === activeCategory);

    setFilteredLinks(finalFiltered);
  };

  return (
    <div className="flex justify-end mb-6">
      <input
        type="text"
        placeholder="Search by title, description, or category..."
        value={query}
        onChange={handleSearch}
        className="w-full sm:w-64 px-4 py-2 border rounded-md shadow-sm focus:outline-none border-white"
      />
    </div>
  );
}

export default SearchBar;
