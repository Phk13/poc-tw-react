import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "./EditUserForm.scss";

export default function EditUserForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Editing profile");
  };
  return (
    <div className="edit-user-form">
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Add your bio"
            name="bio"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control type="text" placeholder="Website" name="site" />
        </Form.Group>

        <Form.Group className="form-group">
          <DatePicker placeholder="Birth date" selected={new Date()} />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
