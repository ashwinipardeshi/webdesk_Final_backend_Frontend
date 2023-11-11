import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Link } from "@mui/material";
import {
  actions,
  selectUserIsLoggedIn,
  userIsNew,
  userIsResettingPassword,
  getResetStatus,
  getLoginStatus,
  getError,
  getToken,
  getSuccess,
} from "../store/Authentication/authentication";
import axios from "axios";
import { selectStatus } from "../store/loader";
import Loader from "../shade/Loaders/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { WEBDESK } from "../utils/utils";
import { IP_ADDRESS_BASE_URL } from "../constant/baseURL";
const useStyles = makeStyles((theme: any) => ({}));
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const token = useSelector(getToken);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const getLoginError = useSelector(getError);
  const loginStatus = useSelector(getLoginStatus);
  const loaderStatus = useSelector(selectStatus);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [ip, setIP] = useState("");
  const { email, password } = data;

  const getIP = async () => {
    const res = await axios.get(IP_ADDRESS_BASE_URL);
    setIP(res.data.ip);
  };

  useEffect(() => {
    if (loginStatus && isLoggedIn) {
      const redirectToDashboard = async () => {
        navigate("/Dashboard");
      };
      redirectToDashboard();
    } else {
      dispatch(actions.clearSession());
    }
  }, [isLoggedIn]);


  useEffect(() => {
    if (isLoggedIn && WEBDESK.getCookie("loginToken") !== token) {
      dispatch(actions.clearSession());
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (getLoginError) {
      setError(getLoginError);
      setTimeout(() => {
        setError('');
        dispatch(actions.setError(''));
      }, 3000);
    } else {
      setError("");

    }
  }, [getLoginError]);


  useEffect(() => {
    getIP();
  }, []);

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const request = {
        emailId: email,
        ipAddress: ip,
        password: password,
      };
      dispatch(actions.login(request));
    } catch (error) { }
  };

  const OnSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <React.Fragment>
        <div className="square-box">
          {" "}
          <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
          <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
          <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
        </div>
        <div className="page bg-primary">
          <div className="page-single">
            <div className="container" style={{ marginTop: "89px" }}>
              <Row>
                <Col
                  xl={5}
                  lg={6}
                  md={8}
                  sm={8}
                  xs={10}
                  className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
                >
                  <div className="card-sigin">
                    {/* <!-- Demo content--> */}
                    <div className="main-card-signin d-md-flex">
                      <div className="wd-100p">
                        <div className="d-flex mb-4">
                          <Link href="#" variant="body2">
                            <img
                              src={require("../assets/img/brand/favicon.png")}
                              className="sign-favicon ht-40"
                              alt="logo"
                            />
                          </Link>
                        </div>
                        <div className="">
                          <div className="main-signup-header">
                            <h2>Welcome back!</h2>
                            <h6 className="font-weight-semibold mb-4">
                              Please sign in to continue.
                            </h6>
                            <div className="panel panel-primary">
                              <div className=" tab-menu-heading mb-2 border-bottom-0">
                                <div className="tabs-menu1">
                                  {error && (
                                    <Alert variant="danger">{error}</Alert>
                                  )}
                                  <Form>
                                    <Form.Group className="form-group">
                                      <Form.Label className="">
                                        Email
                                      </Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={changeHandler}
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label>Password</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={changeHandler}
                                        required
                                      />
                                    </Form.Group>
                                    <Button
                                      variant=""
                                      className="btn btn-primary btn-block"
                                      onClick={handleLogin}
                                    >
                                      Sign In
                                    </Button>

                                    <div className="main-signin-footer text-center mt-3">
                                      <p>
                                        <Link href={`${process.env.PUBLIC_URL}/forgotpassword`} className="mb-3">
                                          {" "}
                                          Forgot password?
                                        </Link>
                                      </p>
                                      <p>
                                        Don't have an account ?{" "}
                                        <Link
                                          //href={`${process.env.PUBLIC_URL}/signup`}
                                          onClick={OnSignUpClick}
                                          style={{ color: '#14112d', cursor: 'pointer' }}
                                          className=""
                                        >
                                          {" "}
                                          Create an Account
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
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default Login;
