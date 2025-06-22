import type { Task } from '../../type';
import TaskCard from '../Task/TaskCard';
import React, { useEffect, useState } from 'react';
import TaskModal from '../Task/TaskModal';


type ColumnProps = {
    columnId: string;
    columnTitle: string;
    tasks: Task[];
    onUpdate: (columnId: string, newTitle: string) => void;
    onDelete: (columnId: string) => void;
    onCreateTask: (columnId: string, taskData: {
        taskTitle: string;
        priority: 'low' | 'medium' | 'high';
        dueDate?: string;
    }) => void;
    onEditTask: (taskId: string, updates: Partial<Task>) => void;
    onDeleteTask: (taskId: string) => void;
    onDragOver: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent, columnId: string) => void;
    onDragStart: (event: React.DragEvent, taskId: string) => void;
};

const Column = ({ columnTitle,
    columnId,
    tasks = [],
    onUpdate,
    onDelete,
    onCreateTask,
    onEditTask,
    onDeleteTask,
    onDragOver,
    onDrop,
    onDragStart }: ColumnProps) => {
    const [editing, setEditing] = useState(false);
    const [titleInput, setTitleInput] = useState(columnTitle);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        setTitleInput(columnTitle);
    }, [columnTitle]);

    const handleUpdate = () => {
        if (titleInput.trim()) {
            onUpdate(columnId, titleInput.trim());
            setEditing(false);
        }
    };

    const handleCreateTask = (taskData: {
        taskTitle: string;
        priority: 'low' | 'medium' | 'high';
        dueDate?: string;
    }) => {
        onCreateTask(columnId, taskData);
        setShowTaskModal(false);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(true);
        onDragOver(event);
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false);
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false);
        onDrop(event, columnId);
    }

    return (
        <div className={`min-w-120 bg-gray-50 p-4 rounded-lg shadow-md transition-colors ${isDragOver ? 'bg-blue-50 border-2 border-blue-300' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div className="flex items-center justify-between gap-2 mb-4">
                {editing ? (
                    <>
                        <input className="border rounded px-2 py-1 flex-1" value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                        <button className="text-sm bg-green-500 text-white px-2 py-1 rounded" onClick={handleUpdate}>
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-bold uppercase">{columnTitle}</h2>
                        <div className="flex gap-1">
                            <button onClick={() => setEditing(true)} className="text-xs px-2 py-1 bg-yellow-400 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(columnId)} className="text-xs px-2 py-1 bg-red-500 text-white rounded">
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>

            <button className="mb-3 w-full py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setShowTaskModal(true)}>
                + Add Task
            </button>

            <div className="min-h-32">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onDragStart={onDragStart}/>
                ))}
                {tasks.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        Drop tasks here or add a new task
                    </div>
                )}
            </div>

            <TaskModal
                show={showTaskModal}
                onClose={() => setShowTaskModal(false)}
                onSubmit={handleCreateTask}/>
        </div>
    );
};

export default Column;