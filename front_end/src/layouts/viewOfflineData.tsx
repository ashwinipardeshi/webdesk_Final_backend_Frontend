/* eslint-disable no-unused-vars */

import React, { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import DialogBox from "./dialog";

interface Props {
    openDialog: boolean;
    closeToggleDeleteDialog: (rowData?: any) => void;
    actionToggleDeleteDialog: (rowData?: any) => void;
    rowParam: any;
    page?: string;
    actions?: Array<{
        type: string;
        onClick: Function;
        icon: ReactNode;
        hideAction?: Function;
    }>;
}
function ViewOfflineData(props: Props) {
    const {
        openDialog,
        closeToggleDeleteDialog,
        rowParam,
        actions,
        page,
    } = props;
    return (
        <DialogBox
            open={openDialog}
            showClose={false}
            title="Application Details"
            closeHandler={closeToggleDeleteDialog}
            actions={
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            closeToggleDeleteDialog();
                        }}
                    >
                        Close
                    </Button>
                </>
            }
        >
            <Typography variant="h6" align="left">
                <p>Name : {rowParam ? rowParam.FirstName + ' ' + rowParam.MiddleName + ' ' + rowParam.LastName : ""}</p>
                <p>Student Code : {rowParam ? rowParam.StudentCode : ""}</p>
                <p>Mobile No : {rowParam ? rowParam.MobileNo : ""}</p>
                <p>Branch Name : {rowParam ? rowParam.StudAdmissionAYDetailBranchName : ""}</p>
                <p>Program Year : {rowParam ? rowParam.StudAdmissionAYDetailProgramYearName : ""}</p>
                <p>Admission Year : {rowParam ? rowParam.AcademicYearName : ""}</p>
                <p>Student Email : {rowParam ? rowParam.StudentMailId : ""}</p>
            </Typography>
        </DialogBox>
    );
}
export default ViewOfflineData;
