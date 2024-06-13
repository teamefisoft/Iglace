import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateUserBtn from "../components/CreateUserBtn";
import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import EditeAffectationBtn from "../components/EditeAffectation";
import { useDisclosure } from "@mantine/hooks";
import { getAllAffectation,putAffectation } from "../../features/affectation/actions";

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
  }
 
];

const Users = () => {
  const dispatch = useDispatch();

  const [rowSelection, setRowSelection] = useState({});
  const { deletingUsers, users } = useSelector((state) => state.user);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEditClick = (agent) => {
    setSelectedAgent(agent.ID);
    setOpenEditPopup(true);
    };
    const handleSubmit = async (data,ID_sale_site) => {
   
    if (selectedAgent) {
      const sale_site_new = {
        ID_agent: selectedAgent,
        ID_sale_site: ID_sale_site,
      };
   

    dispatch(putAffectation(sale_site_new))
      .unwrap()
      .then(() => {
        closeCreate();
      //  setLoading(false);
        toast.success("Lieu d'affectation modifier");
        dispatch(getAllAffectation());
      })
      .catch((err) => {
        toast.error(`${err}`);
      }); }
  };

//console.log(users);

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
              <Tooltip arrow placement="top" title="Delete">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            }
              {
              <Tooltip arrow placement="right" title="Affecter">
               <Button 
                onClick={() => handleEditClick(row.original)}
              
                style={{
                  backgroundColor: "#8B5742",
                  color: "#ffffff",
                  textTransform: "capitalize",
                }}>
                Affecter
               </Button>
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
       <div>
      <EditeAffectationBtn
        open={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        agent={selectedAgent}
        onSubmit={handleSubmit}
      />
    </div>
    </div>
  );
};

export default Users;
