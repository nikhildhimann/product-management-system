import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaTasks,
  FaShieldAlt,
  FaUserPlus,
  FaBoxOpen,
  FaChartPie,
  FaStar,
} from "react-icons/fa";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Hero Section */}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "calc(70vh - 120px)",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Row className="text-center">
          <Col>
            <Card className="p-5 shadow-lg">
              <Card.Body>
                {user ? (
                  <>
                    <h1 className="display-4 fw-bold text-primary">
                      Welcome back, {user.name}!
                    </h1>
                    <p className="lead">
                      You are logged in. Manage your products and profile in the
                      dashboard.
                    </p>
                    <div className="mt-4">
                      <Link to="/dashboard" className="btn btn-primary btn-lg">
                        Go to Dashboard
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="display-4 fw-bold text-primary">
                      Welcome to Product Management System!!
                    </h1>
                    <p className="lead">
                      A modern and responsive dashboard for managing your
                      products.
                    </p>
                    <div className="mt-4">
                      <Link to="/login" className="btn btn-primary btn-lg me-2">
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-outline-primary btn-lg"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">Key Features</h2>
        <Row>
          <Col md={4} className="text-center mb-4">
            <Card className="p-4 h-100 shadow-sm">
              <FaTachometerAlt size={50} className="text-primary mx-auto mb-3" />
              <Card.Body>
                <Card.Title className="fw-bold">Dynamic Dashboard</Card.Title>
                <Card.Text>
                  Get a real-time overview of your sales, user registrations,
                  and product stock with live charts and stats.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="p-4 h-100 shadow-sm">
              <FaTasks size={50} className="text-success mx-auto mb-3" />
              <Card.Body>
                <Card.Title className="fw-bold">
                  Effortless Product Management
                </Card.Title>
                <Card.Text>
                  Easily add, view, update, and delete your products using an
                  intuitive and streamlined interface.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="p-4 h-100 shadow-sm">
              <FaShieldAlt size={50} className="text-danger mx-auto mb-3" />
              <Card.Body>
                <Card.Title className="fw-bold">Secure Authentication</Card.Title>
                <Card.Text>
                  Role-based access control ensures that your data is secure.
                  Manage your profile and information with confidence.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">How It Works</h2>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <FaUserPlus size={40} className="text-primary mb-3" />
              <h4 className="fw-bold">1. Create an Account</h4>
              <p>
                Sign up in seconds to get immediate access to your personal
                dashboard.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <FaBoxOpen size={40} className="text-primary mb-3" />
              <h4 className="fw-bold">2. Add Your Products</h4>
              <p>
                Use our simple form to add new products, including details,
                images, and stock levels.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <FaChartPie size={40} className="text-primary mb-3" />
              <h4 className="fw-bold">3. Track Everything</h4>
              <p>
                Monitor your inventory, sales, and user activity from our
                dynamic and easy-to-read dashboard.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Testimonials Section */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">What Our Users Say</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="p-3 h-100">
              <Card.Body>
                <div className="d-flex mb-2">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                </div>
                <Card.Text>
                  "This dashboard completely changed how I manage my online
                  store. It's intuitive, fast, and beautiful."
                </Card.Text>
                <footer className="blockquote-footer mt-2">
                  Jane Doe, <cite title="Source Title">Ecommerce Seller</cite>
                </footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="p-3 h-100">
              <Card.Body>
                <div className="d-flex mb-2">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                </div>
                <Card.Text>
                  "The real-time analytics are a game-changer. I can make
                  smarter decisions about my inventory instantly."
                </Card.Text>
                <footer className="blockquote-footer mt-2">
                  John Smith, <cite title="Source Title">Small Business Owner</cite>
                </footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="p-3 h-100">
              <Card.Body>
                <div className="d-flex mb-2">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                </div>
                <Card.Text>
                  "Finally, a product management tool that doesn't require a
                  manual. Simple, powerful, and effective."
                </Card.Text>
                <footer className="blockquote-footer mt-2">
                  Alex Ray, <cite title="Source Title">Digital Creator</cite>
                </footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">
          Frequently Asked Questions
        </h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Is this dashboard mobile-friendly?
                </Accordion.Header>
                <Accordion.Body>
                  Yes! The entire application, including the dashboard and
                  product management pages, is fully responsive and designed
                  to work beautifully on all devices, from desktops to
                  smartphones.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Can I export my product data?
                </Accordion.Header>
                <Accordion.Body>
                  While data export is not yet a feature, it is on our roadmap!
                  We are constantly working to add new functionalities based on
                  user feedback.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Is there a limit to how many products I can add?
                </Accordion.Header>
                <Accordion.Body>
                  No, there is currently no limit. You can add and manage as
                  many products as you need for your business.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Final Call to Action Section */}
      {!user && (
        <Container fluid className="bg-primary text-white text-center py-5">
          <Container>
            <h2 className="fw-bold">Ready to Get Started?</h2>
            <p className="lead mb-4">
              Create an account today and take control of your product
              inventory.
            </p>
            <Link to="/register" className="btn btn-light btn-lg">
              Sign Up Now
            </Link>
          </Container>
        </Container>
      )}
    </>
  );
}