import React from 'react';

function TrashView({ 
  trashedLinks, 
  onRestore, 
  onPermanentDelete, 
  onRestoreAll, 
  onEmptyTrash 
}) {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trash</h2>
        <div className="flex gap-2">
          <button
            onClick={onRestoreAll}
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm cursor-pointer"
          >
            Restore All
          </button>
          <button
            onClick={onEmptyTrash}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm cursor-pointer"
          >
            Empty Trash
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trashedLinks.map((link) => (
          <div
            key={link.id}
            className="bg-red-50 p-4 rounded-xl shadow relative"
          >
            <h3 className="font-bold text-red-800">{link.title}</h3>
            <p className="text-xs text-red-600">
              Trashed on {new Date(link.deletedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {link.description}
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="text-blue-600 text-sm underline cursor-pointer hover:text-blue-800"
                onClick={() => onRestore(link.id)}
              >
                Restore
              </button>
              <button
                className="text-red-600 text-sm underline cursor-pointer hover:text-red-800"
                onClick={() => onPermanentDelete(link.id)}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashView;
;
