import { Component } from 'react';
import { clearCertStorage } from '../utils/storage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#0E1526] guilloche-bg">
          <div className="max-w-md w-full text-center bg-white/[0.04] border border-white/10 rounded-md p-8 ">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-slate-300 text-sm mb-6">
              We hit an unexpected error. Your work is safe — try reloading, or head back home to start fresh.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#8C2F39] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:scale-105 transition-transform"
              >
                Reload page
              </button>
              <button
                onClick={() => {
                  clearCertStorage();
                  window.location.href = '/';
                }}
                className="bg-white/5 border border-white/15 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors"
              >
                Go home
              </button>
            </div>
            {this.state.error && (
              <details className="mt-6 text-left text-xs text-slate-500">
                <summary className="cursor-pointer">Technical details</summary>
                <pre className="mt-2 p-2 bg-slate-900/60 rounded overflow-auto">
                  {this.state.error?.message || String(this.state.error)}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
