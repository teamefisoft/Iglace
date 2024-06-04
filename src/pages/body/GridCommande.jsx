import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Checkbox,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
} from "material-react-table";
import styled from "@emotion/styled";
import CreateCommandeBtn from "../components/CreateCommandeBtn";
import "../../index.css";
import { getAllCommande, putCommande } from "../../features/commande/actions";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";

const GridCommande = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.commandes.orders);
  const [loading, setLoading] = useState(true);
  const agentId = useSelector((state) => state.user.agent_ID);
  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const columns = [
    {
      accessorKey: "checkbox",
      header: "",
      Cell: ({ row }) => (
        <TableCell align="left" variant="body">
          <Checkbox
            checked={selectedOrders.includes(row.original)}
            onChange={() => handleRowSelection(row.original)}
          />
        </TableCell>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "estimated_price",
      header: "Prix",
      size: 300,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "activateButton",
      header: " ",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          disableElevation
          style={{
            backgroundColor: "#8B5742",
            color: "#ffffff",
            textTransform: "capitalize",
          }}
        >
          Valider
        </Button>
      ),
    },
  ];

  const handleSubmit = async (order_rf, status, ID_delivery_agent) => {
    const status_new = {
      order_rf: order_rf,
      status: status,
      ID_delivery_agent: ID_delivery_agent,
    };

    dispatch(putCommande(status_new))
      .unwrap()
      .then(() => {
        closeCreate();
        setLoading(false);
        toast.success("Valider");
        dispatch(getAllCommande());
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  useEffect(() => {
    dispatch(getAllCommande())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleRowSelection = (order) => {
    const isSelected = selectedOrders.includes(order);
    let updatedSelectedOrders;

    if (isSelected) {
      updatedSelectedOrders = selectedOrders.filter(
        (selectedOrder) => selectedOrder !== order
      );
    } else {
      updatedSelectedOrders = [...selectedOrders, order];
    }

    setSelectedOrders(updatedSelectedOrders);
  };

  const table = useMaterialReactTable({
    columns,
    data: orders,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [50, 100, 200],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

  const StyledCheckbox = styled(Checkbox)`
    &.Mui-checked {
      color: #8c461f;
    }
  `;

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            color: "#8C461F",
          }}
        >
          <div role="status" className="flex items-center justify-center">
            <svg
              ariaHidden="true"
              className="w-[50px] h-[50px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#8C461F]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <Stack sx={{ m: "2rem 0" }}>
            <div className="flex items-center justify-between text-center">
              <Typography variant="h6">{orders.message}</Typography>
              <CreateCommandeBtn />
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1rem",
              }}
            ></Box>
            <div className="mt-4">
              <p>{orders.message}</p>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" variant="body">
                      <Checkbox
                        checked={selectedOrders.includes()}
                        onChange={() => handleRowSelection()}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.accessorKey}
                        style={{
                          width: column.size,
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {column.header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders?.data?.map((order) => (
                    <TableRow key={order.ID} className="hover-row">
                      <TableCell align="left" variant="body">
                        <Checkbox
                          checked={selectedOrders.includes(order)}
                          onChange={() => handleRowSelection(order)}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          align="left"
                          variant="body"
                          key={column.accessorKey}
                        >
                          {column.accessorKey === "activateButton" ? (
                            <Button
                              variant="contained"
                              className="custom-brown-button"
                              style={{
                                backgroundColor: "#8B5742",
                                color: "#ffffff",
                                fontSize: "13px",
                                padding: "6px",
                                textTransform: "capitalize",
                              }}
                              disableElevation
                              disabled={order.status === "delivered"} // Désactive le bouton si le statut est "delivered"
                              onClick={() =>
                                handleSubmit(
                                  order.order_rf,
                                  "Delivered",
                                  agentId
                                )
                              }
                            >
                              Valider
                            </Button>
                          ) : (
                            <span>{order[column.accessorKey]}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default GridCommande;
