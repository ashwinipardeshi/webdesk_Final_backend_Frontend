import {
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import ClearIcon from "@mui/icons-material/Clear";
import React, { FC, useEffect, useRef } from "react";
import { DATE_FORMAT, DATE_PICKER_FORMAT } from "../utils/utils";
import { actions } from "../store/notifications";

const DateTimePicker: FC<{
  disabled?: boolean;
  error?: boolean;
  onChange: (data: any) => void;
  minDate?: any;
  maxDate?: any;
  shouldDisableDate?: any;
  value?: any;
  makeReadOnly?: boolean;
  fullWidth?: boolean;
  isDrawerDatePicker?: boolean;
  helperText?: any;
  allowCopyPaste?: boolean;
}> = ({
  disabled = false,
  error = false,
  onChange,
  maxDate,
  minDate,
  shouldDisableDate,
  value,
  makeReadOnly = true,
  fullWidth = true,
  helperText = "",
  isDrawerDatePicker = false,
  allowCopyPaste = false,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(320));
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (makeReadOnly) {
      // user can select only date from calender
      const currentElement: HTMLDivElement | null = datePickerRef.current;
      const input: HTMLInputElement | undefined = currentElement?.childNodes[0]
        .childNodes[0] as HTMLInputElement;
      input.readOnly = true;
    }
  }, [datePickerRef.current]);

  const clearDate = () => {
    onChange(null);
    textFieldRef?.current?.focus();
  };

  function datePickerClassName(drawerDatePickerFlag: boolean) {
    let datePickerClasses = "";
    if (drawerDatePickerFlag) {
      datePickerClasses = "drawerDatePicker";
    }
    if (isVerySmallScreen) datePickerClasses += ` drawerSmallCalender`;
    return datePickerClasses;
  }
  const isYearInRange = (date: any) => {
    const year = moment(date).year();
    return year >= 2000 && year <= 2099;
  };

  const handleOnPaste = (event: any) => {
    event.preventDefault();
    const copiedData = event.clipboardData.getData("text/plain");
    if (
      copiedData.length === 10 &&
      moment(copiedData, DATE_FORMAT, true).isValid() &&
      isYearInRange(copiedData)
    ) {
      onChange(copiedData);
    } else {
      dispatch(
        actions.addError(
          "Date should be between year 2000 and 2099 and in MM/DD/YYYY format"
        )
      );
    }
  };

  return (
    <DesktopDatePicker
      // PopperProps={{
      //   className: datePickerClassName(isDrawerDatePicker),
      // }}
      ref={datePickerRef}
      inputRef={textFieldRef}
      //inputFormat={DATE_PICKER_FORMAT}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...(shouldDisableDate ? { shouldDisableDate } : "")}
      {...(minDate ? { minDate } : "")}
      {...(maxDate ? { maxDate } : "")}
      // renderInput={(params) => (
      //   <TextField
      //     fullWidth={fullWidth}
      //     {...params}
      //     error={error}
      //     {...(helperText ? { helperText } : "")}
      //     InputProps={{
      //       endAdornment: (
      //         <>
      //           {value && (
      //             <InputAdornment position="end">
      //               <IconButton
      //                 disabled={disabled}
      //                 edge="end"
      //                 size="medium"
      //                 onClick={clearDate}
      //               >
      //                 <ClearIcon />
      //               </IconButton>
      //             </InputAdornment>
      //           )}
      //           {params.InputProps?.endAdornment}
      //         </>
      //       ),
      //     }}
      //     {...(allowCopyPaste ? { onPaste: handleOnPaste } : {})}
      //   />
      // )}
    />
  );
};

export default DateTimePicker;
