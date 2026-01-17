import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Note } from '../types';
import { notesAPI } from '../services/api';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, filter, searchQuery]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const fetchedNotes = await notesAPI.getAllNotes();
      setNotes(fetchedNotes);
    } catch (err: any) {
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = notes;

    // Filter by archive status
    if (filter === 'active') {
      filtered = filtered.filter(note => !note.isArchived);
    } else if (filter === 'archived') {
      filtered = filtered.filter(note => note.isArchived);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  };

  const handleNoteSubmit = async (noteData: { title: string; content: string }) => {
    try {
      if (editingNote) {
        const updatedNote = await notesAPI.updateNote(editingNote.id, noteData);
        setNotes(notes.map(note => note.id === editingNote.id ? updatedNote : note));
        setEditingNote(null);
      } else {
        const newNote = await notesAPI.createNote(noteData);
        setNotes([newNote, ...notes]);
      }
      setShowForm(false);
    } catch (err: any) {
      setError('Failed to save note');
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (err: any) {
        setError('Failed to delete note');
      }
    }
  };

  const handleArchiveNote = async (id: number) => {
    try {
      const updatedNote = await notesAPI.archiveNote(id);
      setNotes(notes.map(note => note.id === id ? updatedNote : note));
    } catch (err: any) {
      setError('Failed to archive note');
    }
  };

  const handleUnarchiveNote = async (id: number) => {
    try {
      const updatedNote = await notesAPI.unarchiveNote(id);
      setNotes(notes.map(note => note.id === id ? updatedNote : note));
    } catch (err: any) {
      setError('Failed to unarchive note');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  if (isLoading) {
    return <div className="loading">Loading your notes...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Manage your personal notes</p>
          </div>
          <button className="btn btn-secondary" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search notes..."
              className="form-control search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-buttons">
              <button
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('all')}
              >
                All ({notes.length})
              </button>
              <button
                className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('active')}
              >
                Active ({notes.filter(n => !n.isArchived).length})
              </button>
              <button
                className={`btn ${filter === 'archived' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('archived')}
              >
                Archived ({notes.filter(n => n.isArchived).length})
              </button>
            </div>
          </div>
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            + New Note
          </button>
        </div>

        {showForm && (
          <NoteForm
            note={editingNote}
            onSubmit={handleNoteSubmit}
            onCancel={handleCancelForm}
          />
        )}

        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes found</h3>
              <p>
                {searchQuery.trim() 
                  ? 'Try adjusting your search query.'
                  : filter === 'all' 
                    ? 'Create your first note to get started!' 
                    : `No ${filter} notes found.`
                }
              </p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onArchive={handleArchiveNote}
                onUnarchive={handleUnarchiveNote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
