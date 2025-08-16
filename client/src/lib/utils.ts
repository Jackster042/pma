export const dataGridClassNames =
  "border border-gray-200 shadow dark:border-stroke-dark dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => ({
  "&.MuiDataGrid-root": {
    backgroundColor: isDarkMode ? "#1d1f21" : "#fff",
    color: isDarkMode ? "#e5e7eb" : "#111",
    borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
  },

  "& .MuiDataGrid-columnHeaders": {
    color: `${isDarkMode ? "#e5e7eb" : ""}`,
    '& [role="row"] > *': {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
      borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
    },
  },

  "& .MuiDataGrid-cell": {
    borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: isDarkMode ? "#2a2d31" : "#f3f4f6",
    borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
  },

  "& .MuiIconButton-root, & .MuiTablePagination-root, & .MuiTablePagination-selectIcon":
    {
      color: isDarkMode ? "#a3a3a3" : "#111",
    },
  "& .MuiDataGrid-virtualScrollerContent": {
    backgroundColor: isDarkMode ? "#1d1f21" : "#fff",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: isDarkMode ? "#1d1f21" : "#fff",
  },
});
