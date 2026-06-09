import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, editTask } from "../redux/taskSlice";

const TaskForm = ({ status, closeModal, task }) => {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    assignee: task ? task.assignee : "",
    dueDate: task ? task.dueDate : "",
    tag: task ? task.tag : "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = taskData.title.trim();

    if (!trimmedTitle) {
      alert("Task title is required");
      return;
    }

    if (task) {
      // editing existing task
      dispatch(
        editTask({
          ...task,
          ...taskData,
          title: trimmedTitle,
        })
      );
    } else {
      
      const newTask = {
        id: uuidv4(),
        ...taskData,
        title: trimmedTitle,
        status,
      };

      dispatch(addTask(newTask));
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <input
        type="text"
        name="title"
        placeholder="Task Title *"
        value={taskData.title}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={taskData.description}
        onChange={handleChange}
        rows={3}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
      />

      <input
        type="text"
        name="assignee"
        placeholder="Assignee"
        value={taskData.assignee}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
      />

      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-blue-500"
      />

      <input
        type="text"
        name="tag"
        placeholder="Tag (e.g. bug, feature)"
        value={taskData.tag}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          {task ? "Update Task" : "Add Task"}
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="flex-1 rounded-lg bg-slate-700 py-2 font-medium text-white transition hover:bg-slate-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;