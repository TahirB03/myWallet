import React, { useState, useEffect } from "react";
import "./NewIncome.css";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const NewIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [errors,setErrors]=useState({
    amount:{
      state:false,
      message:"Amount should be greater tha 0"
    },
    category:{
      state:false,
      message: "Select a category"
    }
  })

  let categoryLabelStyles = {width:categoryId===null ? "140px" : "84px"}


  const date = moment().format("dddd D MMMM");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/category"
      );
      data.allCategories.map((x) => {
        if (x.isDeposit === true) {
          setCategories((prevState) => [...prevState, x]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (e) => {
    setcategoryId(e.target.value);
    setErrors(prevState => ({...errors,amount:prevState.amount,category:{state:false,message:prevState.category.message}}))
  };
  const handleAmount = (e) => {
    if (e.target.value===''){
      setAmount('')
      return;
    }
    if (!/^[1-90.]+$/.test(e.target.value)){
      setErrors(prevState => ({...errors,amount:{state:true,message:prevState.amount.message},category:prevState.category}))
      return;
    }
    setErrors(prevState => ({...errors,amount:{state:false,message:prevState.amount.message},category:prevState.category}))
    setAmount(Number(e.target.value));
  };
  const handleDescription = e=>{
    setDescription(e.target.value)
  }

  const handleEvent = async () => {
    if(amount===0 || amount===null){
      setErrors(prevState => ({...errors,
        amount:{state:true,message:"Please provide amount for the event"},
        category:prevState.category
      }))
    }
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
      if(error.response.data.message==="Make sure the ID-s are correct"){
        setErrors(prevState=> ({
          ...errors,amount:prevState.amount,category:{
            state:true,
            message:"Please choose a category"
          }
        }))
      }
      if(error.response.data.message==="You dont have that amount of money deposited."){
        setErrors(prevState=> ({
          ...errors,amount:{
            state:true,
            message: error.response.data.message
          },category:prevState.category
        }))
      }
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
          Add new income
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
          <InputLabel className="labelInput" id="demo-simple-select-label" sx={categoryLabelStyles}>{categoryId===null? "Choose Category" : "Category"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId}
            label="Category"
            onChange={handleCategory}
            defaultValue="Choose Category"
            className="inputRounded"
            sx={{borderRadius:"40px",paddingLeft:"20px"}}
            notched={false}
            error={errors.category.state}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category._id}>
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
          {errors.category.state && <p style={{color:"red",fontSize:"16px",marginLeft:"20px"}}>{errors.category.message}</p>}
        </FormControl>
        <FormControl className="inputRounded" fullWidth sx={{ mt:2,mb: 2 }}>
          <InputLabel className="labelInput labelInputAmount" htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            type="number"
            notched={false}
            id="outlined-adornment-amount"
            value={amount}
            onChange={handleAmount}
            startAdornment={<InputAdornment position="start" sx={{ml:2}}>$</InputAdornment>}
            label="Amount"
            error={errors.amount.state}
            inputProps={{
              step:0.01,
              max: 10000000,
              min: 0
            }}
          />
          {errors.amount.state && <p style={{color:"red",fontSize:"16px",marginLeft:"20px"}}>{errors.amount.message}</p>}
        </FormControl>
        <FormControl className="inputRounded inputNotesRounded" fullWidth sx={{ mt:2,mb: 2 }}>
          <InputLabel className="labelInput labelInputAmount" htmlFor="outlined-adornment-amount" sx={{ml: 0}}>Note</InputLabel>
          <OutlinedInput
            type="text"
            notched={false}
            id="outlined-adornment-amount"
            value={description}
            onChange={handleDescription}
            label="Amount"
            sx={{height:"80px !important"}}
          />
        </FormControl>
      <button className="addExspenseButton" onClick={handleEvent}>Add</button>
      </div>
    </div>
  );
};

export default NewIncome;
