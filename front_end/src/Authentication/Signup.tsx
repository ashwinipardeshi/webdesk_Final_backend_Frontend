import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
  Alert,
  InputGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  actions,
  getUserRegisterStatus,
  getError,
  getSuccess,
} from "../store/Authentication/authentication";
import { selectStatus } from "../store/loader";
import Loader from "../shade/Loaders/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { ProgramSignOptionHook } from "../hooks/masters/programHooks";
import { AcademicYearSignOptionHook } from "../hooks/masters/academicYearHooks";

const SignUp = () => {
  let navigate = useNavigate();
  const [err, setError] = useState("");
  const [success, setSuccess] = useState("");
  const getErrorMessage = useSelector(getError);
  const getSuccessMessage = useSelector(getSuccess);
  const getUserRegisterResponse = useSelector(getUserRegisterStatus);
  const dispatch = useDispatch();
  const loaderStatus = useSelector(selectStatus);
  //const { optionSignProgramData } = ProgramSignOptionHook(true, 1, 1);
  //const { optionSignAcademicYearData } = AcademicYearSignOptionHook(true, 1, 1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [data, setData] = React.useState({
    password: "",
    collegeId: 1, //Change this after College wise UI strategy finalised
    name: "",
    emailId: "",
    mobile: "",
    roleId: 3,
    academicYearId: 6,
    confirmPassword: "",
  });

  const {
    academicYearId,
    password,
    collegeId,
    name,
    emailId,
    mobile,
    roleId,
    confirmPassword,
  } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileNumberRegex = /^\d{10}$/;

  const signupHandler = async (e: any) => {
    e.preventDefault();
    try {
      const request = {
        id: 0,
        roleId: roleId,
        collegeId: collegeId,
        departmentId: 1,
        academicYearId: academicYearId,
        name: name,
        mobile: mobile,
        emailId: emailId,
        password: password,
        isActive: true,
        createdDate: "2023-10-30T12:41:50.706Z",
      };
      if (name === "" || emailId === "" || mobile === "" || password === "") {
        setError("All feilds are requird");
      } else if (password !== confirmPassword) {
        setError("Password must match");
      } else if (!emailRegex.test(emailId)) {
        setError("Please enter valid email");
      } else if (!mobileNumberRegex.test(mobile)) {
        setError("Please enter valid mobile number");
      } else {
        setError("");
        dispatch(actions.register(request));
      }
      setTimeout(() => {
        setError("");
        dispatch(actions.setError(""));
      }, 3000);
    } catch (error) { }
  };
  useEffect(() => {
    if (getErrorMessage) {
      setError(getErrorMessage);
      setSuccess("");
      setTimeout(() => {
        setError("");
        dispatch(actions.setError(""));
      }, 3000);
    } else {
      setError("");
    }
    if (getSuccessMessage) {
      setSuccess(getSuccessMessage);
      setError("");
      setTimeout(() => {
        setSuccess("");
        dispatch(actions.setsuccess(""));
        navigate(`${process.env.PUBLIC_URL}/`);
      }, 3000);
    } else {
      setSuccess("");
    }
  }, [getErrorMessage, getSuccessMessage]);

  const handleChange = () => { };
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
                  <div className="card-sigin ">
                    <div className="main-card-signin d-md-flex">
                      <div className="wd-100p">
                        <div className="d-flex mb-4">
                          <Link to="#">
                            <img
                              src={require("../assets/img/brand/favicon.png")}
                              className="sign-favicon ht-40"
                              alt="logo"
                            />
                          </Link>
                        </div>
                        <div className="">
                          <div className="main-signup-header">
                            <h2 className="text-dark">User Registration</h2>

                            {err && <Alert variant="danger">{err}</Alert>}
                            {success && (
                              <Alert variant="success">{success}</Alert>
                            )}
                            <Form>
                              <FormGroup className="form-group">
                                <label>First Name &amp; Last Name</label>{" "}
                                <Form.Control
                                  className="form-control"
                                  aria-label="Enter your firstname and lastname"
                                  type="text"
                                  name="name"
                                  onChange={changeHandler}
                                  required
                                  placeholder="Enter your first name & last name "
                                />
                              </FormGroup>
                              {/* <FormGroup className="form-group">
                                <label>Program</label>{" "}
                                <Form.Select
                                  aria-label="Default select example"
                                  name="programId"
                                  onChange={changeHandler}
                                >
                                  {optionSignProgramData.map(
                                    (data: any, key: any) => (
                                      <option key={key} value={data.id}>
                                        {data.name}
                                      </option>
                                    )
                                  )}
                                </Form.Select>
                              </FormGroup> */}
                              {/* <FormGroup className="form-group">
                                <label>Academic Year</label>{" "}
                                <Form.Select
                                  aria-label="Default select example"
                                  name="academicYearId"
                                  onChange={changeHandler}
                                >
                                  {optionSignAcademicYearData.map((data: any, key: any) => (
                                    <option
                                      key={key}
                                      value={data.id}
                                    >
                                      {data.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </FormGroup> */}
                              <FormGroup className="form-group">
                                <label>Email</label>{" "}
                                <Form.Control
                                  className="form-control"
                                  placeholder="Enter your email"
                                  type="email"
                                  name="emailId"
                                  onChange={changeHandler}
                                  required
                                />
                              </FormGroup>
                              <FormGroup className="form-group">
                                <label>Mobile</label>{" "}
                                <Form.Control
                                  className="form-control"
                                  placeholder="Enter your mobile number"
                                  type="text"
                                  name="mobile"
                                  onChange={changeHandler}
                                  required
                                />
                              </FormGroup>
                              <FormGroup className="form-group">
                                <label>Password</label>{" "}
                                <InputGroup className="input-group">
                                  <Form.Control
                                    className="form-control"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    onChange={changeHandler}
                                    required
                                  />
                                  <Button
                                    variant=""
                                    className="btn btn-primary br-ts-0 br-bs-0"
                                    type="button"
                                  >
                                    {showPassword ? (
                                      <i
                                        onClick={handleClickShowPassword}
                                        className="fa fa-eye-slash"
                                      ></i>
                                    ) : (
                                      <i
                                        onClick={handleClickShowPassword}
                                        className="fa fa-eye"
                                      ></i>
                                    )}
                                  </Button>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup className="form-group">
                                <label>Confirm Password</label>{" "}
                                <Form.Control
                                  className="form-control"
                                  placeholder="Enter your confirm password"
                                  type="password"
                                  name="confirmPassword"
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                              <Button
                                variant=""
                                className="btn btn-primary btn-block"
                                onClick={signupHandler}
                              >
                                Create Account
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
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
