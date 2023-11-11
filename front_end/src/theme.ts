/* eslint-disable no-unused-vars */
import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import "@mui/styles";
// https://mui.com/customization/default-theme/
// https://mui.com/customization/palette/
// https://mui.com/customization/typography/

const White = "#fff";
const Black = "#000";
const Blue = "#008AAD";
const HoverBlue = "#003745";
const DisabledBlue = "#99D0DE";
const Brown = "#4D3F30";
const HoverBrown = "#1F1913";
const DisabledBrown = "#B8B2AC";
const DarkBlue = "#37445B";
const LightBlue = "#D0DDF4";
const ExtraLightBlue = "#89ABE3";
const LightGrey = "#959595";
const ExtraLightGrey = "#E0E0E0";
const Yellow = "#959595";
const QuartzGrey = "#D0DDF4";
const LightGreen = "#40AA57";
const LightOrange = "#C19A07";
const devStagBackground = "#864747";
const baseFontSize = 14;
const basePadding = 8;
const baseInputHeight = 40;
const baseBorderRadius = 4;
const shadowColor = "137, 171, 227";

// there should be no hardcoded widths and heights on elements
// use base variables and multiply/add/subtract for padding/spacing/font size
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: DarkBlue,
      light: LightBlue,
      dark: Black,
    },
    secondary: {
      main: Brown,
    },
    success: {
      main: LightGreen,
    },
    warning: {
      main: LightOrange,
    },
    invalid: {
      main: Yellow,
    },
    background: {
      default: White,
    },
    grey: {
      "100": "#F3F7FC",
    },
    action: {
      active: DarkBlue,
    },
    text: {
      secondary: LightGrey,
    },
    color: {
      blue: Blue,
    },
    info: {
      main: QuartzGrey,
    },
    devStagBackground: {
      main: devStagBackground,
    },
  },

  typography: {
    // font sizes should be in rem where possible, with 14 being root
    fontFamily: ['"Montserrat"', '"Helvetica"', '"Arial"', "sans-serif"].join(
      ","
    ),
    fontSize: baseFontSize,
    htmlFontSize: baseFontSize,
    fontWeightLight: 300, // Montserrat Light
    fontWeightRegular: 400, // MontSerrat Regular
    fontWeightMedium: 500, // Montserrat Medium
    fontWeightBold: 600, // Montserrat SemiBold
    h1: {
      fontWeight: 700,
      fontSize: 40,
      color: DarkBlue,
    },
    h2: {
      fontWeight: 600,
      fontSize: 32,
      color: DarkBlue,
    },
    h3: {
      fontWeight: 600,
      fontSize: 24,
      color: DarkBlue,
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem", // should be 28, but its 32, which is right, but the body fontSize isn't being recognized by MUI theme
      color: DarkBlue,
    },
    h5: {
      fontWeight: 600,
      color: DarkBlue,
      fontSize: 18,
    },
    h6: {
      fontWeight: 500,
      color: DarkBlue,
      fontSize: 18,
    },
    body1: {
      fontWeight: 500,
      fontSize: baseFontSize, // should be globally set by the prop above, its not
      "& a": {
        color: DarkBlue, // there should be a better way to set this
      },
    },
    body2: {
      fontSize: baseFontSize - 2, // should be globally set by the prop above, its not
    },
    button: {
      textTransform: "unset", // no uppercase on button text
      fontSize: baseFontSize + 2,
    },
  },
  spacing: 8,
  zIndex: {
    snackbar: 3200,
  },
  components: {
    // texfield active color, needs rgba
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover,&:active': {
    //         borderColor: `rgba('${DarkBlue}', .8)`,
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: baseBorderRadius * 2,
          // height: baseInputHeight,
          alignSelf: "center",
          // minWidth: 204,
          "&.MuiButton-outlinedInfo": {
            borderColor: Blue,
            color: Blue,
          },
          // Refered to: https://www.figma.com/file/k9Twfk5E5Uue2L0kzy203f/Nothing-Bundt-Cakes-Design?node-id=15%3A72
          "&.MuiButton-containedPrimary": {
            borderColor: Brown,
            backgroundColor: Brown,
            color: White,
            "&:hover": {
              backgroundColor: HoverBrown,
              borderColor: HoverBrown,
              color: White,
            },
            "&[disabled]": {
              borderColor: DisabledBrown,
              backgroundColor: DisabledBrown,
              color: White,
              cursor: "default",
            },
          },
          "&.MuiButton-containedSecondary": {
            borderColor: Blue,
            backgroundColor: Blue,
            color: White,
            "&:hover": {
              borderColor: HoverBlue,
              backgroundColor: HoverBlue,
              color: White,
            },
            "&[disabled]": {
              borderColor: DisabledBlue,
              backgroundColor: DisabledBlue,
              color: White,
              cursor: "default",
            },
          },
          "&.MuiButton-outlinedPrimary": {
            borderColor: Brown,
            color: Brown,
            "&:hover": {
              backgroundColor: Brown,
              color: White,
            },
            "&[disabled]": {
              borderColor: DisabledBrown,
              backgroundColor: White,
              color: DisabledBrown,
              cursor: "default",
            },
          },
          "&.MuiButton-outlinedSecondary": {
            borderColor: Blue,
            color: Blue,
            "&:hover": {
              backgroundColor: Blue,
              color: White,
            },
            "&[disabled]": {
              borderColor: DisabledBlue,
              backgroundColor: White,
              color: DisabledBlue,
              cursor: "default",
            },
          },
        },
        // outlinedPrimary: {
        //   border: '1px solid #40AA57',
        //   color: '#40AA57',
        //   boxSizing: 'border-box',
        //   borderRadius: 4,
        //   width: 103,
        //   height: 28,
        //   textTransform: 'capitalize',  // outer layout buttons so not have this
        // },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          width: baseInputHeight - 2,
          background: LightGrey,
          height: baseInputHeight,
          position: "absolute",
          right: 0,
          top: 0,
          borderBottomRightRadius: baseBorderRadius,
          borderTopRightRadius: baseBorderRadius,
          color: White,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          // zIndex need to be more than the header Appbar
          zIndex: 3000,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          // zIndex need to be more than the header Appbar
          zIndex: 3000,
        },
        paperAnchorRight: {
          padding: basePadding * 4,
          width: 460,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: White,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: basePadding + 2,
          paddingBottom: basePadding + 2,
          backgroundColor: White,
          "&:disabled": {
            backgroundColor: ExtraLightGrey,
          },
        },
      },
    },
    // style call, look worse than default
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: Black,
          fontSize: baseFontSize + 4,
          transform: "translate(0, -3.5px) scale(1)",
          "&.sizeSmall": {
            fontSize: baseFontSize,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          fontSize: baseFontSize + 2,
        },
        select: {
          "&.MuiSelect-select.MuiSelect-standard": {
            paddingRight: basePadding * 5 + 6,
            paddingTop: basePadding + 3,
            border: `1px solid ${Yellow}`,
            textAlignLast: "center",
          },
        },
        selectLabel: {
          fontSize: baseFontSize + 2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.MuiFormHelperText-root.Mui-error": {
            marginLeft: 0,
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: Blue,
          },
          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
            color: White,
            fontSize: baseFontSize + 4,
            paddingLeft: basePadding + 8,
            paddingRight: basePadding + 8,
            "&:focus": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            fontSize: baseFontSize + 4,
            paddingLeft: basePadding + 8,
            paddingRight: basePadding + 8,
            "&:focus": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-columnSeparator.MuiDataGrid-columnSeparator--sideRight":
            {
              display: "none",
            },
          "& .MuiDataGrid-menuIcon .MuiButtonBase-root, & .MuiDataGrid-iconButtonContainer .MuiButtonBase-root":
            {
              color: White,
            },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: ExtraLightBlue,
          '&[color="primary"]': {
            borderColor: LightGrey,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiPaper-rounded": {
            borderRadius: 16,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiPaper-elevation4": {
            boxShadow: `0px 4px 4px rgba(${shadowColor}, 0.25)`,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          border: `1px solid ${ExtraLightGrey}`,
          borderRadius: `${baseBorderRadius + 3}px ${
            baseBorderRadius + 3
          }px 0 0`,
          "& .MuiButtonBase-root": {
            borderRight: `1px solid ${ExtraLightGrey}`,
            "&:last-child": {
              borderRight: "0 none",
            },
            "&.Mui-selected": {
              backgroundColor: DarkBlue,
              color: LightBlue,
            },
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 49,
          width: 69,
          "&.MuiSwitch-sizeSmall": {
            width: basePadding * 5.75,
            height: basePadding * 4,
            "& .MuiSwitch-switchBase": {
              top: basePadding / 2,
              left: basePadding / 4,
            },
          },
        },
        track: {
          borderRadius: baseBorderRadius * 3,
          border: `1px solid ${DarkBlue}`,
          backgroundColor: ExtraLightGrey,
          opacity: 1,
        },
        thumb: {
          width: 23,
          height: 23,
          backgroundColor: DarkBlue,
        },
        colorPrimary: {
          padding: basePadding + 5,
          "&.Mui-checked+.MuiSwitch-track": {
            backgroundColor: ExtraLightBlue,
            opacity: 1,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.active": {
            color: LightGreen,
            border: `1px solid ${LightGreen}`,
          },
          "&.inactive": {
            color: LightOrange,
            border: `1px solid ${LightOrange}`,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.MuiCheckbox-colorSecondary": {
            color: Blue,
          },
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        sx: {
          zIndex: "1200!important",
          "& .DataGridFilterPanel *": {
            fontSize: "12px!important",
          },
          "& .DataGridFilterPanelXS *": {
            fontSize: "10px!important",
          },
          "&.drawerDatePicker": {
            zIndex: "3000!important",
          },
          "&.drawerSmallCalender .MuiCalendarOrClockPicker-root": {
            maxWidth: "100vw",
            overflow: "scroll",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-colorSecondary": {
            color: Blue,
            '&[aria-expanded="true"]': {
              backgroundColor: Blue,
              color: White,
              borderRadius: baseBorderRadius,
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-root.pricing": {
            border: "1px solid",
            borderColor: Brown,
            "& .MuiAlert-icon": {
              color: Brown,
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '&[color="secondary"] .MuiFormControlLabel-label, &[color="secondary"] .MuiCheckbox-root':
            {
              color: Blue,
            },
          "&.Mui-disabled": {
            "& .MuiSwitch-sizeSmall": {
              opacity: 0.4,
              "& .MuiSwitch-track": {
                opacity: 1,
              },
            },
          },
        },
      },
    },
  },
});

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

declare module "@mui/material/styles" {
  interface Palette {
    invalid: Palette["primary"];
    color: any;
  }

  interface PaletteOptions {
    invalid: PaletteOptions["primary"];
    color: any;
  }

  interface Palette {
    devStagBackground: Palette["primary"];
    color: any;
  }

  interface PaletteOptions {
    devStagBackground: PaletteOptions["primary"];
    color: any;
  }
}

export default theme;
