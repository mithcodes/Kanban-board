import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { deleteTask } from "../redux/taskSlice";
import TaskForm from "./TaskForm";

const TaskModal = ({ task, closeModal }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTask = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) return;

    dispatch(deleteTask(task.id));
    closeModal();
  };

  const handleEditMode = () => {
    setIsEditing(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-5 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {isEditing ? "Edit Task" : "Task Details"}
          </h2>

          <button
            onClick={closeModal}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <IoClose size={24} />
          </button>
        </div>

        {isEditing ? (
          <TaskForm
            task={task}
            status={task.status}
            closeModal={closeModal}
          />
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm text-slate-400">
                  Title
                </p>

                <h3 className="text-lg font-medium text-white">
                  {task.title}
                </h3>
              </div>

              {task.description && (
                <div>
                  <p className="mb-1 text-sm text-slate-400">
                    Description
                  </p>

                  <p className="text-slate-300">
                    {task.description}
                  </p>
                </div>
              )}

              {task.assignee && (
                <div>
                  <p className="mb-1 text-sm text-slate-400">
                    Assignee
                  </p>

                  <p className="text-white">
                    {task.assignee}
                  </p>
                </div>
              )}

              {task.tag && (
                <div>
                  <p className="mb-1 text-sm text-slate-400">
                    Tag
                  </p>

                  <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                    {task.tag}
                  </span>
                </div>
              )}

              {task.dueDate && (
                <div>
                  <p className="mb-1 text-sm text-slate-400">
                    Due Date
                  </p>

                  <p className="text-white">
                    {task.dueDate}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleEditMode}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                <FiEdit size={18} />
                Edit
              </button>

              <button
                onClick={handleDeleteTask}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
              >
                <FiTrash2 size={18} />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskModal;