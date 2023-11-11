import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
let year = new Date().getFullYear();

return (
    <div className="main-footer">
    <Col md={12} sm={12} className=" text-center">
        <div className="container-fluid pt-0 ht-100p">
          Copyright ©  { year }
          <Link to="https://www.akronsystems.com" className="text-primary" target='_blank'> Akron Systems </Link>
        </div>
      </Col>
    </div>
);}




