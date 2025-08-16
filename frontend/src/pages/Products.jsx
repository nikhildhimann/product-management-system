import { useEffect, useState, useContext } from "react";
import API from "../api";
import {
  Spinner,
  Alert,
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  FormControl,
  Card,
} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import ProductList from "../components/ProductList";

export default function Products() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [uploading, setUploading] = useState([false, false, false]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Keep setLoading(true) only for the initial load
    // This prevents the whole page from showing a spinner on every update
    if (loading) {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    } else {
      // For subsequent fetches, just get the data without the main spinner
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products.");
      }
    }
  };

  const handleToggleRow = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const errors = {};
    if (!currentProduct.productName)
      errors.productName = "Product name is required";
    if (!currentProduct.productPrice)
      errors.productPrice = "Product price is required";
    else if (
      isNaN(currentProduct.productPrice) ||
      currentProduct.productPrice <= 0
    )
      errors.productPrice = "Price must be a positive number";
    if (!currentProduct.productCategory)
      errors.productCategory = "Category is required";
    if (!currentProduct.productBrand) errors.productBrand = "Brand is required";
    if (currentProduct.stock < 0) errors.stock = "Stock cannot be negative";
    if (!currentProduct.productDescription)
      errors.productDescription = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const newUploading = [...uploading];
    newUploading[index] = true;
    setUploading(newUploading);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await API.post("/upload", formData, config);
      const newImages = [...currentProduct.productImages];
      newImages[index] = data.image;
      setCurrentProduct((prev) => ({ ...prev, productImages: newImages }));
    } catch (error) {
       setFormErrors((prev) => ({ ...prev, api: 'Upload failed' }));
    } finally {
      const finalUploading = [...uploading];
      finalUploading[index] = false;
      setUploading(finalUploading);
    }
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    const payload = {
      ...currentProduct,
      productImages: currentProduct.productImages.filter(
        (img) => img && img.trim() !== ""
      ),
    };

    try {
      if (currentProduct._id) {
        await API.put(`/products/${currentProduct._id}`, payload);
      } else {
        await API.post("/products", payload);
      }
      await fetchProducts(); // **THIS IS THE FIX: Re-fetch the list from the server**
      closeModal();
    } catch (err) {
      setFormErrors({
        api: err.response?.data?.message || "Failed to save product.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await API.delete(`/products/${currentProduct._id}`);
      await fetchProducts(); // **THIS IS THE FIX: Also re-fetch after deleting**
      closeDeleteModal();
    } catch (err) {
      setError("Failed to delete product." + err);
    }
  };

  const openModal = (product = null) => {
    const images = product?.productImages || [];
    const formImages = [...images];
    while (formImages.length < 3) {
      formImages.push("");
    }
    setCurrentProduct(
      product || {
        productName: "",
        productPrice: "",
        productCategory: "",
        productBrand: "",
        productDescription: "",
        stock: 0,
        totalSales: 0,
        status: "Active",
        productImages: formImages,
      }
    );
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid>
      <Row className="my-4 align-items-center">
        <Col md={6}>
          <h1>
            Products{" "}
            <small className="text-muted">{products.length} results</small>
          </h1>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => openModal()}>
            + Add New Product
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <FormControl
                placeholder="Search by product name..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Card.Header>
            <Card.Body>
              <ProductList
                products={filteredProducts}
                onEdit={openModal}
                onDelete={openDeleteModal}
                onToggle={handleToggleRow}
                expandedProductId={expandedProductId}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={isModalOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct?._id ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
             <Form>
             <Row>
               <Col md={6}>
                 <Form.Group className="mb-3">
                   <Form.Label>Product Name</Form.Label>
                   <Form.Control name="productName" value={currentProduct.productName} onChange={handleFormChange} isInvalid={!!formErrors.productName} />
                   <Form.Control.Feedback type="invalid">{formErrors.productName}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
               <Col md={6}>
                 <Form.Group className="mb-3">
                   <Form.Label>Brand</Form.Label>
                   <Form.Control name="productBrand" value={currentProduct.productBrand} onChange={handleFormChange} isInvalid={!!formErrors.productBrand} />
                   <Form.Control.Feedback type="invalid">{formErrors.productBrand}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
             </Row>
             <Row>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>Category</Form.Label>
                   <Form.Control name="productCategory" value={currentProduct.productCategory} onChange={handleFormChange} isInvalid={!!formErrors.productCategory} />
                   <Form.Control.Feedback type="invalid">{formErrors.productCategory}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>Price</Form.Label>
                   <Form.Control type="number" name="productPrice" value={currentProduct.productPrice} onChange={handleFormChange} isInvalid={!!formErrors.productPrice} />
                   <Form.Control.Feedback type="invalid">{formErrors.productPrice}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>Stock</Form.Label>
                   <Form.Control type="number" name="stock" value={currentProduct.stock} onChange={handleFormChange} isInvalid={!!formErrors.stock} />
                    <Form.Control.Feedback type="invalid">{formErrors.stock}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
                <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>Total Sales</Form.Label>
                   <Form.Control type="number" name="totalSales" value={currentProduct.totalSales} onChange={handleFormChange} isInvalid={!!formErrors.totalSales} />
                    <Form.Control.Feedback type="invalid">{formErrors.totalSales}</Form.Control.Feedback>
                 </Form.Group>
               </Col>
             </Row>
             <Form.Group className="mb-3">
               <Form.Label>Description</Form.Label>
               <Form.Control as="textarea" rows={3} name="productDescription" value={currentProduct.productDescription} onChange={handleFormChange} isInvalid={!!formErrors.productDescription} />
               <Form.Control.Feedback type="invalid">{formErrors.productDescription}</Form.Control.Feedback>
             </Form.Group>
             {[0, 1, 2].map((i) => (
               <Form.Group className="mb-3" key={`img-${i}`}>
                 <Form.Label>Product Image {i + 1}</Form.Label>
                 <Form.Control type="file" onChange={(e) => handleImageUpload(e, i)} />
                 {currentProduct.productImages[i] && (
                   <img src={`http://localhost:5000${currentProduct.productImages[i]}`} alt="preview" className="mt-2" style={{ height: "64px", width: "64px", objectFit: "cover", borderRadius: "4px" }} />
                 )}
                 {uploading[i] && <Spinner animation="border" size="sm" />}
               </Form.Group>
             ))}
             {formErrors.api && (
               <Alert variant="danger">{formErrors.api}</Alert>
             )}
           </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveProduct}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Saving...</span>
              </>
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={isDeleteModalOpen} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}