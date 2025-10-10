import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { IconShoppingCart } from "@tabler/icons-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Cart() {
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/medicinedatacart",

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setcartItems(res.data);
      });
  }, []);

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, marginTop: 10, color: "#8250df" }}>
        <IconShoppingCart color="#8250df" /> Your Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={item.mediName}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Button
              variant="contained"
              disabled
              style={{
                backgroundColor:
                  item.status === "accepted"
                    ? "#5cb85cb4" // green
                    : item.status === "rejected"
                    ? "#d9544fb6" // red
                    : "#740b807c", // orange for pending
                borderRadius: "20px",
                width: "80px",
                height: "30px",
                color: "white",
                textTransform: "lowercase",
              }}
            >
              {item.status}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Cart;
