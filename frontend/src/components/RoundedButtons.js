import React from "react";
import Button from "@mui/material/Button";

const RoundedButtons = ({  name , setTime, time, setSideBar, value,setTimeFormat, disabled}) => {
    const backgroundColor = name===time ? "#FD7941" : "transparent"
    const color = name===time ? "white" : "black"
    const handleClick = (e)=>{
      setTimeFormat(value)
        setTime(name)
        setSideBar(false)
    }
  return (
    <Button
      variant="contained"
      color={name === time ? "warning" : "inherit"}
      disabled={disabled}
    //   value={value}
      onClick={handleClick}
      sx={{
        borderRadius: "40px",
        height: "45px",
        marginBottom: "10px",
        backgroundColor: backgroundColor,
        border: "solid 1px #CCCCCC",
        color: {color},
        boxShadow: 'none'
      }}
    >{name}</Button>
  );
};

export default RoundedButtons;