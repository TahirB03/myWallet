import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Outcome = () => {
  const [outcome, setOutcome] = useState(0);
  const navigate = useNavigate();

  const getUseOutcome = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getAllWithdraws/fc099009-220e-44eb-9900-ead7e2e0613b`
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
        onClick={() => navigate("/sa")}
        className="boxContainer"
        sx={{
          marginTop: "15px",
          width: 160,
          height: 80,
          border: "1px solid red",
          borderRadius: "25px",
          padding: "5px 10px",
        }}
      >
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/outcome.png"
          style={{ marginTop: "10px" }}
          width={50}
          height={50}
        ></img>
        <div className="boxContainer_text">
          <p style={{ display: "block", color: "red" }}>Outcome</p>
          <p>$ {outcome}</p>
        </div>
      </Box>
    </div>
  );
};

export default Outcome;
