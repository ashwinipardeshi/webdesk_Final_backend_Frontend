import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
export const InputController = ({ ...rest }) => {
    return (
        <Controller
            control={rest.control}
            name={rest.name}
            disabled={rest.disabled}
            render={({ field, fieldState: { error }, }) => (
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label={rest.label}
                    helperText={error? error?.message : ""}
                    error={!!error}
                    {...field}
                    
                    InputProps={
                        {
                            endAdornment: (
                                <IconButton size="small" onClick={ rest.resetClick }>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )
                        }
                    }
                />
            )}
        />
    );
};