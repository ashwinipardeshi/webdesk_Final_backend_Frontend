import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { selectUser } from "../../../store/Authentication/authentication";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const geLogInUserDetails = useSelector(selectUser);

  return (
    <React.Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">DASHBOARD</span>
        </div>
      </div>

      <Row>
        <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
          <Row>
            <Col xl={12} lg={12} md={12} xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                      <div className="text-justified align-items-center">
                        <h3 className="text-dark font-weight-semibold mb-2 mt-0">
                          Hi <span className="text-primary">{geLogInUserDetails.name}</span>,
                          Welcome to Webdesk ERP !!
                        </h3>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}
