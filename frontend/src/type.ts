export type Task = {
    _id: string;
    taskTitle: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    columnId: string;
};

export type ColumnType = {
    _id: string;
    columnTitle: string;
    tasks: Task[];
};
