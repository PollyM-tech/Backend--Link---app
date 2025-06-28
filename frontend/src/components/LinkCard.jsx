import { Trash2, Pencil } from "lucide-react";

function LinkCard({ link, getCategoryName, handleEdit, handleDelete }) {
  // Function to get the favicon URL using the domain
  const getFaviconUrl = (url) => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
    } catch (err) {
      return ""; // return empty if invalid URL
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow relative flex gap-4 items-start">
      <img
        src={getFaviconUrl(link.url)}
        alt="favicon"
        className="w-6 h-6 mt-1"
      />

      <div className="flex-1">
        <h3 className="font-bold text-base">{link.title}</h3>
        <p className="text-xs text-gray-500 mb-1">
          {getCategoryName(link.category_id)}
        </p>
        <p className="text-sm text-gray-700 mb-2">{link.description}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Visit
        </a>
      </div>

      <div className="absolute top-2 right-2 flex gap-2">
        <Pencil
          size={16}
          className="text-blue-600 cursor-pointer"
          onClick={() => handleEdit(link)}
        />
        <Trash2
          size={16}
          className="text-red-600 cursor-pointer"
          onClick={() => handleDelete(link.id)}
        />
      </div>
    </div>
  );
}

export default LinkCard;
