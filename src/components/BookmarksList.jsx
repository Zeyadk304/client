import React from "react";
import "./styles.css";
const BookmarksList = ({ userId, onRemoveBookmark }) => {
  // Dummy data for bookmarks
  const bookmarks = [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
  ];

  return (
    <div>
      <h2>Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            {bookmark.name}
            <button onClick={() => onRemoveBookmark(bookmark.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksList;