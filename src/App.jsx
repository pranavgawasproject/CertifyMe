import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Certificate from './components/Certificate';
import Templates from './components/Templates';
import BulkGenerate from './components/BulkGenerate';
import SharedCertificate from './components/SharedCertificate';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-20 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

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
