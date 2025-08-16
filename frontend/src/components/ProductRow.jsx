import { Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function ProductRow({
  product,
  onEdit,
  onDelete,
  isExpanded,
  onToggle,
}) {
  const statusClass =
    product.status === "Active" ? "bg-success" : "bg-secondary";

  return (
    <>
      <tr className="align-middle">
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onToggle(product._id)}
          >
            {isExpanded ? <FaMinus /> : <FaPlus />}
          </Button>
        </td>
        <td>
          <img
            src={
              product.productImages[0]
                ? `http://localhost:5000${product.productImages[0]}`
                : "https://placehold.co/40x40"
            }
            alt={product.productName}
            className="rounded me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          {product.productName}
        </td>
        <td>{product.productCategory}</td>
        <td>{product.productBrand}</td>
        <td>${product.productPrice.toFixed(2)}</td>
        <td>{product.stock}</td>
        <td>{product.totalSales}</td>
        <td>
          <span className={`badge ${statusClass}`}>{product.status}</span>
        </td>
        <td>
          <Button
            variant="outline-warning"
            size="sm"
            className="me-2"
            onClick={() => onEdit(product)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(product)}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-light">
          <td colSpan="9" className="p-3">
            <h5>{product.productName} Details</h5>
            <p>{product.productDescription}</p>
            <div className="d-flex gap-2">
              {product.productImages.map((img, index) =>
                img ? (
                  <img
                    key={index}
                    src={`http://localhost:5000${img}`}
                    alt={`Product image ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    className="rounded"
                  />
                ) : null
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}