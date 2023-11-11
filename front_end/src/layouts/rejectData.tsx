/* eslint-disable no-unused-vars */
import React, { ReactNode, useState } from "react";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import DialogBox from "./dialog";
import { Box } from "@mui/system";
import { ApplicationRejectReasonOptionHook } from "../hooks/masters/applicationRejectReasonHooks";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/Admission/onlineAdmission/onlineAdmissionApproval";
import { selectStatus } from "../store/loader";

interface Props {
    openDialog: boolean;
    closeToggleDeleteDialog: (rowData?: any) => void;
    rowParam: any;
    page?: string;
}
function RejectData(props: Props) {
    const { optionApplicationRejectReasonData: applicationRejectReasonoptions } = ApplicationRejectReasonOptionHook(true);
    const {
        openDialog,
        closeToggleDeleteDialog,
        rowParam,
        page,
    } = props;

    const loaderStatus = useSelector(selectStatus);
    const dispatch = useDispatch();
    const [rejectionId, setRejectionId] = useState(0);

    const handleApplicationRejectReasonChange = (e: any) => {
        const ApplivcationrejectionId = e.target.value;
        setRejectionId(ApplivcationrejectionId);
    };

    const admissionReject = () => {
        try {
            const request = {
                onlineStudentAdmissionId: rowParam.Id,
                admissionCategoryId: rowParam.admissionCategoryId,
                applicationStatusId: rowParam.applicationStatusId,
                admissionStatus: "REJECT",
                applicationRejectReasonId: rejectionId,
            };
            dispatch(actions.loadUpdateOnlineAdmissionReject({ request }));
            closeToggleDeleteDialog();
        } catch (error) { }
    }
    return (
        <DialogBox
            open={openDialog}
            showClose={false}
            title="Application Reject Reason"
            closeHandler={closeToggleDeleteDialog}
            actions={
                <>
                </>
            }
        >
            <Box>
                <Select
                    sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },

                    }}
                    id="applicationrejectreason"
                    label="Select"
                    fullWidth
                    onChange={handleApplicationRejectReasonChange}
                    size="small"
                >
                    <MenuItem value={0} >Select</MenuItem>
                    {applicationRejectReasonoptions.map((data: any, key: any) => (
                        <MenuItem key={key} value={data.id}>
                            {data.name}
                        </MenuItem>
                    ))}
                </Select>
                <Box display={"flex"} justifyContent={"end"} gap={2}>
                    <Button
                        color="info"
                        variant="outlined"
                        onClick={() => {
                            closeToggleDeleteDialog();
                        }}
                        className="mt-3"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="mt-3"
                        onClick={() => {
                            admissionReject();
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </DialogBox>
    );
}

export default RejectData;
