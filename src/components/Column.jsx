import { useState } from "react";
import { useSelector } from "react-redux";
import { Droppable } from "@hello-pangea/dnd";
import { Plus, X } from "lucide-react";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const Column = ({ title, status }) => {
  const [showForm, setShowForm] = useState(false);

  const { tasks, searchTerm } = useSelector((state) => state.task);

  const totalTasks = tasks.filter((task) => task.status === status).length;

  const filteredTasks = tasks.filter(
    (task) =>
      task.status === status &&
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (

     <div className="flex h-[480px] w-full flex-col rounded-3xl border border-slate-700 bg-slate-800 p-5 lg:w-[480px]">
     <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {totalTasks}
        </span>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Task
      </button>

    
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-5 md:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Add Task</h2>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <TaskForm status={status} closeModal={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="custom-scrollbar max-h-[60vh] overflow-y-auto space-y-4 pr-1"
            style={{ minHeight: "300px" }}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            ) : (
              <p className="mt-10 text-center text-slate-400">
                No tasks available
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;