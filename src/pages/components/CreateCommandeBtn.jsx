import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@material-tailwind/react";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getAllCommande } from "../../features/commande/actions";
import { getAllProducts } from "../../features/products/actions";
import { getAllCapcity } from "../../features/capacity/actions";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

function CreateCommandeBtn() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const capacity = useSelector((state) => state.capacity.capacity.data);
  const agentId = useSelector((state) => state.user.agent_ID);
  const userCreatedId = useSelector((state) => state.user.user_ID);

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const [orderDescription, setOrderDescription] = useState("");

  const [saleSiteId, setSaleSiteId] = useState(1);
  const [lines, setLines] = useState([]);

  const handleLineChange = (index, field, value) => {
    const updatedLines = [...lines];
    updatedLines[index] = {
      ...updatedLines[index],
      [field]: value,
    };
    setLines(updatedLines);
  };

  const handleAddLine = () => {
    setLines([...lines, {}]);
  };

  const handleRemoveLine = (index) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCapcity());
  }, []);

  const handleSubmit = async () => {
    if (
      !orderDescription ||
      !agentId ||
      !userCreatedId ||
      !saleSiteId ||
      lines.length === 0
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const orderData = {
      description: orderDescription,
      ID_ordering_agent: parseInt(agentId),
      ID_user_created_at: parseInt(userCreatedId),
      ID_sale_site: saleSiteId,
      line: lines,
    };

    

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        closeCreate();
        toast.success("Commande créée avec succès");
        dispatch(getAllCommande());
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  return (
    <div>
      <Button
        className="bg-[#8C461F] h-[2rem] items-center flex"
        onClick={openCreate}
      >
        <Add /> Créer une commande
      </Button>
      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Votre commande</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description de la commande"
            value={orderDescription}
            onChange={(e) => setOrderDescription(e.target.value)}
            fullWidth
          />

          {lines.map((line, index) => (
            <div key={index} className="py-2">
              <div className="mb-4 w-full">
                <TextField
                  type="number"
                  label="Quantité"
                  value={line.quantity || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "quantity",
                      e.target.value
                    )
                  }
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <TextField
                  select
                  label="L' unité"
                  value={line.ID_quantity_unit || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "ID_quantity_unit",
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

              <div className="mb-4">
                <TextField
                  select
                  label="Nom du produit"
                  value={line.ID_product || ""}
                  onChange={(e) =>
                    handleLineChange(
                      index,
                      "ID_product",
                      parseInt(e.target.value)
                    )
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

              <Button
                className="bg-red-500 text-white font-bold px-5 py-2 mt-2"
                onClick={() => handleRemoveLine(index)}
              >
                Supprimer
              </Button>
            </div>
          ))}
          <Button
            className="bg-[#8C461F] text-white font-bold px-5 py-2 mt-2"
            onClick={handleAddLine}
          >
            Ajouter une ligne
          </Button>
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

export default CreateCommandeBtn;
