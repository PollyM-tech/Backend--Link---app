import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function Sidebar({
  categories,
  links,
  activeCategory,
  expandSidebar,
  setExpandSidebar,
  handleCategoryFilter,
  getLinkCount,
  showTrash,
  TrashButton,
  handleCategoryDelete,
}) {
  const handleDeleteClick = (e, categoryId) => {
    e.stopPropagation(); // Prevent triggering category filter

    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">
            Delete this category? Links will be moved to trash.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleCategoryDelete(categoryId);
                closeToast();
              }}
              className="text-red-600 underline cursor-pointer"
            >
              Confirm
            </button>
            <button
              onClick={closeToast}
              className="text-blue-600 underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <aside className="w-full md:w-64 bg-white p-4 shadow-md">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpandSidebar(!expandSidebar)}
      >
        <h2 className="text-lg font-semibold mb-2">My Categories</h2>
        {expandSidebar ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>

      {expandSidebar && (
        <ul className="mt-2 space-y-2 text-sm text-gray-800">
          <li
            className={`flex justify-between cursor-pointer ${
              activeCategory === "All" && !showTrash ? "font-bold" : ""
            }`}
            onClick={() => handleCategoryFilter("All")}
          >
            <span>All</span>
            <span>{links.length}</span>
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => handleCategoryFilter(cat.id)}
              className={`flex justify-between items-center cursor-pointer group hover:bg-gray-50 p-2 rounded ${
                activeCategory === cat.id && !showTrash ? "font-bold" : ""
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span>{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{getLinkCount(cat.id)}</span>
                  <button
                    onClick={(e) => handleDeleteClick(e, cat.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Using TrashButton component */}
      {TrashButton}
    </aside>
  );
}

export default Sidebar;
