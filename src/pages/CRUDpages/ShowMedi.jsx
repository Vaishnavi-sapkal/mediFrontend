import { Box, Button, Paper, Typography } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ShowMedi() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [medicine, setmedicine] = useState(null);
  const [currId, setcurrId] = useState("");
  const [yourRole, setyourRole] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/medicinedata/${id}`).then((res) => {
      setmedicine(res.data);
    });
  }, [id]);

  let handleDelete = (id) => {
    axios.delete(`http://localhost:5000/medicinedata/${id}/delete`);
    navigate(`/medicines`);
  };

  let handleReceiverId = async (id) => {
    const { data } = await axios.post(
      "http://localhost:5000",
      {},
      { withCredentials: true }
    );

    const res = await axios.get("http://localhost:5000/role", {
      withCredentials: true,
    });

    let userrole = res.data.role;
    // console.log("cuurid", res.data._id);
    setcurrId(res.data._id);
    console.log("my role is... : ", userrole);
    setyourRole(userrole);
    if (userrole == "Pharmacy") {
      await axios.patch(
        `http://localhost:5000/medicinedata/${id}/request`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate(`/medicines`);
      toast.success("Request send successfully!!");
    } else {
      toast.error("You are not NGO or Pharmacy!!");
    }
  };

  return (
    <>
      {!medicine ? (
        <h4>page is loading</h4>
      ) : (
        <Paper
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {medicine.mediName}
              </Typography>
            </Box>

            <Box>
              <img
                src={medicine.image}
                alt="listing_image"
                style={{
                  height: 300,
                  width: 400,
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography>
                  <i>Donated by: {medicine.donarId.userName}</i>
                </Typography>
                <Typography>
                  <b>Company:</b> {medicine.company}
                </Typography>
                <Box sx={{ width: 400 }}>
                  <Typography>
                    <b>Description : </b>
                    {medicine.description}
                  </Typography>
                </Box>
                <Typography>
                  {" "}
                  <b>Quantity : </b>
                  {medicine.quantity}
                </Typography>
              </Box>
            </Box>

            {(currId === medicine.donarId._id || yourRole === "Admin") && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "5px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <Link to={`edit`}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ borderRadius: "10px" }}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    handleDelete(medicine._id);
                  }}
                  color="error"
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: "10px" }}
                >
                  Delete
                </Button>
              </Box>
            )}
            <Button
              type="button"
              onClick={() => {
                handleReceiverId(medicine._id);
              }}
              variant="contained"
              sx={{
                borderRadius: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                backgroundColor: "#442281",
              }}
            >
              Request
            </Button>
          </Box>
          <ToastContainer />
        </Paper>
      )}
    </>
  );
}

export default ShowMedi;
