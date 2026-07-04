import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Certificate from './components/Certificate';
import Templates from './components/Templates';
import BulkGenerate from './components/BulkGenerate';
import SharedCertificate from './components/SharedCertificate';

function App() {
  return (
    <div className="min-h-screen bg-[#0E1526] guilloche-bg relative overflow-hidden">
      <div className="relative z-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/bulk" element={<BulkGenerate />} />
            <Route path="/c/:data" element={<SharedCertificate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
