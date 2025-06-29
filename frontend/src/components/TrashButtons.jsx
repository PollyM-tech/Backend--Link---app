import { Trash } from "lucide-react";

function TrashButton({ 
  trashedLinksCount, 
  isActive, 
  onClick 
}) {
  return (
    <div
      onClick={onClick}
      className={`mt-6 flex items-center gap-2 text-red-600 cursor-pointer ${
        isActive ? "font-bold" : ""
      }`}
    >
      <Trash size={18} />
      <span>Trash ({trashedLinksCount})</span>
    </div>
  );
}

export default TrashButton;