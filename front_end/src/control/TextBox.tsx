import React from 'react'
// import { TextField } from '@material-ui/core';
import { TextField } from '@mui/material';

interface IProps{
    name:string;
    id:string;
    type:string;
    value:string;
    label:string;
    variant:string;
    onChange:any;
    error:string;
    size:string;
    color:string;
    [key: string]: any;   

}


export const TextBox=(props:IProps)=>{
    const {name,variant,color,id,type,value,label,onChange,error,size,...rest}=props;
    return(
        <>
            <TextField
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
                {...(error && {error:true,helperText:error})}
            />
        
        </>
    )
}