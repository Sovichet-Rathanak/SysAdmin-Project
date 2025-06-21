import { useEffect, useState } from 'react';
import Column from './components/Column';
import { getAllColumns } from './api/api';
import type { ColumnType } from './type';

function App() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllColumns()
      .then((res) => {
        setColumns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch columns');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading columns...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-semibold p-6 mb-4 shadow">Web Application Mission</h1>
      <div className="flex gap-6 px-6">
        {columns.map((col) => (
          <Column
            key={col._id}
            columnId={col._id}
            columnTitle={col.columnTitle}
            tasks={col.tasks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
