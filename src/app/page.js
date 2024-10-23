'use client';
import { useState } from "react";
import { Note } from "./components/Note";
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
      left: 100,
      top: 100,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    // Limpar os campos após adicionar a nota
    setNoteTitle("");
    setNoteContent("");
    toggleModal();
  }

  const handleDeleteNotes = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-teal-600">
      {isModalOpen && (
        <div className="absolute z-50 w-screen h-screen bg-gray-700/60 flex justify-center items-center">
          <div className="flex flex-col justify-start gap-1 w-[250px] h-fit p-1 bg-gray-300 border-t-2 border-l-2 border-gray-100 shadow-btng">
            <div className="flex justify-between items-center p-1 w-full bg-gradient-to-r from-blue-800 to-blue-300 cursor-grab select-none"><h2 className="text-white font-bold">Nova Nota</h2><button onClick={toggleModal} className="p-1 bg-gray-300 border-t-2 border-l-2 border-gray-200 shadow-btn">
              <TfiClose />
            </button></div>
            <div className="flex gap-2">
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">File</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Edit</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Search</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Help</p>
            </div>
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
        <img src='assets/pad.png' alt="Adicione uma nota" title="Adicione uma nota" className="cursor-pointer absolute top-4 left-4" onClick={toggleModal}/>
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
    </div>
  );
}
