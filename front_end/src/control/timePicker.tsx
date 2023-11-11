import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers";
import { TimePicker  } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const TimePickerComponet: FC<{
  className?: any;
  required?: any;
  value?: any;
  label: string;
  defaultValue?: any;
  views?: any; 
  onChange?: Function;
  id?: any;
  disabled?: boolean;
  ampm?: boolean; //12h/24h view for hour selection clock.
  ampmInClock?: boolean; //Display ampm controls under the clock (instead of in the toolbar).
  autoFocus?: boolean;
  closeOnSelect?: boolean;
  slots?: any; //components
  slotProps?: any; //components
  format?: any;
}> = ({
  format,
  slots,
  slotProps,
  closeOnSelect,
  ampm,
  ampmInClock,
  autoFocus,
  required,
  id,
  disabled,
  label = "",
  className,
  value,
  onChange = () => {
    // do nothing.
  },
  views = [],
  defaultValue,
  ...props
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={["TimePicker"]} sx={{width:'100%'}}>
      <TimePicker
        label={label}
        value={dayjs(value)}
        onChange={(e: any) => onChange(e)}
        {...props}
        slotProps ={{
          textField:{
            fullWidth: true,
            size:'small',
          }
        }}
      />
    </DemoContainer>
  </LocalizationProvider>
);
export default TimePickerComponet;
