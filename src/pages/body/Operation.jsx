import React from "react";

import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import CreateOperatorBtn from "../components/CreateOperationBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOperation } from "../../features/operation/actions";
import { data } from "./MakeData";

const columns = [
  {
    accessorKey: "operation_nature",
    header: "Nature de l'opertion",
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: "sale_site",
    header: "site de vente",
    enableClickToCopy: true,
    enableEditing: false,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    enableClickToCopy: true,
    enableEditing: false,
  },
];

export default function Operation() {
  const dispatch = useDispatch();
  const operation = useSelector((state) => state.operation.operation);
  //console.log("operator", operation);

  useEffect(() => {
    dispatch(allOperation());
  }, [dispatch]);

  return (
    <div>
      <div className="ml-[2rem] mr-[2rem]">
        <div className="mb-8 mt-8 flex justify-between items-center">
          <p className="text-[18px] text-[#8C461F]">{operation?.message}</p>
          <CreateOperatorBtn />
        </div>

        <MaterialReactTable
          columns={columns}
          data={operation?.data || []}
          enableEditing={true}
          enableRowSelection
          enableGrouping={true}
          enablePagination={true}
          enableStickyHeader={true}
          enableColumnOrdering={false}
          /* onEditingRowSave={handleSaveRowEdits} */
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
          state={
            {
              /*    isLoading: deletingUsers, */
              /* rowSelection, */
            }
          } /* 
          onRowSelectionChange={setRowSelection} */
        />
      </div>
    </div>
  );
}
