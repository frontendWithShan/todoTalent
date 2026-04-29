'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilters } from '@/components/TodoFilters';
import { FiLoader } from 'react-icons/fi';

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    activeCount,
    isInitialized,
  } = useTodos();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-gray-100">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              My Tasks
            </h1>
          </header>

          <TodoInput onAdd={addTodo} />

          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />

          <div className="mt-8 space-y-4">
            {todos.length > 0 ? (
              todos.map((task) => (
                <TodoItem
                  key={task.id}
                  todo={task}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            ) : (
              <div className="text-center py-12 px-4">
                <div className="text-gray-300 mb-2">
                  <FiLoader className="w-10 h-10 mx-auto opacity-20" />
                </div>
                <p className="text-gray-400 text-sm italic">
                  {filter === 'all'
                    ? "Your list is empty."
                    : `No ${filter} tasks found.`}
                </p>
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <footer className="mt-10 pt-6 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Focus on one task at a time
              </p>
            </footer>
          )}
        </div>
      </div>
    </main>
  );
}
