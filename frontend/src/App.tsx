import { useState } from 'react';
import ColumnModal from './components/Column/ColumnModal';
import Column from './components/Column/Column';
import { useColumnLogic } from './hooks/useColumnLogic';

function App() {
  const [showModal, setShowModal] = useState(false);

  //destructuring
  const {
    columns,
    loading,
    error,
    handleCreateColumn,
    handleDeleteColumn,
    handleUpdateColumn,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useColumnLogic();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <p className="text-lg text-gray-700">Loading columns...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <header className='shadow-sm'>
        <h1 className="text-2xl p-4 sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Web Application Mission
        </h1>
      </header>

      <main className='px-4 sm:px-6 lg:px-8 py-6'>
        {error && (
          <div className="text-red-600 mb-4 px-6">
            {error}
          </div>
        )}

        <div className='mb-6'>
          <button
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            + Add Column
          </button>
        </div>

        <div className="block sm:hidden">
          <div className="space-y-4">
            {columns.map((col) => (
              <Column
                key={col._id}
                columnId={col._id}
                columnTitle={col.columnTitle}
                tasks={col.tasks}
                onDelete={handleDeleteColumn}
                onUpdate={handleUpdateColumn}
                onCreateTask={handleCreateTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isMobile={true}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 lg:gap-6">
              {columns.map((col) => (
                <Column
                  key={col._id}
                  columnId={col._id}
                  columnTitle={col.columnTitle}
                  tasks={col.tasks}
                  onDelete={handleDeleteColumn}
                  onUpdate={handleUpdateColumn}
                  onCreateTask={handleCreateTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <ColumnModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateColumn}
      />
    </div>
  );
}

export default App;