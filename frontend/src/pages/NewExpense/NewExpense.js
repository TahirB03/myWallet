import React, { useState, useEffect } from "react";
import "./NewExpense.css";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import RoundedButtons from "../../components/RoundedButtons";


const NewExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setcategoryId] = useState('Choose category');
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);

  const date = moment().format("dddd D MMMM");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/category"
      );
      data.allCategories.map((x) => {
        if (x.isDeposit === false) {
          console.log(x);
          setCategories((prevState) => [...prevState, x]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (e) => {
    setcategoryId(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  const handleDescription = e=>{
    setDescription(e.target.value)
  }

  const handleEvent = async () => {
    try {
      const { data } = await axios.post(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/createEvent/${id}/${categoryId}`,
        {
          amount: amount,
          description: description
        }
      );
      if (data){
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      // USERI NUK KA FONDE
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="addExpense_wrapper">
      <div className="addExpense_header" onClick={() => navigate("/")}>
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Left+Arrow.png"
          alt=""
          className="addExpense_wrapper_back"
        />
        <p
          style={{
            color: "white",
            display: "inline-block",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Add new expense
        </p>
      </div>
      <div className="calendarExpense" style={{marginBottom:"20px"}}>
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Calendar.png"
          alt=""
          width="25"
        />
        <p style={{ display: "inline-block", marginLeft: "5px" }}>{date}</p>
      </div>
      <div className="inputs">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" >Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId}
            label="Category"
            onChange={handleCategory}
            defaultValue="Choose Category"
            className="inputRounded"
            sx={{borderRadius:"40px"}}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category._id}>
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
        className="inputRounded"
          id="outlined"
          type="number"
          label="Amount"
          variant="outlined"
          value={amount}
          fullWidth
          onChange={handleAmount}
          sx={{margin:"20px 0"}}
        />
        <TextField
        className="inputRounded"
          id="outlined"
          label="Note"
          variant="outlined"
          value={description}
          fullWidth
          onChange={handleDescription}
          sx={{height:"80px !important"}}
        />
      </div>
      <button onClick={handleEvent}>S</button>
    </div>
  );
};

export default NewExpense;
