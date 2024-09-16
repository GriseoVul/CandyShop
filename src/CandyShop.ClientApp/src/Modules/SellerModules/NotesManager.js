import React, { useState } from 'react';

const NotesManager = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        setCurrentNote(e.target.value);
    };

    const addNote = () => {
        if (currentNote.trim() !== '') {
            setNotes([...notes, currentNote]);
            setCurrentNote('');
        }
    };

    const editNote = (index) => {
        setCurrentNote(notes[index]);
        setEditingIndex(index);
        setIsEditing(true);
    };

    const updateNote = () => {
        const updatedNotes = notes.map((note, index) => (index === editingIndex ? currentNote : note));
        setNotes(updatedNotes);
        setCurrentNote('');
        setEditingIndex(null);
        setIsEditing(false);
    };

    const deleteNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    return (
        <div>
            <input className='input-public'
                type="text"
                value={currentNote}
                onChange={handleInputChange}
                placeholder="Примечание"
            />
            <button className='button' onClick={isEditing ? updateNote : addNote}>
                {isEditing ? 'Изменить' : 'Добавить'}
            </button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note} <br/>
                        <button className='button' onClick={() => editNote(index)}>Изменить</button>
                        <button className='button' onClick={() => deleteNote(index)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesManager;
