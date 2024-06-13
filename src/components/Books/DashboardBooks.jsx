import React, { useState, useEffect } from 'react'
import Topbar from '../common/Topbar'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApiService from '../../utils/ApiService';

function DashboardBooks() {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      let res = await ApiService.get("/librarydetails");
      if (res.status === 200) {
        toast.success("Books fetched successfully");
        setBookData(res.data);
      }
    } catch (error) {
      toast.error("Data fetch failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/librarydetails/${id}`);
      if (res.status === 200) {
        getBookData();
        toast.success("Book Data deleted");
      }
    } catch (error) {
      toast.error("Data removal failed");
    }
  };

    useEffect(() => {
      getBookData();
    }, []);

  return (
    <>
      <Topbar />
      <br />
      <Container>
        <Button
          className="mt-3"
          variant="primary"
          onClick={() => navigate(`/add-book`)}
        >
          Create Book
        </Button>
      </Container>
      <br />
      <Container>
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN Number</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookData.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.title}</td>
                    <td>{e.author}</td>
                    <td>{e.isbnNum}</td>
                    <td>
                      <div
                        style={{
                          width: "300px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {e.description}
                      </div>
                    </td>
                    <td>{e.createdAt}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => navigate(`/edit-book/${e.id}`)}
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default DashboardBooks