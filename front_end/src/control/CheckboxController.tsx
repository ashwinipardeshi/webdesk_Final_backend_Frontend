import { Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
export const CheckboxController = ({ ...rest }) => {
    return (
        <Controller
            control={rest.control}
            name={rest.name}
            render={({ field:{ onChange, value, ref }, fieldState: { error } }) => (
                <>
                    <FormControl>
                        <FormControlLabel
                        sx={{margin:'0'}}
                            label={<Typography color={error ? 'error' : 'inherit'}>{rest.label}</Typography>}
                            control={
                                <Checkbox
                                    checked={!!value}
                                    inputRef={ref}
                                    value={value}
                                    onChange={onChange}
                                />
                            }
                        />
                    </FormControl>
                </>
            )}
        />
    );
};