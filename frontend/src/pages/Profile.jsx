import { useState, useContext, useEffect } from "react";
import API from "../api";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { Container, Row, Col, Form, Button, Image, Card } from "react-bootstrap";

export default function Profile() {
  const { user, loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        image: user.image || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required.";
    if (form.password && form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    if (form.password && form.password !== form.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (validate()) {
      setLoading(true);
      try {
        const payload = {
          name: form.name,
          image:
            form.image ||
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
        };
        if (form.password) {
          payload.password = form.password;
        }

        const res = await API.put("/users/profile", payload);
        loginUser(res.data);
        setSuccess("Profile updated successfully!");
        setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      } catch (err) {
        setApiError(err.response?.data?.message || "Failed to update profile.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow">
            <div className="text-center mb-4">
              <Image
                src={
                  form.image
                    ? `http://localhost:5000${form.image}`
                    : "https://images.unsplash.com/vector-1745646562211-c34c3238c382?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fDA%3D"
                }
                alt={form.name}
                roundedCircle
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h2 className="mt-3">Edit Profile</h2>
            </div>

            {apiError && <Alert message={apiError} type="error" />}
            {success && <Alert message={success} type="success" />}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={form.email} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password (leave blank to keep current)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading || uploading}
              >
                {loading ? <Spinner /> : "Update Profile"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
