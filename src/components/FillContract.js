import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FillContract() {
  const [form, setForm] = useState({
    employee_name: '',
    employee_id_number: '',
    employee_cellphone: '',
    employee_address: ''
  });
  const [error, setError] = useState('');
  const [activeURL, setActiveURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // fetch active contract URL to preview
    fetch('/api/active_contract')
      .then(res => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) setActiveURL(data.pdf_url);
        else setError(data.error || 'No active contract.');
      })
      .catch(err => setError(err.toString()));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employee_name, employee_id_number, employee_address } = form;
    if (!employee_name || !employee_id_number || !employee_address) {
      setError('Name, ID Number, and Address are required.');
      return;
    }
    try {
      const res = await fetch('/api/create_personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/preview/${data.personal_id}`);
      } else {
        setError(data.error || 'Failed to create contract.');
      }
    } catch (err) {
      setError('Error: ' + err.toString());
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Fill Contract Details</h5>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-warning">{error}</div>
            )}
            {activeURL && (
              <p className="text-muted">
                <strong>Step 1:</strong>{' '}
                <a
                  href={activeURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Preview Blank Contract
                </a>
              </p>
            )}
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="employee_name" className="form-label">
                  Name (as on ID):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_name"
                  name="employee_name"
                  value={form.employee_name}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employee_id_number" className="form-label">
                  ID / Passport Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_id_number"
                  name="employee_id_number"
                  value={form.employee_id_number}
                  onChange={handleChange}
                  placeholder="e.g. 8901015002087"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employee_cellphone" className="form-label">
                  Cellphone Number:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="employee_cellphone"
                  name="employee_cellphone"
                  value={form.employee_cellphone}
                  onChange={handleChange}
                  placeholder="e.g. +27 82 555 1234"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employee_address" className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_address"
                  name="employee_address"
                  value={form.employee_address}
                  onChange={handleChange}
                  placeholder="Your residential address"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Generate Contract
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillContract;
