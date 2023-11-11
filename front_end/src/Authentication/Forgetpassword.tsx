import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { selectStatus } from "../store/loader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shade/Loaders/Loaders";
import { actions, getForgetpassword, getSuccess } from "../store/Authentication/authentication";



const Forgetpassword = () => {
    const loaderStatus = useSelector(selectStatus);
    const getForgetPassword = useSelector(getForgetpassword);

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const getSuccessMessage = useSelector(getSuccess);
    let navigate = useNavigate();


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter email!");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter valid email!");
            return;
        }

        try {
            dispatch(actions.loadGetByforgetPassword(email));
        } catch (error) {
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
            }, 2000)
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
                                    className=" card-sigin-main py-4 justify-content-center mx-auto"
                                >
                                    <div className="card-sigin">
                                        {/* <!-- Demo content--> */}
                                        <div className="main-card-signin d-md-flex">
                                            <div className="wd-100p">
                                                <div className="mb-3 d-flex">
                                                    {" "}
                                                    <Link to={`${process.env.PUBLIC_URL}/dashboard/dashboard-1`}>
                                                        <img
                                                            src={require("../assets/img/brand/favicon.png")}
                                                            className="sign-favicon ht-40"
                                                            alt="logo"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="main-card-signin d-md-flex bg-white">
                                                    <div className="wd-100p">
                                                        <div className="main-signin-header">
                                                            <h2>Forgot Password!</h2>
                                                            {error && <Alert variant="danger">{error}</Alert>}
                                                            {success && (
                                                                <Alert variant="success">{success}</Alert>
                                                            )}
                                                            <h4>Please Enter Your Email</h4>
                                                            <Form action="#">
                                                                <div className="form-group">
                                                                    <Form.Label>Email</Form.Label>{" "}
                                                                    <Form.Control
                                                                        className="form-control"
                                                                        placeholder="Enter your email"
                                                                        type="text"
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    variant=""
                                                                    className="btn btn-primary btn-block"
                                                                    onClick={handleForgotPassword}
                                                                >
                                                                    Send
                                                                </Button>
                                                            </Form>
                                                        </div>
                                                        <div className="main-signup-footer mg-t-20 text-center">
                                                            <p>
                                                                Forget it, <Link to={`${process.env.PUBLIC_URL}/`}> Send me back</Link> to the
                                                                sign in screen.
                                                            </p>
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

export default Forgetpassword;
