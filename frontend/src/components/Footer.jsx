export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: "#ffffff",
        color: "#6c7293",
        padding: "1.5rem 0",
        borderTop: "1px solid #e0e7ff",
      }}
    >
      <div className="container text-center">
        <span style={{ fontWeight: 500 }}>
          &copy; {new Date().getFullYear()} Purple Dashboard. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}