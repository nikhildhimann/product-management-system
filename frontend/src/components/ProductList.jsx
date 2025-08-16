import { Table } from "react-bootstrap";
import ProductRow from "./ProductRow";

export default function ProductList({
  products,
  onEdit,
  onDelete,
  onToggle,
  expandedProductId,
}) {
  return (
    <Table striped bordered hover responsive className="shadow-sm">
      <thead className="table-dark">
        <tr>
          <th></th>
          <th>Product</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Sales</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((p) => (
            <ProductRow
              key={p._id}
              product={p}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
              isExpanded={expandedProductId === p._id}
            />
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center p-4">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}