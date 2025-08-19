"use client";

import React, { use, useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import {
  Priority,
  useGetTasksByUserQuery,
  useGetUsersQuery,
} from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  // const [view, setView] = useState<string>("");
  const [view, setView] = useState<"list" | "table">("list");

  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  //   TODO: GET CURRENT AUTH USER ID
  const { data: users } = useGetUsersQuery();
  //   SIMULATED AUTH USER
  const userId = users?.data?.[1]?.userId;

  console.log(userId, "USER ID");

  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0);

  const filteredTasks = tasks?.filter((task) => task.priority === priority);

  if (isTaskError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(!isModalNewTaskOpen)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300 dark:text-white" : "bg-white"
          } cursor-pointer rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300 dark:text-white" : "bg-white"
          } cursor-pointer rounded-r`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {/* Display tasks list or table */}
      {isLoading ? (
        <div>Loading...</div>
      ) : view === "list" ? (
        <div>
          {filteredTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
