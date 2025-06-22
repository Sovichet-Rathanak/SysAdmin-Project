import { useState } from 'react';

type TaskModalProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (taskData: {
        taskTitle: string;
        priority: 'low' | 'medium' | 'high';
        dueDate?: string;
    }) => void;
};

const TaskModal = ({ show, onClose, onSubmit }: TaskModalProps) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onSubmit({
                taskTitle: taskTitle.trim(),
                priority,
                dueDate: dueDate || undefined,
            });
            setTaskTitle('');
            setPriority('medium');
            setDueDate('');
        }
    };

    const handleClose = () => {
        setTaskTitle('');
        setPriority('medium');
        setDueDate('');
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>

            <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl w-96 max-w-md mx-4">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Task Title *
                        </label>
                        <input
                            id="taskTitle"
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task title"
                            required />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date (Optional)
                        </label>
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={handleClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
