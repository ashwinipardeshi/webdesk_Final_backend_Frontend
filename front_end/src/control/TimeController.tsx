import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker  } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IProps{
    name:string;
    id:string;
    type:string;
    value:string;
    label:string;
    onChange:any;
    error:string;
    size:string;
    [key: string]: any;   

}


export const TimeController = (props:IProps) => {
    const {name,id,type,value,label,onChange,error,size,...rest}=props;
    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <TimePicker 
                    label={label}
                    value={dayjs(value)}
                    onChange={onChange}
                    {...rest}
                    slotProps ={{
                        textField:{
                            fullWidth: true,
                            size:'small',
                            error: !!error,
                            helperText:error
                        }
                    }}
                />
            </LocalizationProvider>
        
        </>
    )
}