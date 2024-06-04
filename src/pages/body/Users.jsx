import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateUserBtn from "../components/CreateUserBtn";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { toast } from "react-toastify";

import { getAllUsers } from "../../features/user/actions";

const columns = [
  {
    accessorKey: "first_name",
    header: "Nom",
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    enableClickToCopy: true,
    enableEditing: false,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    enableClickToCopy: true,
    enableEditing: true,
  },
 
];

const Users = () => {
  const dispatch = useDispatch();

  const [rowSelection, setRowSelection] = useState({});

  const { deletingUsers, users } = useSelector((state) => state.user);

  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteUsers = () => {
    if (users.length <= 1) {
      setRowSelection({});
      return;
    }
    const emails = Object.keys(rowSelection).map(
      (id) => users.find((u) => u._id === id)?.email
    );
    dispatch(deleteManyUsers({ emails }));
    setRowSelection({});
  };

  const handleDeleteRow = (row) => {
    dispatch(deleteManyUsers({ emails: [row.original.email] }));
  };

  // const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
  //   const oldRow = row.original;
  //   const newRow = values;
  //   for (let key of Object.keys(newRow)) {
  //     if (oldRow[key] == newRow[key]) continue;
  //     if (!Boolean(oldRow[key]) && !Boolean(newRow[key])) continue;
  //     const { _id: id } = oldRow;
  //     try {
  //       let value = newRow[key];
  //       await dispatch(updateUsers({ key, value, id })).unwrap();
  //     } catch (error) {
  //       toast.error(`${error}`);
  //     }
  //   }
  //   exitEditingMode();
  // };

  return (
    <div className="ml-[2rem] mr-[2rem]">
      <div className="mb-8 mt-8 flex justify-between items-center ">
        <p className="text-[18px] text-[#8C461F]">{users?.message}</p>
        <CreateUserBtn />
      </div>

      <MaterialReactTable
        columns={columns}
        data={users?.data || []}
        enableEditing={true}
        enableRowSelection
        enableGrouping={true}
        enablePagination={false}
        enableStickyHeader={true}
        enableColumnOrdering={false}
     //   onEditingRowSave={handleSaveRowEdits}
        getRowId={(row) => row?._id}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {
              <Tooltip arrow placement="left" title="Edit">
                <IconButton>
                  <Edit />
                </IconButton>
              </Tooltip>
            }
            {
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            }
          </Box>
        )}
        state={{
          isLoading: deletingUsers,
          rowSelection,
        }}
        onRowSelectionChange={setRowSelection}
      />
    </div>
  );
};

export default Users;
