Kanban Task Board

A responsive and interactive Kanban Task Management Application built using React.js, Redux Toolkit, and Tailwind CSS.

The application allows users to efficiently manage tasks through a structured Kanban workflow by creating, updating, deleting, searching, and moving tasks across different stages using drag-and-drop functionality.


----------------------------------------------------------------------------------------------------

Project Overview

This project is designed to simulate a real-world Kanban workflow system used by teams to organize tasks and track progress.

The board contains three workflow stages:

Backlog — Tasks that are yet to be started
In Progress — Tasks currently being worked on
Done — Completed tasks

Each column dynamically displays the total number of tasks currently available.

------------------------------------------------------------------------------------------------------

Features
Task Management

Users can:

Create a task in any column
Edit an existing task
Delete a task with confirmation
Open a task to view complete details inside a modal

-----------------------------------------------------------------------------------------------------

Task Information

Each task supports the following fields:

Field	      Description
Title	      Required field for task creation
Description	  Additional task details
Assignee	  Person responsible for the task
Tag	          Category or label for the task
Due Date	  Deadline for the task

-----------------------------------------------------------------------------------------------------

Drag and Drop Support

The application supports:

Reordering tasks within the same column
Moving tasks between different columns
Smooth drag-and-drop interaction

Library used:

@hello-pangea/dnd

--------------------------------------------------------------------------------------------------------

State Management

The project uses Redux Toolkit for centralized state management.

Redux is responsible for managing:

Task creation
Task editing
Task deletion
Task movement between columns
Search filtering

Using Redux ensures predictable state updates and improves component reusability across the application.

--------------------------------------------------------------------------------------------------------

Data Persistence

Task data is persisted using localStorage.

Whenever task data changes, the updated state is automatically stored in localStorage.

This ensures:

Tasks remain available after refreshing the browser
Column state remains preserved
Task ordering stays intact

Persistence logic is handled through Redux store subscription.

----------------------------------------------------------------------------------------------------------

Tech Stack

Frontend Technologies
React.js
Redux Toolkit
Tailwind CSS
External Libraries
@hello-pangea/dnd
lucide-react
react-icons
uuid

--------------------------------------------------------------------------------------------------------


Folder Description

components/

This folder contains reusable UI components used throughout the application.

Board.jsx – Responsible for rendering the main Kanban board layout and managing all columns.

Column.jsx – Represents an individual Kanban column such as Backlog, In Progress, and Done.

SearchBar.jsx – Provides functionality to search and filter tasks by title or description.

TaskCard.jsx – Displays individual task information in card format.

TaskForm.jsx – Handles task creation and editing functionality through a form.

TaskModal.jsx – Displays detailed task information inside a modal popup.

 redux/

This folder contains Redux Toolkit configuration and application state management logic.

store.js – Configures and manages the Redux store for the application.

taskSlice.js – Contains reducers and actions for managing task-related operations.

App.jsx

The main application component responsible for rendering the complete application layout.

main.jsx

The entry point of the React application where the app is initialized and rendered.


-------------------------------------------------------------------------------------------------------

Key Functionalities Implemented

Responsive Kanban Board Layout
Fixed Height Scrollable Columns
Drag & Drop Task Management
Task Reordering
Task Search
Modal-Based Task Details
Redux Toolkit State Management
Persistent Data Storage using localStorage
Reusable Component Architecture

---------------------------------------------------------------------------------------------------------