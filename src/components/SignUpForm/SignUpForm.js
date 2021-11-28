import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState({ initialFormValues });
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Complete all the fields in the form");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Invalid email");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Passwords do not match");
      } else if (size(formData.password) < 6) {
        toast.warning("Password must be at least 6 characters long)");
      } else {
        setSignUpLoading(true);
        signUpApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("Registered successfully!");
              setShowModal(false);
              setFormData(initialFormValues());
            }
          })
          .catch(() => {
            toast.error("Server error, try again later");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Create your account</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group className="form-group">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                defaultValue={formData.firstName}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                defaultValue={formData.lastName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group class="form-group">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group class="form-group">
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Sign up" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValues() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
