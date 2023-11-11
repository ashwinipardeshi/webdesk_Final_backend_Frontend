import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectCommonController = ({ ...rest }) => {
  return (
    <Controller
      control={rest.control}
      defaultValue={rest.defaultValue}
      name={rest.name}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl size={"small"} fullWidth>
            <InputLabel error={!!error}>{rest.label}</InputLabel>
            <Select label={rest.label} error={!!error} {...field}>
              <MenuItem value="">Select</MenuItem>
              {rest.options &&
                rest.options.map((items: any, index: any) => {
                  return (
                    <MenuItem value={items.name} key={index}>
                      {items.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
};
