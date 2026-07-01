import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import certificateImage from '../assets/Certificate.png';
import Navbar from './Navbar';

function Certificate() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const recipientName = state?.recipientName || sessionStorage.getItem('cert_recipientName') || '';
  const event = state?.event || sessionStorage.getItem('cert_event') || '';

  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.recipientName) {
      sessionStorage.setItem('cert_recipientName', state.recipientName);
    }
    if (state?.event) {
      sessionStorage.setItem('cert_event', state.event);
    }
  }, [state]);

  useEffect(() => {
    // Redirect if no data
    if (!recipientName || !event) {
      navigate('/');
      return;
    }

    const handleResize = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        const canvas = canvasRef.current;
        const canvasContainer = canvasContainerRef.current;
        const containerWidth = canvasContainer.offsetWidth;
        const containerHeight = canvasContainer.offsetHeight;

        const image = new Image();
        image.src = certificateImage;

        image.onload = () => {
          const imageRatio = image.width / image.height;
          const containerRatio = containerWidth / containerHeight;

          let width, height;

          if (imageRatio > containerRatio) {
            width = containerWidth * 0.9;
            height = width / imageRatio;
          } else {
            height = containerHeight * 0.9;
            width = height * imageRatio;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          ctx.font = `${Math.floor(height / 20)}px Arial`; 
          ctx.fillStyle = 'black';
          ctx.fillText(recipientName, width * 0.3, height * 0.499); 
          ctx.font = `${Math.floor(height / 30)}px Arial`; 
          ctx.fillText(event, width * 0.5, height * 0.6); 
        };
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recipientName, event, canvasRef, navigate]);

  const downloadCertificate = () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${recipientName}_${event}_certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    setTimeout(() => {
      setIsDownloading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const shareOnSocial = () => {
    const text = `I just received my certificate for ${event}! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: text,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right z-50">
          ✅ Certificate downloaded successfully!
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="w-full max-w-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                🎊 Congratulations, {recipientName}!
              </h1>
              <p className="text-white text-lg md:text-xl">
                Your certificate for <span className="font-semibold text-cyan-300">{event}</span> is ready!
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="bg-purple-500/30 text-white px-4 py-1 rounded-full text-sm">Certificate Ready</span>
                <span className="bg-green-500/30 text-white px-4 py-1 rounded-full text-sm">✓ Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div
          ref={canvasContainerRef}
          className="w-full h-[60vh] md:h-[70vh] flex justify-center items-center mb-6 animate-scale-in"
        >
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              className="max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white/20"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl animate-bounce">
              ⭐
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
              isDownloading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-green-500/50'
            }`}
            onClick={downloadCertificate}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <span className="animate-spin">⏳</span> Downloading...
              </>
            ) : (
              <>
                📥 Download Certificate
              </>
            )}
          </button>

          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50"
            onClick={shareOnSocial}
          >
            📤 Share
          </button>

          <button
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95"
            onClick={() => navigate('/')}
          >
            🔄 Create Another
          </button>
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-2">💾</div>
            <h3 className="text-white font-semibold mb-2">Save It</h3>
            <p className="text-gray-300 text-sm">Download your certificate in high quality PNG format</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-2">📱</div>
            <h3 className="text-white font-semibold mb-2">Share It</h3>
            <p className="text-gray-300 text-sm">Share your achievement on social media</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <h3 className="text-white font-semibold mb-2">Print It</h3>
            <p className="text-gray-300 text-sm">Print it and frame your accomplishment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;