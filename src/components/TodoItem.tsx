'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { FiEdit3, FiTrash2, FiSave } from 'react-icons/fi';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg group hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 cursor-pointer accent-blue-500"
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 outline-none border-b border-blue-500"
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {todo.text}
        </span>
      )}

      <div className="flex gap-2">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          {isEditing ? <FiSave size={18} /> : <FiEdit3 size={18} />}
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};
