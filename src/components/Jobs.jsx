import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Pagination,
} from "react-bootstrap";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 10;

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (company) params.append("company", company);
      if (category) params.append("category", category);
      params.append("limit", jobsPerPage);
      params.append("skip", (page - 1) * jobsPerPage);

      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?${params}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.data || data);
      setTotalPages(Math.ceil((data.total || data.length) / jobsPerPage));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(1);
  };

  const handlePageChange = (page) => {
    fetchJobs(page);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Job Listings</h1>

      {/* Search Form */}
      <Card className="mb-4 shadow">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search Query</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job title, skills..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              Search Jobs
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Job Listings */}
      {!loading && !error && jobs.length > 0 && (
        <>
          <Row>
            {jobs.map((job) => (
              <Col key={job._id} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company_name}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Location:</strong>{" "}
                      {job.candidate_required_location || "Not specified"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Category:</strong>{" "}
                      {job.category || "Not specified"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Type:</strong> {job.job_type || "Not specified"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Salary:</strong>{" "}
                      {job.salary_range || "Not specified"}
                    </Card.Text>
                    <Card.Text className="text-truncate">
                      {job.description}
                    </Card.Text>
                    <Button variant="primary" href={job.url} target="_blank">
                      Apply Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* No Jobs */}
      {!loading && !error && jobs.length === 0 && (
        <Alert variant="info">No jobs found matching your criteria.</Alert>
      )}
    </Container>
  );
};

export default Jobs;
