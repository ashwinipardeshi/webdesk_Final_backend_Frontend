import { Button, Col, Form, FormGroup, Row, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { selectStatus } from "../store/loader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shade/Loaders/Loaders";
import { actions, getSuccess } from "../store/Authentication/authentication";


const ChangeForgotPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const getSuccessMessage = useSelector(getSuccess);
    const dispatch = useDispatch();
    const loaderStatus = useSelector(selectStatus);
    const { id } = useParams<{ id: string }>();

    const handleChangeForgotPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const request = {
                userId: id,
                newPassword: newPassword
            };
            dispatch(actions.loadChangeForgetPassword({ request }));


        }
        catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    setTimeout(() => {
        setError('');
        dispatch(actions.setError(''));
    }, 3000);

    useEffect(() => {
        if (getSuccessMessage) {
            setSuccess(getSuccessMessage);
            setError("");
            setTimeout(() => {
                setSuccess('');
                dispatch(actions.setsuccess(''));
            }, 3000)
        } else {
            setSuccess("");
        }
    }, [getSuccessMessage]);

    return (
        <>
            {" "}
            {loaderStatus === "loading" && <Loader />}
            <div>
                <div className="square-box">
                    {" "}
                    <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
                    <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
                    <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
                </div>
                <div className="page bg-primary">
                    <div className="page-single">
                        <div className="container">
                            <Row>
                                <Col
                                    xl={5}
                                    lg={6}
                                    md={8}
                                    sm={8}
                                    xs={10}
                                    className="card-sigin-main py-4 justify-content-center mx-auto"
                                >
                                    <div className="card-sigin">
                                        {/* <!-- Demo content--> */}
                                        <div className="main-card-signin d-md-flex">
                                            <div className="wd-100p">
                                                <div className="mb-1">
                                                    <div className="main-signin-header">
                                                        <div className="">
                                                            <h2>Welcome back!</h2>
                                                            {error && <Alert variant="danger">{error}</Alert>}
                                                            {success && (
                                                                <Alert variant="success">{success}</Alert>
                                                            )}
                                                            <h4 className="text-start">Reset Your Password</h4>
                                                            <Form>
                                                                <FormGroup className="text-start form-group">
                                                                    <Form.Label>New Password</Form.Label>
                                                                    <Form.Control
                                                                        className="form-control"
                                                                        placeholder="Enter your password"
                                                                        type="password"
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup className="text-start form-group">
                                                                    <Form.Label>Confirm Password</Form.Label>
                                                                    <Form.Control
                                                                        className="form-control"
                                                                        placeholder="Enter your password"
                                                                        type="password"
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    />
                                                                </FormGroup>
                                                                <Button className="btn ripple btn-primary btn-block"
                                                                    onClick={handleChangeForgotPassword}
                                                                >
                                                                    Reset Password
                                                                </Button>
                                                                <div className="main-signup-footer mt-3 text-center ">
                                                                    <p>
                                                                        Already have an account?{" "}
                                                                        <Link to={`${process.env.PUBLIC_URL}/`}>
                                                                            Login
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </Form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeForgotPassword;
