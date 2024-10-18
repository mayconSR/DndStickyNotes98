'use client';
import { useState } from "react";
import { Note } from "./components/Note";
import { FaPlus } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleDragEnd = (id, newPosition) => {
    setNotes((prevNotes) =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...newPosition } : note
      )
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleAddNote = (title, content) => {
    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
      left: 0,
      top: 0,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    // Limpar os campos após adicionar a nota
    setNoteTitle("");
    setNoteContent("");
    toggleModal(); // Fecha o modal após salvar
  }

  const handleDeleteNotes = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  return (
    <>
      {isModalOpen && (
        <div className="absolute z-50 w-screen h-screen bg-gray-700/60 flex justify-center items-center">
          <div className="flex flex-col justify-start gap-1 w-[250px] h-fit p-1 bg-gray-300 border-t-2 border-l-2 border-gray-100 shadow-btng">
            <div className="flex justify-between items-center p-1 w-full bg-gradient-to-r from-blue-800 to-blue-300 cursor-grab select-none"><h2 className="text-white font-bold">Nova Nota</h2><button onClick={toggleModal} className="p-1 bg-gray-300 border-t-2 border-l-2 border-gray-200 shadow-btn">
              <TfiClose />
            </button></div>
            <input
              id="noteTitle"
              type="text"
              placeholder="Título da Nota"
              className="w-full p-2 shadow-border"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <input
              id="noteContent"
              type="text"
              placeholder="Digite o conteúdo da nota"
              className="w-full p-2 shadow-border"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button
              className="p-1 bg-gray-300 border-t-2 border-l-2 text-xs border-gray-200 shadow-btn"
              onClick={() => handleAddNote(noteTitle, noteContent)}
            >
              Salvar
            </button>
          </div>
        </div>
      )}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <button className="p-1 bg-gray-300 border-t-2 border-l-2 text-xs border-gray-200 shadow-btn absolute right-2 top-2" onClick={toggleModal}>
          <FaPlus />
        </button>
        <div id="board" className="relative">
          {notes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              left={note.left}
              top={note.top}
              onDragEnd={handleDragEnd}
              onDelete={handleDeleteNotes}
            />
          ))}
        </div>
      </div>
    </>
  );
}
