import React, { useState } from "react";
import Topbar from "../common/Topbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ApiService from "../../utils/ApiService";

function AddAuthor() {
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      author: "",
      createdAt: "",
      bio: "",
    },
    validationSchema: Yup.object({
      author: Yup.string()
        .max(20, "Name cannot exceed 20 characters")
        .min(3, "Name cannot be shorter than 3 characters")
        .required("Name cannot be empty"),
      bio: Yup.string()
        .max(200, "Bio cannot exceed 200 characters")
        .min(5, "Bio cannot be shorter than 5 characters")
        .required("Bio cannot be empty"),
      createdAt: Yup.string().required("DOB cannot be empty"),
    }),
    onSubmit: async (values) => {
      try {
        let res = await ApiService.post("/librarydetails", values);
        if (res.status === 201) {
          navigate("/dashboard-author");
          toast.success("Author added Successfully");
        }
      } catch (error) {
        toast.error("Failed to create a Author");
      }
    },
  });
  return (
    <>
      <Topbar />
      <div>
        <Container>
          <Form className="mt-5" onSubmit={formik.handleSubmit}>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="author"
                  name="author"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Author Name"
                />
                {formik.touched.author && formik.errors.author ? (
                  <div style={{ color: "red" }}>{formik.errors.author}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  id="bio"
                  name="bio"
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Author Bio"
                />
                {formik.touched.bio && formik.errors.bio ? (
                  <div style={{ color: "red" }}>{formik.errors.bio}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  id="createdAt"
                  name="createdAt"
                  onChange={formik.handleChange}
                  value={formik.values.createdAt}
                  onBlur={formik.handleBlur}
                  placeholder="Enter published date"
                />
                {formik.touched.createdAt && formik.errors.createdAt ? (
                  <div style={{ color: "red" }}>{formik.errors.createdAt}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default AddAuthor;