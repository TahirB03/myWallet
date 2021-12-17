import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import moment from "moment";
import { UserContext } from "../context/UserContext";

const Outcome = () => {
  const userId = useContext(UserContext);

  const [outcome, setOutcome] = useState(0);

  const getUseOutcome = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getAllWithdraws/${userId}`
      );
      let sum = 0;
      data.events.map((x) => (sum = sum + x.amount));
      setOutcome(sum);
    } catch (error) {
      getUseOutcome();
    }
  };
  useEffect(() => {
    getUseOutcome();
  }, []);

  return (
    <div>
      {" "}
      <Box
        className="boxContainer"
        sx={{
          marginTop: "15px",
          width: 160,
          height: 70,
          border: "1px solid lightgray",
          borderRadius: "25px",
          padding: "0 0 0 5px",
        }}
      >
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/outcome.png"
          style={{ marginTop: "10px" }}
          width={45}
          height={45}
        ></img>
        <div className="boxContainer_text">
          <p style={{ display: "block", color: "red" }}>Outcome</p>
          <p>$ {outcome.toFixed(1)}</p>
        </div>
      </Box>
    </div>
  );
};

export default Outcome;
