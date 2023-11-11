import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const DateController = ({ ...rest }) => {
    dayjs.extend(utc)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Controller
                control={rest.control}
                name={rest.name}
                render={({ field:{value, onChange, ref}, fieldState: { error } }) => (
                    <>
                        <DatePicker
                            {...rest}
                            label={rest.label}
                             value={dayjs(value)}
                             onChange={(value) => {
                                let newValue = dayjs(value).utc();
                                newValue.format();
                                onChange(newValue.local().format());
                            }}
                            format="DD-MM-YYYY"
                            ref={ref}
                            slotProps={{
                                textField: {
                                  fullWidth:true,
                                  margin:"none",
                                  size:'small',
                                  error: !!error,
                                  helperText:error?.message,
                                },
                            }}
                        />
                    </>
                )}
            />
        </LocalizationProvider>
    );
};
