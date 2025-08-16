import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
  FaBox,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaChartBar,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import io from "socket.io-client";
import API from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Use REACT_APP_SOCKET_URL for Create React App or import.meta.env for Vite
const socket = io(import.meta.env.SOCKET_URL);

export default function Dashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    productCount: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

console.log(API);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [statsRes, productsRes] = await Promise.all([
          API.get("/dashboard/stats"),
          API.get("/products"),
        ]);
        setStats(statsRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    socket.on("userUpdate", (userCount) => {
      setStats((prevStats) => ({ ...prevStats, userCount }));
    });

    socket.on("salesUpdate", (totalSales) => {
      setStats((prevStats) => ({ ...prevStats, totalSales }));
    });

    return () => {
      socket.off("userUpdate");
      socket.off("salesUpdate");
    };
  }, []);

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales Trend",
        data: [1200, 1900, 3000, 5000, 2300, 3200], // Dummy data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const barChartData = {
    labels: products.slice(0, 5).map((p) => p.productName),
    datasets: [
      {
        label: "Stock Levels",
        data: products.slice(0, 5).map((p) => p.stock),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid>
      <h1 className="h3 mb-4">Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <FaUsers size={40} className="text-primary me-3" />
              <div>
                <h5 className="card-title">Total Users</h5>
                <p className="card-text fs-4 fw-bold">{stats.userCount}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <FaBox size={40} className="text-success me-3" />
              <div>
                <h5 className="card-title">Total Products</h5>
                <p className="card-text fs-4 fw-bold">{stats.productCount}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <FaDollarSign size={40} className="text-warning me-3" />
              <div>
                <h5 className="card-title">Total Sales</h5>
                <p className="card-text fs-4 fw-bold">
                  ${stats.totalSales.toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="card-title">
                <FaChartLine className="me-2" />
                Sales Analytics
              </h5>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="card-title">
                <FaChartBar className="me-2" />
                Product Stock
              </h5>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}