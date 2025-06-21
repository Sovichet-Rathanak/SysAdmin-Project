import TaskCard from "./components/TaskCard"

function App() {
  return (
    <div>
      <TaskCard
        taskTitle="Learn React"
        priority="high"
        dueDate="2025-06-23" />
    </div>
  )
}

export default App
