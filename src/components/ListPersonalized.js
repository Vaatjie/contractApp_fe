import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListPersonalized() {
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/list_personalized_contracts')
      .then(res => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) setContracts(data);
        else setError(data.error || 'Failed to fetch.');
      })
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Personalized Contracts</h5>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-warning">{error}</div>}
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Template ID</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Signed?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.template_id}</td>
                    <td>{c.employee_name}</td>
                    <td>{new Date(c.created_at).toLocaleString()}</td>
                    <td>
                      {c.is_signed
                        ? <span className="badge bg-success">Yes</span>
                        : <span className="badge bg-warning text-dark">No</span>}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/preview/${c.id}`)}
                      >
                        Preview
                      </button>
                      {c.is_signed && (
                        <a
                          className="btn btn-sm btn-outline-success"
                          href={`http://localhost:5000${c.signed_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPersonalized;
