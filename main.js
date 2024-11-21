import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ReactDOM 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React 컴포넌트 예시

function Gallery() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const imageItems = [
    { id: 1, title: "Plant 1", description: "This is a plant", img: "plant1.jpg" },
    // 다른 이미지 데이터들...
  ];

  const openModal = (item) => {
    setModalContent(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div className="gallery">
        {imageItems.map((item) => (
          <div className="image-item" key={item.id} onClick={() => openModal(item)}>
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalContent.title}</h2>
            <p>{modalContent.description}</p>
            <img src={modalContent.img} alt={modalContent.title} style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ plantName: "", date: "", notes: "" });

  // 로컬스토리지에서 불러오기
  const loadEntries = () => {
    const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(storedEntries);
  };

  const saveEntry = () => {
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEntry();
    setNewEntry({ plantName: "", date: "", notes: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="식물 이름"
          value={newEntry.plantName}
          onChange={(e) => setNewEntry({ ...newEntry, plantName: e.target.value })}
          required
        />
        <input type="date" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} required />
        <textarea placeholder="기타 메모" value={newEntry.notes} onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })} />
        <button type="submit">저장</button>
      </form>

      <div>
        <h3>기록 목록</h3>
        {entries.map((entry, index) => (
          <div key={index}>
            <h4>{entry.plantName}</h4>
            <p>{entry.date}</p>
            <p>{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Gallery />
      <Journal />
    </div>
  );
}
