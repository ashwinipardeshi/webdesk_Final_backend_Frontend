/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactNode } from "react";
import {
  useMediaQuery,
  Paper,
  Grid,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { conditionalSelection } from "../utils/utils";

const useStyles = makeStyles((theme: any) => ({
  successColor: {
    //color: theme.palette.success.main,
    fontWeight: "bold",
  },
  optColor: {
    //color: theme.palette.primary.main,
  },
  label: {
    //marginRight: theme.spacing(1),
    alignSelf: "center",
  },
  addNewButton: {
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
  },
}));

const HeaderPage: FC<{
  title: string;
  rightComponent?: ReactNode;
  children?: any;
  id?: string;
}> = ({ title, rightComponent, children, id }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box pt={12} mx={isSmallScreen || isMediumScreen ? 2 : 5}>
      <Paper {...(id ? { id } : {})} elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 528,
              height: 228,
            },
          }}
        >
          <Grid
            container
            display="flex"
            flexDirection={conditionalSelection(
              title === "",
              "row-reverse",
              "row"
            )}
            justifyContent="space-between"
            spacing={isSmallScreen ? 2 : 3}
            mb={2}
          >
            {title && (
              <Grid item>
                <Typography
                  variant="h2"
                  className={classes.label}
                  display="flex"
                  alignSelf="start"
                >
                  {title}
                </Typography>
              </Grid>
            )}
            {rightComponent && (
              <Grid
                item
                className={classes.addNewButton}
                display="flex"
                alignSelf="flex-end"
              >
                {rightComponent}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {children}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default HeaderPage;
