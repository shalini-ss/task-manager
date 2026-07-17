import { Task } from "@/types/task";


interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-xl font-semibold">
        {task.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

      <p className="mt-3">
        {task.completed ? "✅ Completed" : "❌ Pending"}
      </p>
    </div>
  );
}