import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className={`note-card ${note.isArchived ? 'archived' : ''}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        {note.isArchived && <span className="archived-badge">Archived</span>}
      </div>
      
      <div className="note-content">
        <p>{truncateContent(note.content)}</p>
      </div>
      
      <div className="note-meta">
        <small className="note-date">
          Updated: {formatDate(note.updatedAt)}
        </small>
      </div>
      
      <div className="note-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        
        {note.isArchived ? (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onUnarchive(note.id)}
          >
            Unarchive
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onArchive(note.id)}
          >
            Archive
          </button>
        )}
        
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
