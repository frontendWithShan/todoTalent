'use client';

import { useState, useEffect, useMemo } from 'react';
import { Todo, FilterType } from '@/types/todo';

const STORAGE_KEY = 'todo_app_tasks';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setTodos(JSON.parse(savedData));
      } catch (err) {
        console.error('Error loading tasks from storage:', err);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    
    const newTask: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };
    setTodos([newTask, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(task => task.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (!newText.trim()) return;
    setTodos(prev => prev.map(task => 
      task.id === id ? { ...task, text: newText.trim() } : task
    ));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [todos, filter]);

  const activeCount = todos.filter(task => !task.completed).length;

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    activeCount,
    isInitialized,
  };
};
