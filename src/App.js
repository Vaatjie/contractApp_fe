import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadContract from './components/UploadContract';
import ViewActive from './components/ViewActive';
import FillContract from './components/FillContract';
import PreviewSign from './components/PreviewSign';
import ListVersions from './components/ListVersions';
import ListPersonalized from './components/ListPersonalized';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<UploadContract />} />
          <Route path="/view-active" element={<ViewActive />} />
          <Route path="/fill" element={<FillContract />} />
          <Route path="/preview/:personalId" element={<PreviewSign />} />
          <Route path="/versions" element={<ListVersions />} />
          <Route path="/personalized" element={<ListPersonalized />} />
          {/* Fallback to Upload for any unknown route */}
          <Route path="*" element={<UploadContract />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
