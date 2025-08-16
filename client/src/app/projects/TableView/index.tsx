import React from "react";
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", flex: 1, minWidth: 100 },
  { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-200 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", flex: 1, minWidth: 75 },
  { field: "tags", headerName: "Tags", flex: 1, minWidth: 130 },
  { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 130 },
  { field: "dueDate", headerName: "Due Date", flex: 1, minWidth: 130 },
  {
    field: "author",
    headerName: "Author",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => params.value?.assignee || "Unassigned",
  },
];

const Table = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[450px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="bg-blue-primary flex cursor-pointer items-center rounded px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default Table;
