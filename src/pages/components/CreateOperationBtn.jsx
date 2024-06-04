import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@material-tailwind/react";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getAllCommande } from "../../features/commande/actions";
import { getAllProducts } from "../../features/products/actions";
import { getAllCapcity } from "../../features/capacity/actions";
import {
  createOperator,
  getAllOperationNature,
  getAllRaison,
  allOperation,
} from "../../features/operation/actions";
import {
  getAllSiteVente,
} from "../../features/siteVente/actions";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

function CreateOperatorBtn() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const capacity = useSelector((state) => state.capacity.capacity.data);
  const operation = useSelector((state) => state.operation.operator.data);
  const siteVente = useSelector((state) => state.siteVente.siteVente.data);

  const raison = useSelector((state) => state.operation.raison.data);

  const agentId = useSelector((state) => state.user.agent_ID);
  const userCreatedId = useSelector((state) => state.user.user_ID);

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const [orderDescription, setOrderDescription] = useState("");
  const [currency, setCurrency] = useState();
  const [total_sum, setTotal_sum] = useState();
  const [total_quantity, setTotal_quantity] = useState();
  const [total_volume, setTotal_volume] = useState();
  const [ID_sale_site, setID_sale_site] = useState();
  console.log("ID_sale_site", ID_sale_site);
  const [ID_operation_nature, setID_operation_nature] = useState();
  const [ID_operation_reason, setID_operation_reason] = useState();
  const [ID_unit_volume, setID_unit_volume] = useState(1);
  const [annexs, setAnnex] = useState([]);
  const [enStock, setEnstock] = useState([]);

  const handleLineChange = (index, field, value) => {
    const updatedAnnex = [...annexs];
    updatedAnnex[index] = {
      ...updatedAnnex[index],
      [field]: value,
    };
    setAnnex(updatedAnnex);
  };



  const handleAddLine = () => {
    setAnnex([...annexs, {}]);
  };

  const handleRemoveLine = (index) => {
    const updatedAnnex = [...annexs];
    updatedAnnex.splice(index, 1);
    setAnnex(updatedAnnex);
  };

  const handleStockChange = (index, field, value) => {
    const updatedStock = [...enStock];
    updatedStock[index] = {
      ...updatedStock[index],
      [field]: value,
      created_by_user_ID: parseInt(parseInt(userCreatedId)),
    };
    setEnstock(updatedStock);
  };

  const handleAddStock = () => {
    setEnstock([...enStock, {}]);
  };

  const handleRemoveStock = (index) => {
    const updatedStock = [...enStock];
    updatedStock.splice(index, 1);
    setEnstock(updatedStock);
  };

  useEffect(() => {
    dispatch(getAllOperationNature())
    dispatch(getAllProducts())
    dispatch(getAllRaison())
    dispatch(getAllCapcity())
    dispatch(getAllSiteVente())
    
  }, [dispatch]);

  const handleSubmit = async () => {
    const requiredFields = [
      agentId,
      total_sum,
      total_quantity,
      total_volume,
      userCreatedId,
    ];

    if (requiredFields.some((field) => !field)) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const orderData = {
      ID_agent: parseInt(agentId),
      total_sum,
      total_quantity,
      created_by_user_ID: parseInt(userCreatedId),
      total_volume,
      ID_currency: currency,
      ID_sale_site,
      ID_operation_nature,
      ID_operation_reason,
      ID_unit_volume,
      annex: annexs,
      stock: enStock,
    };
    console.log("dispasth", orderData);
    try {
      dispatch(createOperator(orderData))
        .unwrap()
        .then(() => {
          closeCreate();
          toast.success("operation créée avec succès");
          dispatch(allOperation());
        })
        .catch((err) => {
          toast.error(`${err}`);
        });
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
    <div>
      <Button
        className="bg-[#8C461F] h-[2rem] items-center flex"
        onClick={openCreate}
      >
        <Add /> Créer une opération
      </Button>

      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Votre operation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="number"
            margin="dense"
            id="total_sum"
            label="Somme total"
            value={parseInt(total_sum)}
            onChange={(e) => setTotal_sum(parseInt(e.target.value))}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            type="number"
            id="total_quantity"
            label="quantité total"
            value={parseInt(total_quantity)}
            onChange={(e) => setTotal_quantity(parseInt(e.target.value))}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            type="number"
            id="total_volume"
            label="Volume total"
            value={parseInt(total_volume)}
            onChange={(e) => setTotal_volume(parseInt(e.target.value))}
            fullWidth
          />
          <div className="mt-4">
            <TextField
              select
              label="point_vente"
              value={parseInt(ID_sale_site)}
              onChange={(e) => setID_sale_site(parseInt(e.target.value))}
              fullWidth
            >
              {siteVente.map((site) => (
                <MenuItem key={site.ID} value={site.ID}>
                {site.labele}
              </MenuItem>
            ))}
            console.log('sss',siteVente)
            </TextField>
          </div>
          <div className="mt-4">
            <TextField
              select
              label="Devise"
              value={parseInt(currency)}
              onChange={(e) => setCurrency(parseInt(e.target.value))}
              fullWidth
            >
              <MenuItem value={1}>CDF</MenuItem>

              <MenuItem value={2}>USD</MenuItem>
            </TextField>
          </div>
          <div className="mt-4">
            <TextField
              select
              label="Nature de l'operation"
              value={parseInt(ID_operation_nature)}
              onChange={(e) => setID_operation_nature(parseInt(e.target.value))}
              fullWidth
            >
              {operation?.map((ope) => (
                <MenuItem key={ope.ID} value={ope.ID}>
                  {ope?.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="mt-4">
            <TextField
              select
              label="Raison de l'operation"
              value={parseInt(ID_operation_reason)}
              onChange={(e) => setID_operation_reason(parseInt(e.target.value))}
              fullWidth
            >
              {raison?.map((rais) => (
                <MenuItem key={rais.ID} value={rais.ID}>
                  {rais.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="mt-4">
            <TextField
              select
              label="Volume unitaire"
              value={parseInt(ID_unit_volume)}
              onChange={(e) => setID_unit_volume(parseInt(e.target.value))}
              fullWidth
            >
              {capacity?.map((capacit) => (
                <MenuItem key={capacit.ID} value={capacit.ID}>
                  {capacit?.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {annexs.map((annex, index) => (
            <div key={index} className="py-2 ">
              <div className="mb-4 w-full">
                <TextField
                  type="number"
                  label="Volume"
                  value={annex.volume || ""}
                  onChange={(e) =>
                    handleLineChange(index, "volume", parseInt(e.target.value))
                  }
                  fullWidth
                />
              </div>

              <div className="mb-4 w-full">
                <TextField
                  type="text"
                  label="Article"
                  value={annex.articles || ""}
                  onChange={(e) =>
                    handleLineChange(index, "articles", e.target.value)
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  type="text"
                  label="Observation"
                  value={annex.observation || ""}
                  onChange={(e) =>
                    handleLineChange(index, "observation", e.target.value)
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  type="number"
                  label="Quantité"
                  value={annex.quantity || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  type="number"
                  label="Prix unitaire"
                  value={annex.unit_price || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "unit_price",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  select
                  type="number"
                  label="Devise"
                  value={parseInt(annex.ID_currency) || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "ID_currency",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                >
                  <MenuItem value={1}>CDF</MenuItem>

                  <MenuItem value={2}>USD</MenuItem>
                </TextField>
              </div>

              <Button
                className="bg-red-500 text-white font-bold px-5 py-2 mt-2"
                onClick={() => handleRemoveLine(index)}
              >
                Supprimer cet annexe
              </Button>
            </div>
          ))}

          {enStock.map((enStoc, index) => (
            <div key={index} className="py-2">
              <div className="mb-4">
                <TextField
                  select
                  label="Nom du produit"
                  type="text"
                  value={parseInt(enStoc.ID_product) || ""}
                  onChange={(e) =>
                    handleStockChange(index, "ID_product", e.target.value)
                  }
                  fullWidth
                >
                  {products?.data?.map((product) => (
                    <MenuItem key={product.ID} value={product.ID}>
                      {product.description}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="mb-4 w-full">
                <TextField
                  type="text"
                  label="Quantité"
                  value={enStoc.quantity || ""}
                  onChange={(e) =>
                    handleStockChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  select
                  type="text"
                  label="Volume initial"
                  value={enStoc.ID_volume_unit || ""}
                  onChange={(e) =>
                    handleStockChange(
                      index,
                      "ID_volume_unit",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                >
                  {capacity?.map((capacit) => (
                    <MenuItem key={capacit.ID} value={capacit.ID}>
                      {capacit?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-4 w-full">
                <TextField
                  type="number"
                  label="prix"
                  value={enStoc.price || ""}
                  onChange={(e) =>
                    handleStockChange(index, "price", parseInt(e.target.value))
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4 w-full">
                <TextField
                  select
                  type="number"
                  label="Devise"
                  value={parseInt(enStoc.ID_currency) || ""}
                  onChange={(e) =>
                    handleStockChange(
                      index,
                      "ID_currency",
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                >
                  <MenuItem value={1}>CDF</MenuItem>

                  <MenuItem value={2}>USD</MenuItem>
                </TextField>
              </div>

              <Button
                className="bg-red-500 text-white font-bold px-5 py-2 mt-2"
                onClick={() => handleRemoveStock(index)}
              >
                Supprimer ce stock
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              className="bg-[#8C461F] text-white font-bold px-5 py-2 mt-2"
              onClick={handleAddLine}
            >
              Ajouter un annex
            </Button>
            <Button
              className="bg-[#8C461F] text-white font-bold px-5 py-2 mt-2"
              onClick={handleAddStock}
            >
              Ajouter en stock
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={closeCreate}
          >
            Fermer
          </button>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateOperatorBtn;
