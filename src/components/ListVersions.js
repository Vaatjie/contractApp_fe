import React, { useEffect, useState } from 'react';

function ListVersions() {
  const [versions, setVersions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/list_contract_versions')
      .then(res => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) setVersions(data);
        else setError(data.error || 'Failed to fetch versions.');
      })
      .catch(err => setError(err.toString()));
  }, []);

  const handleActivate = (id) => {
    fetch('/api/activate_contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template_id: id })
    })
      .then(res => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) {
          window.location.reload();
        } else {
          setError(data.error || 'Activation failed.');
        }
      })
      .catch(err => setError(err.toString()));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Contract Versions</h5>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-warning">{error}</div>}
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Filename</th>
                  <th>Created At</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {versions.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.filename}</td>
                    <td>{new Date(v.created_at).toLocaleString()}</td>
                    <td>
                      {v.is_active
                        ? <span className="badge bg-success">Active</span>
                        : <span className="badge bg-secondary">Inactive</span>}
                    </td>
                    <td>
                      {!v.is_active && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleActivate(v.id)}
                        >
                          Activate
                        </button>
                      )}
                      {v.is_active && (
                        <button className="btn btn-sm btn-outline-secondary" disabled>
                          Active
                        </button>
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

export default ListVersions;
