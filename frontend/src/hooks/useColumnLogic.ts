import { useEffect, useState } from 'react';
import {
    getAllColumns,
    createColumn,
    deleteColumn,
    updateColumn,
    createTask,
    updateTask,
    deleteTask,
} from '../api/api';
import type { ColumnType, Task } from '../type';

export const useColumnLogic = () => {
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

    useEffect(() => {
        getAllColumns()
            .then((res) => {
                setColumns(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch columns');
                setLoading(false);
            });
    }, []);

    const handleCreateColumn = async (title: string) => {
        try {
            const res = await createColumn(title);
            setColumns((prev) => [...prev, { ...res.data, tasks: res.data.tasks || [] }]);
            setShowModal(false);
            setError(null);
        } catch (err) {
            console.error('Failed to create column:', err);
            setError('Failed to create column');
        }
    };

    const handleDeleteColumn = async (id: string) => {
        try {
            await deleteColumn(id);
            setColumns((prev) => prev.filter((col) => col._id !== id));
            setError(null);
        } catch (err) {
            console.error('Failed to delete column:', err);
            setError('Failed to delete column');
        }
    };

    const handleUpdateColumn = async (columnId: string, newTitle: string) => {
        try {
            const res = await updateColumn(columnId, newTitle);
            setColumns((prev) =>
                prev.map((col) =>
                    col._id === columnId ? { ...col, columnTitle: res.data.columnTitle || newTitle } : col
                )
            );
        } catch (error) {
            console.error('Failed to update column:', error);
            setError('Failed to update column');
        }
    };

    const handleCreateTask = async (
        columnId: string,
        taskData: { taskTitle: string; priority: 'low' | 'medium' | 'high'; dueDate?: string }
    ) => {
        try {
            const res = await createTask({ ...taskData, columnId });
            setColumns((prev) =>
                prev.map((col) =>
                    col._id === columnId ? { ...col, tasks: [...col.tasks, res.data] } : col
                )
            );
            setError(null);
        } catch (err) {
            console.error('Failed to create task:', err);
            setError('Failed to create task');
        }
    };

    const handleEditTask = async (taskId: string, update: Partial<Task>) => {
        try {
            const res = await updateTask(taskId, update);
            setColumns((prev) =>
                prev.map((col) => ({
                    ...col,
                    tasks: col.tasks.map((task) => (task._id === taskId ? { ...task, ...res.data } : task)),
                }))
            );
        } catch (error) {
            console.error('Failed to update task: ', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            setColumns((prev) =>
                prev.map((col) => ({
                    ...col,
                    tasks: col.tasks.filter((task) => task._id !== taskId),
                }))
            );
            setError(null);
        } catch (err) {
            console.error('Failed to delete task:', err);
            setError('Failed to delete task');
        }
    };

    const handleDragStart = (event: React.DragEvent, taskId: string) => {
        setDraggedTaskId(taskId);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (event: React.DragEvent, targetColumnId: string) => {
        event.preventDefault();
        if (!draggedTaskId) return;

        const sourceColumn = columns.find((col) =>
            col.tasks.some((task) => task._id === draggedTaskId)
        );
        if (!sourceColumn || sourceColumn._id === targetColumnId) return;

        const draggedTask = sourceColumn.tasks.find((task) => task._id === draggedTaskId);
        if (!draggedTask) return;

        try {
            await updateTask(draggedTaskId, { columnId: targetColumnId });
            setColumns((prev) =>
                prev.map((col) => {
                    if (col._id === sourceColumn._id) {
                        return { ...col, tasks: col.tasks.filter((task) => task._id !== draggedTaskId) };
                    } else if (col._id === targetColumnId) {
                        return { ...col, tasks: [...col.tasks, { ...draggedTask, columnId: targetColumnId }] };
                    }
                    return col;
                })
            );
        } catch (err) {
            console.error('Failed to move task:', err);
        } finally {
            setDraggedTaskId(null);
        }
    };

    return {
        columns,
        loading,
        error,
        showModal,
        setShowModal,
        handleCreateColumn,
        handleDeleteColumn,
        handleUpdateColumn,
        handleCreateTask,
        handleEditTask,
        handleDeleteTask,
        handleDragStart,
        handleDragOver,
        handleDrop,
    };
};
