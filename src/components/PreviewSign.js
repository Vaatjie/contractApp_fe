import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

function PreviewSign() {
  const { personalId } = useParams();
  const sigCanvasRef = useRef(null);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setPdfUrl(`/api/download_personal/${personalId}`);
  }, [personalId]);

  const handleSave = () => {
    const canvasInstance = sigCanvasRef.current;
    if (!canvasInstance || canvasInstance.isEmpty()) {
      setError('Please draw your signature first.');
      return;
    }
    setError('');

    // Use getCanvas() instead of getTrimmedCanvas()
    const rawCanvas = canvasInstance.getCanvas();
    const dataURL = rawCanvas.toDataURL('image/png');

    fetch(`/api/sign_personal/${personalId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature: dataURL })
    })
      .then(res => res.json().then(js => ({ ok: res.ok, data: js })))
      .then(({ ok, data }) => {
        if (ok) {
          window.location.href = data.signed_url;
        } else {
          setError(data.error || 'Signing failed.');
        }
      })
      .catch(err => setError(err.toString()));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Preview &amp; Sign Contract #{personalId}</h5>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-warning">{error}</div>}

            {/* Only render the iframe once pdfUrl is set */}
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                style={{
                  width: '100%',
                  height: '60vh',
                  border: '1px solid #ccc',
                  borderRadius: '.25rem'
                }}
                title="Generated Contract"
              ></iframe>
            )}

            <hr />

            <p className="text-muted">Draw your signature below:</p>
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                className: 'sigCanvas',
                style: { width: '100%', height: '200px', border: '2px dashed #666' }
              }}
              ref={sigCanvasRef}
            />

            <button className="btn btn-success mt-2 me-2" onClick={handleSave}>
              Save &amp; Submit
            </button>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => sigCanvasRef.current.clear()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewSign;
