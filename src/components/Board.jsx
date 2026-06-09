import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import Column from "./Column";
import SearchBar from "./SearchBar";
import { moveTask } from "../redux/taskSlice";

const columns = [
  {
    title: "Backlog",
    status: "backlog",
  },
  {
    title: "In Progress",
    status: "in-progress",
  },
  {
    title: "Done",
    status: "done",
  },
];

const Board = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(
    (state) => state.task.tasks
  );

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const updatedTasks = tasks.map((t) => ({ ...t }));

    const sourceTasks = updatedTasks.filter(
      (t) => t.status === source.droppableId
    );
    const draggedTask = sourceTasks[source.index];
    draggedTask.status = destination.droppableId;

    const remaining = updatedTasks.filter((t) => t.id !== draggedTask.id);
    const destTasks = remaining.filter(
      (t) => t.status === destination.droppableId
    );
    destTasks.splice(destination.index, 0, draggedTask);

    const others = remaining.filter(
      (t) => t.status !== destination.droppableId
    );

    dispatch(moveTask([...others, ...destTasks]));
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-slate-900 p-4 md:p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl">
          Kanban Board
        </h1>

        <SearchBar />

        
        <div className="mx-auto flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
          {columns.map((column) => (
            <Column
              key={column.status}
              title={column.title}
              status={column.status}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;