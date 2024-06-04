import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Button } from "@material-tailwind/react";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommande } from "../../features/commande/actions";
import DataTable from "react-data-table-component";
import Papa from "papaparse";

// import { Button } from "@mui/material";

const CommandeGrid = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.commandes.orders);
  const [selectedRows, setSelectedRows] = useState([]);
  const [exportFileType, setExportFileType] = useState("csv");

  useEffect(() => {
    dispatch(getAllCommande());
  }, []);

  const columns = [
    // {
    //   accessorKey: "checkbox",
    //   header: "",
    //   Cell: ({ row }) => (
    //     <TableCell align="left" variant="body">
    //       <Checkbox
    //         checked={selectedOrders.includes(row.original)}
    //         onChange={() => handleRowSelection(row.original)}
    //       />
    //     </TableCell>
    //   ),
    // },
    {
      accessor: "description",
      name: "Description",
    },
    {
      accessor: "estimated_price",
      name: "Prix",
      width: "300px",
    },
    {
      accessor: "status",
      name: "Statut",
    },
    {
      accessor: "activateButton",
      name: " ",
      cell: ({ row }) => (
        <Button
          variant="contained"
          disableElevation
          style={{
            backgroundColor: "#8B5742",
            color: "#ffffff",
            textTransform: "capitalize",
            height: "2rem",
          }}
        >
          Valider
        </Button>
      ),
    },
  ];

  const generateCSVData = () => {
    const csvData = selectedRows.map((rowIndex) => {
      const order = orders?.data[rowIndex];
      return {
        Description: order.description,
        Prix: order.estimated_price,
        Statut: order.status,
      };
    });
    return csvData;
  };

  const generateExcelData = async () => {
    const csvData = generateCSVData();
    const workbook = XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);
    sheet.cell("A1").value("Description");
    sheet.cell("B1").value("Prix");
    sheet.cell("C1").value("Statut");
    csvData.forEach((row, index) => {
      sheet.cell(`A${index + 2}`).value(row.Description);
      sheet.cell(`B${index + 2}`).value(row.Prix);
      sheet.cell(`C${index + 2}`).value(row.Statut);
    });
    const excelBlob = await workbook.outputAsync();
    saveAs(excelBlob, "commandes.xlsx");
  };

  const handleExportRows = () => {
    const csvData = generateCSVData();
    if (exportFileType === "csv") {
      const csv = Papa.unparse(csvData);
      const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(csvBlob, "commandes.csv");
    } else if (exportFileType === "excel") {
      generateExcelData();
    }
  };

  const handleRowSelection = (selectedRowIndexes) => {
    setSelectedRows(selectedRowIndexes);
  };

  return (
    <>
      <div className="mt-4">
        <p>{orders.message}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleExportRows} className="bg-[#8B5742] h-[2rem]">
          Exporter en CSV
        </Button>
        <Button onClick={handleExportRows} className="bg-[#8B5742] h-[2rem]">
          Exporter en Excel
        </Button>
        {selectedRows.length > 0 && (
          <>
            <CSVLink data={generateCSVData()} filename="commandes.csv">
              Télécharger les lignes sélectionnées (CSV)
            </CSVLink>
            <button onClick={generateExcelData}>
              Télécharger les lignes sélectionnées (Excel)
            </button>
          </>
        )}
      </div>
      <DataTable
        columns={columns}
        data={orders.data}
        selectableRows // Activer la sélection des lignes
        onSelectedRowsChange={handleRowSelection} // Gérer les changements de sélection des lignes
      />
    </>
  );
};

export default CommandeGrid;
