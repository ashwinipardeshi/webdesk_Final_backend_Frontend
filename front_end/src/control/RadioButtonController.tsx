import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";

export const RadioController = ({ ...rest }) => {
  const RadioOptions = () => {
    return rest.options.map((data: any, index: any) => (
      <FormControlLabel className="mb-0"
        key={index}
        value={data.value}
        label={data.label}
        control={<Radio onClick={rest.onChange} />}
      />
    ));
  };

  return (
    <Controller
      control={rest.control}
      //defaultValue={rest.defaultValue}
      name={rest.name}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend" error={!!error} className="mb-0">{rest.label}</FormLabel>
            <RadioGroup {...field} className="d-flex flex-row">
              {RadioOptions()}
            </RadioGroup>
          </FormControl>
        </>
      )}
    />
  );
};
