type ModalProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
};

import { useState } from 'react';

const ColumnModal = ({ show, onClose, onSubmit }: ModalProps) => {
    const [title, setTitle] = useState('');

    if (!show) return null;

    const handleSubmit = () => {
        if (title.trim()) {
            onSubmit(title.trim());
            setTitle('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

            <div className="relative z-10 bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Create New Column</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Column Title"
                    className="w-full p-2 border rounded mb-4"/>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColumnModal;
