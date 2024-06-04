import React from "react";

import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";

import CreateAffectationBtn from "../components/CreateAffectation";
import EditeAffectationBtn from "../components/EditeAffectation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAffectation,putAffectation } from "../../features/affectation/actions";
import { data } from "./MakeData";

const columns = [
  {
    accessorKey: "ID_agent",
    header: "Nom de l'agent",
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: "affected_at",
    header: "Date d'affectation",
    enableClickToCopy: true,
    enableEditing: false,
  },
  {
    accessorKey: "sale_site",
    header: "lieu d'affectation",
    enableClickToCopy: true,
    enableEditing: false,
  },
];

export default function Affectation() {

  const dispatch = useDispatch();
  const affectation = useSelector((state) => state.affectation.affectation);
  //console.log("operator", affectation);

  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleEditClick = (agent) => {
    setSelectedAgent(agent);
    setOpenEditPopup(true);
  };
  
  const handleSubmit = async (ID_agent, ID_sale_site) => {
    const sale_site_new = {
      ID_agent: ID_agent,
      ID_sale_site: ID_sale_site,
    };





    dispatch(putAffectation(sale_site_new))
      .unwrap()
      .then(() => {
        closeCreate();
        setLoading(false);
        toast.success("Lieu d'affectation modifier");
        dispatch(getAllAffectation());
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  useEffect(() => {
    dispatch(getAllAffectation());
  }, []);

  return (
    <div>
      <div className="ml-[2rem] mr-[2rem]">
        <div className="mb-8 mt-8 flex justify-between items-center">
          <p className="text-[18px] text-[#8C461F]">{affectation?.message}</p>
          <CreateAffectationBtn />
        </div>

        <MaterialReactTable
          columns={columns}
          data={affectation?.data || []}
          enableEditing={true}
          enableRowSelection
          enableGrouping={true}
          enablePagination={false}
          enableStickyHeader={true}
          enableColumnOrdering={false}
          /* onEditingRowSave={handleSaveRowEdits} */
          getRowId={(row) => row?._id}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              {
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => handleEditClick(row.original)}>
                    <Edit />
                  </IconButton>
                  <div>
                  <EditeAffectationBtn
                  open={openEditPopup}
                  onClose={() => setOpenEditPopup(false)}
                  agent={selectedAgent}
                  onSubmit={handleSubmit}
                />
                  </div>
                
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
           
           
          ) }
          
          
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
