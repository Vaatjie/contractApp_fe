import React, { useEffect, useState } from 'react';

function ViewActive() {
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/active_contract')
      .then((res) => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) {
          setTemplate(data);
        } else {
          setError(data.error || 'No active contract.');
        }
      })
      .catch((err) => setError(err.toString()));
  }, []);

  return (
    <div className="text-center">
      <h3 className="mt-4">Active Contract</h3>
      {error && (
        <div className="alert alert-warning">{error}</div>
      )}
      {template && (
        <>
          <iframe
            src={`http://localhost:5000${template.pdf_url}`}
            style={{ width: '100%', height: '75vh', border: '1px solid #ccc', borderRadius: '.25rem' }}
            title="Active Contract"
          ></iframe>
        </>
      )}
    </div>
  );
}

export default ViewActive;
