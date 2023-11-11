import React from 'react'
// import { Button as MuiButton } from "@material-ui/core";
import { Button  as MuiButton } from '@mui/material';

interface IProps{
    variant: "text" | "outlined" | "contained" | undefined
    size: 'small' | 'medium' | 'large' | undefined;
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
    onClick?:any;
    text:string;
    classes: object;
    [key: string]: any;   
}

export const Button=(props:IProps)=>{

    const {variant,size,color,onClick,text,...rest}=props;

    return (
        <MuiButton 
            variant={variant}
            size={size}
            color={color} 
            onClick={onClick}
            {...rest}>
            {text}
        </MuiButton>
    )

}