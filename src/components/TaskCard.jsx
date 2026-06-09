import { useState, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Calendar, User } from "lucide-react";

import TaskModal from "./TaskModel";

const TaskCard = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);
  const touchStart = useRef(null);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setShowModal(true)}
            onTouchStart={(e) => {
              touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              };
            }}
            onTouchEnd={(e) => {
              if (!touchStart.current) return;
              const dx = Math.abs(e.changedTouches[0].clientX - touchStart.current.x);
              const dy = Math.abs(e.changedTouches[0].clientY - touchStart.current.y);
              touchStart.current = null;
              if (dx < 10 && dy < 10) {
                e.preventDefault();
                setShowModal(true);
              }
            }}
            className={`cursor-pointer rounded-xl border border-slate-700 bg-slate-900 p-4 transition hover:border-blue-500 ${snapshot.isDragging ? "shadow-lg shadow-blue-500/20 border-blue-500" : ""}`}
          >
            <h3 className="mb-2 font-semibold text-white">
              {task.title}
            </h3>

            {task.description && (
              <p className="mb-3 text-sm text-slate-400 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {task.tag && (
                <span className="rounded-md bg-blue-600/20 px-2 py-0.5 text-xs text-blue-400">
                  {task.tag}
                </span>
              )}

              {task.assignee && (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <User size={12} />
                  {task.assignee}
                </span>
              )}

              {task.dueDate && (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={12} />
                  {task.dueDate}
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {showModal && (
        <TaskModal task={task} closeModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export default TaskCard;