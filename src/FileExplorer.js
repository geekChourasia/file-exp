
import React, { useState } from "react";

function App() {
  const initialFileSystem = {
    name: "Root",
    type: "folder",
    children: [
      { name: "Folder 1", type: "folder", children: [] },
      { name: "Folder 2", type: "folder", children: [] },
      { name: "File 1.txt", type: "file", content: "Hello, World!" },
      { name: "File 2.txt", type: "file", content: "This is a text file." }
    ]
  };

  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCreateItem = () => {
    if (!newItemName) return;

    const newItem = {
      name: newItemName,
      type: "file",
      content: ""
    };

    const updatedFileSystem = { ...fileSystem };
    updatedFileSystem.children.push(newItem);
    setFileSystem(updatedFileSystem);

    setNewItemName("");
  };

  const handleDeleteItem = (item) => {
    const updatedFileSystem = { ...fileSystem };
    updatedFileSystem.children = updatedFileSystem.children.filter(
      (i) => i !== item
    );
    setFileSystem(updatedFileSystem);

    setSelectedItem(null);
  };

  const handleRenameItem = () => {
    if (!newItemName || !selectedItem) return;

    const updatedFileSystem = { ...fileSystem };
    const index = updatedFileSystem.children.findIndex(
      (i) => i === selectedItem
    );
    if (index !== -1) {
      updatedFileSystem.children[index].name = newItemName;
    }

    setFileSystem(updatedFileSystem);
    setSelectedItem(null);
    setNewItemName("");
  };

  const handleContentChange = (content) => {
    const updatedFileSystem = { ...fileSystem };
    const index = updatedFileSystem.children.findIndex(
      (i) => i === selectedItem
    );
    if (index !== -1) {
      updatedFileSystem.children[index].content = content;
    }

    setFileSystem(updatedFileSystem);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h2>File Explorer</h2>
        <ul>
          {fileSystem.children.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className={selectedItem === item ? "selected" : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        {selectedItem && (
          <div>
            <h2>{selectedItem.name}</h2>
            {selectedItem.type === "file" ? (
              <textarea
                value={selectedItem.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            ) : (
              <p>This is a folder.</p>
            )}
            <button onClick={() => handleDeleteItem(selectedItem)}>
              Delete
            </button>
            <button onClick={handleRenameItem}>Rename</button>
          </div>
        )}
      </div>
      <div className="create">
        <input
          type="text"
          placeholder="New Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleCreateItem}>Create</button>
      </div>
    </div>
  );
}

export default App;
