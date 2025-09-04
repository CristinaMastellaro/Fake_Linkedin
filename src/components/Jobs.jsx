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
} from "react-bootstrap";

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedJobs, setExpandedJobs] = useState(new Set());
  const jobsPerPage = 12;

  const fetchAllJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (company) params.append("company", company);
      if (category) params.append("category", category);

      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?${params}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      const jobsData = data.data || data;
      setAllJobs(jobsData);
      setTotalPages(Math.ceil(jobsData.length / jobsPerPage));

      updatePageJobs(1, jobsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePageJobs = (page, jobsArray = allJobs) => {
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const pageJobs = jobsArray.slice(startIndex, endIndex);
    setJobs(pageJobs);
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllJobs();
  };

  const handlePageChange = (page) => {
    updatePageJobs(page);
  };

  const toggleDescription = (jobId) => {
    setExpandedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
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
          {/* Indicatore Pagina Sopra */}
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="text-muted mx-3">
              Pagina {currentPage} di {totalPages}
            </div>
          </div>

          <Row>
            {jobs.map((job) => (
              <Col key={job._id} md={6} lg={4} className="mb-4 d-flex">
                <Card className="h-100 w-100">
                  <Card.Body className="d-flex flex-column">
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
                    <div className="flex-grow-1 mb-2">
                      <Card.Text
                        className={
                          expandedJobs.has(job._id) ? "" : "text-truncate"
                        }
                        style={{
                          maxHeight: expandedJobs.has(job._id)
                            ? "none"
                            : "4.8em",
                          overflow: expandedJobs.has(job._id)
                            ? "visible"
                            : "hidden",
                        }}
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="link"
                        className="p-0 mb-2 d-block text-start"
                        onClick={() => toggleDescription(job._id)}
                      >
                        {expandedJobs.has(job._id) ? "Show less" : "Show more"}
                      </Button>
                      <Button
                        variant="primary"
                        className="w-100"
                        href={job.url}
                        target="_blank"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Frecce di Navigazione  */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-6 mb-4">
              <div
                className="d-flex align-items-center"
                style={{ gap: "0.5rem" }}
              >
                {/* Gruppo Sinistro: Prima Pagina + Pagina Precedente */}
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "0.25rem" }}
                >
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
                    aria-label="Prima Pagina"
                  >
                    <span style={{ fontSize: "1.5rem" }}>⇤</span>
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
                    aria-label="Pagina Precedente"
                  >
                    <span style={{ fontSize: "1.5rem" }}>←</span>
                  </Button>
                </div>

                {/*Indicatore Pagina */}
                <div className="text-muted mx-3">
                  Pagina {currentPage} di {totalPages}
                </div>

                {/* Gruppo Destro: Pagina Successiva + Ultima Pagina */}
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "0.25rem" }}
                >
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
                    aria-label="Pagina Successiva"
                  >
                    <span style={{ fontSize: "1.5rem" }}>→</span>
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
                    aria-label="Ultima Pagina"
                  >
                    <span style={{ fontSize: "1.5rem" }}>⇥</span>
                  </Button>
                </div>
              </div>
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
