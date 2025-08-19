"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";
import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";

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
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`} // params.value is profilePictureUrl
            alt={params.row.username} // fallback if value missing
            width={36}
            height={36}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];
const Users = () => {
  const { data: usersResponse, isLoading, error } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (error || !usersResponse) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={usersResponse.data || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
        {/* {users?.data?.map((user) => (
          <div key={user.userId}>
            <h2>{user.username}</h2>
            <Image
              src={`/${user.profilePictureUrl}`}
              alt={user.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Users;
