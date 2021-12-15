import React from 'react'
import Button from "@mui/material/Button";

const RoundedButtons= ({selected})=> {
    return (
        <Button
            variant="contained"
            color={selected? "warnign" : 'default'}
            sx={{ borderRadius: "40px", height: "45px" }}
          />
    )
}

export default RoundedButtons
