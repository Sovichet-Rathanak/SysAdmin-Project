import { useState } from 'react';
import Modal from './components/Column/ColumnModal';
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
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading columns...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold p-6 mb-4 shadow">Web Application Mission</h1>
      <div className="p-6">
        {error && <div className="text-red-600 mb-4 px-6">{error}</div>}

        <button className="shadow p-2 mb-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          onClick={() => {
            setShowModal(true);
          }}>
          + Add Column
        </button>

        <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateColumn} />
        
        <div className="flex gap-6 p-6 mb-6 overflow-auto">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
