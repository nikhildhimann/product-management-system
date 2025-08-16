// import { CAlert } from '@coreui/react';

// export default function Alert({ message, type }) {
//   const baseClasses = "p-4 mb-4 text-sm rounded-lg";
//   const typeClasses = {
//     error: "bg-red-100 text-red-700",
//     success: "bg-green-100 text-green-700",
//   };
//   return <CAlert><div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;</CAlert>
// }

import Alert from 'react-bootstrap/Alert';

function Alerts() {
  return (
    <>
      {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </>
  );
}

export default Alerts;