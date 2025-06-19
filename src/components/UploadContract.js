import React, { useState } from 'react';

function UploadContract() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setMessage('Only PDF files are allowed.');
      return;
    }
    const formData = new FormData();
    formData.append('contract_pdf', file);

    try {
      const res = await fetch('/api/upload_contract', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Uploaded & activated (template ID: ${data.template_id}).`);
      } else {
        setMessage(data.error || 'Upload failed.');
      }
    } catch (err) {
      setMessage('Error: ' + err.toString());
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Upload New Contract PDF</h5>
          </div>
          <div className="card-body">
            {message && (
              <div className="alert alert-info">{message}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="contract_pdf" className="form-label">
                  Select PDF:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="contract_pdf"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Upload & Activate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadContract;
