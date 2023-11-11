// import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

interface IProps {
  options: any;
  name: string;
  id: string;
  value: string;
  label: string;
  onChange: any;
  error: string;
  className: string;
  fullWidth: boolean;
  [key: string]: any;
}

export const Dropdown=(props: IProps)=>{
    const { name, label, value, error=null, onChange, options,className,fullWidth } = props;
    const errorMessage = error!= null && error==="0" ? "" : error;
    return(
        <FormControl variant="outlined" className={className} fullWidth={true} size="small"
            {...(error && {error:true})}>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth={fullWidth}>
                    <MenuItem value="">None</MenuItem>
                    {
                        options.map(
                            (item:any) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                        )
                    }
                </Select>
                {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    )

}