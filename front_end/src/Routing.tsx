import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Typography } from "@mui/material";
import Dashboard from "./components/Dashboard/Dashboard-1/Dashboard";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />}></Route>
      <Route
        path="unauthorized"
        element={
          <Typography
            variant="h3"
            align="center"
            margin={3}
            color="textSecondary"
          >
            You are not authorized
          </Typography>
        }
      />
      {/* </Route> */}
    </>
  )
);
export default Router;
