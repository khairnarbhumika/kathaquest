import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-amber-400">
            KathaQuest
          </h1>
          <p className="mt-4 text-slate-300">
            Indian History & Epics
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Application loading...
          </p>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
