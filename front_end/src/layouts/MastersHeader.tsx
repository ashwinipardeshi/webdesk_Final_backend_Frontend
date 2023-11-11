import React, { FC, ReactElement } from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Breadcrumb } from "react-bootstrap";

const MastersHeader: FC<{
  title?: string;
  BreadcrumbTitle?: string;
  BreadcrumSubTitle?: string;
}> = ({ title, BreadcrumbTitle, BreadcrumSubTitle }) => (
  <div className="breadcrumb-header justify-content-between">
    <div className="left-content">
      <span className="main-content-title mg-b-0 mg-b-lg-1">{title}</span>
    </div>
    <div className="justify-content-center mt-2">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
          {BreadcrumbTitle}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="breadcrumb-item "
          active
          aria-current="page"
        >
          {BreadcrumSubTitle}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  </div>
);

export default MastersHeader;
