import React, { useState } from "react";

import { Row, Col, Input, Button, Container, Label } from "reactstrap";

// Redux
//import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// availity-reactstrap-validation
//import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
//import { checkLogin, apiError } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
//import withRouter from "../../components/Common/withRouter";
import { loginUser } from "../../apis/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response && response.data.accessToken) {
        const accessToken = response.data.accessToken.replace("Bearer ", "");
        localStorage.setItem("token", accessToken);
        navigate("/");
      } else {
        console.log("Login failed: No access token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    //const response = await loginUser(email, password);
  };
  /*
  useEffect(() => {
    document.body.classList.add("auth-body-bg");
    return () => {
      document.body.classList.remove("auth-body-bg");
    };
  }, []);

*/

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="/" className="">
                              <img
                                src={logodark}
                                alt=""
                                height="20"
                                className="auth-logo logo-dark mx-auto"
                              />
                              <img
                                src={logolight}
                                alt=""
                                height="20"
                                className="auth-logo logo-light mx-auto"
                              />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">
                            Sign in to continue to Nazox.
                          </p>
                        </div>

                        <div className="p-2 mt-5">
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Email</Label>
                              <input
                                name="email"
                                value={email}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <input
                                value={password}
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>

                            <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1"></i> Forgot
                                your password?
                              </Link>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{" "}
                            <Link
                              to="/register"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Register{" "}
                            </Link>{" "}
                          </p>
                          <p>
                            © 2021 Nazox. Crafted with{" "}
                            <i className="mdi mdi-heart text-danger"></i> by
                            Themesdesign
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
/*
const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};
*/
export default Login;
