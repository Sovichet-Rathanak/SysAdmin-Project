import { Icon } from '@iconify/react';

type TaskCardProps = {
    taskTitle: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
};

const TaskCard = ({ taskTitle, priority, dueDate }: TaskCardProps) => {
    const priorityColor = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-red-100 text-red-700',
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 m-2 bg-gray-50" style={{boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)'}}> 
            <div className="text-2xl font-semibold text-gray-800">
                {taskTitle}
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                {dueDate && (
                    <div className="flex items-center gap-1">
                        <Icon icon="ic:round-flag" className="w-4 h-4" />
                        <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
                    </div>
                )}

                <div className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor[priority]}`}>
                    Urgency: {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
