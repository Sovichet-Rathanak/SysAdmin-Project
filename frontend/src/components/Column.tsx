import type { Task } from '../type';
import TaskCard from './TaskCard';


type ColumnProps = {
    columnId: string;
    columnTitle: string;
    tasks: Task[];
};

const Column = ({ columnTitle, tasks }: ColumnProps) => {
    return (
        <div className="w-100 border-gray-100 bg-gray-100 p-4 rounded-lg shadow-xs">
            <div className="flex gap-2.5 items-center mb-4">
                <h2 className="text-lg font-bold uppercase">{columnTitle}</h2>
                <span className="flex items-center justify-center text-white text-xs bg-blue-500 rounded-full px-2 py-0.5">
                    {tasks.length}
                </span>
            </div>

            <button className="mb-3 w-full py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                + Add Task
            </button>

            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    taskTitle={task.taskTitle}
                    priority={task.priority}
                    dueDate={task.dueDate}
                />
            ))}
        </div>
    );
};

export default Column;
