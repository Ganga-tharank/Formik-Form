import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Topbar from "../common/Topbar";
import ApiService from "../../utils/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function EditAuthor() {
  let params = useParams();
  const navigate = useNavigate();
  const [initialValues, setValues] = useState({
    author: "",
    bio: "",
    dob: "",
  });
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      author: Yup.string()
        .max(20, "Title cannot exceed 20 characters")
        .min(5, "Title cannot be shorter than 5 characters")
        .required("Title cannot be empty"),
      bio: Yup.string()
        .max(250, "Bio cannot exceed 250 characters")
        .min(50, "Bio cannot be shorter than 50 characters")
        .required("Bio cannot be empty"),
      dob: Yup.string()
        .required("Date cannot be empty")
        .max(new Date(), "Date of birth cannot be in the future"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res = await ApiService.put(`/librarydetails/${id}`, values);
        if (res.status === 200) {
          navigate("/dashboard-author");
          toast.success("Author Data Edited");
        }
      } catch (error) {
        alert("Failed to Edit a Author");
      }
    },
  });

  const getAuthorDataById = async () => {
    let { id } = params;
    try {
      let res = await ApiService.get(`/librarydetails/${id}`);
      if (res.status === 200) {
        setValues({
          author: res.data.author,
          bio: res.data.bio,
          dob: res.data.dob,
        });
      }
    } catch (error) {
      toast.error("Internal error");
    }
  };

  useEffect(() => {
    getAuthorDataById();
  }, []);

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
                  id="dob"
                  name="dob"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Date Of Birth"
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <div style={{ color: "red" }}>{formik.errors.dob}</div>
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

export default EditAuthor;