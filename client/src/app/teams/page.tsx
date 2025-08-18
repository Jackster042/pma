"use client";

import Header from "@/components/Header";
import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "../redux";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="toolbar flex gap-2">
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <GridToolbarQuickFilter /> {/* replaces density selector */}
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: teams, isLoading, error } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error || !teams) return <div>An error occurred while fetching tasks</div>;

  console.log(teams, "Teams");

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
