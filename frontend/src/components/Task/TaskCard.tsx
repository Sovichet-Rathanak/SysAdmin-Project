import { Icon } from '@iconify/react';
import type { Task } from '../../type';
import { useState } from 'react';

type TaskCardProps = {
    task: Task,
    onEdit: (taskId: string, updates: Partial<Task>) => void;
    onDelete: (taskId: string) => void;
    onDragStart: (e: React.DragEvent, taskId: string) => void;
};

const TaskCard = ({ task, onEdit, onDelete, onDragStart }: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        taskTitle: task.taskTitle,
        priority: task.priority,
        dueDate: task.dueDate || '',
    });

    const priorityColor = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-red-100 text-red-700',
    };

    const handleEdit = () => {
        if (editData.taskTitle.trim()) {
            onEdit(task._id, {
                taskTitle: editData.taskTitle.trim(),
                priority: editData.priority,
                dueDate: editData.dueDate || undefined,
            });
            setIsEditing(false);
        }
    }

    const handleCancel = () => {
        setEditData({
            taskTitle: task.taskTitle,
            priority: task.priority,
            dueDate: task.dueDate || '',
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="border border-gray-300 rounded-lg p-4 m-2 bg-white">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editData.taskTitle}
                        onChange={(e) => setEditData({ ...editData, taskTitle: e.target.value })}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Task title"
                    />

                    <select
                        value={editData.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <input
                        type="date"
                        value={editData.dueDate}
                        min={new Date().toISOString().split('T')[0]} 
                        onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="flex-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4 m-2 bg-gray-50 cursor-move hover:shadow-md transition-shadow"
            style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)' }}
            draggable
            onDragStart={(e) => onDragStart(e, task._id)}>
            <div className="flex items-start justify-between mb-2">
                <div className="text-lg font-medium text-gray-800 flex-1">
                    {task.taskTitle}
                </div>
                <div className="flex gap-1 ml-2">
                    <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer">
                        <Icon icon="material-symbols:edit" className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                        <Icon icon="material-symbols:delete" className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
                {task.dueDate && (
                    <div className="flex items-center gap-1">
                        <Icon icon="ic:round-flag" className="w-4 h-4" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                )}
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;