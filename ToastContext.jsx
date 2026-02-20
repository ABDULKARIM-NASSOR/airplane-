/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'loading', // 'loading', 'success', 'error', 'info', 'warning'
    duration: 3000
  });

  const showToast = (message, type = 'loading', duration = 3000) => {
    setToast({ show: true, message, type, duration });
    
    // Auto hide for non-loading toasts
    if (type !== 'loading') {
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, duration);
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      <GlobalToast />
    </ToastContext.Provider>
  );
}

function GlobalToast() {
  const { toast } = useContext(ToastContext);
  
  if (!toast.show) return null;

  const getIcon = () => {
    switch(toast.type) {
      case 'loading':
        return '◌';
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '◌';
    }
  };

  const getProgressBar = () => {
    if (toast.type === 'loading') {
      return (
        <div className="toast-progress">
          <div className="progress-bar infinite"></div>
        </div>
      );
    } else if (toast.duration) {
      return (
        <div className="toast-progress">
          <div 
            className="progress-bar" 
            style={{ animation: `shrink ${toast.duration}ms linear` }}
          ></div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="toast-backdrop"></div>
      <div className={`global-toast ${toast.type}`}>
        <div className="toast-content">
          <span className="toast-icon">{getIcon()}</span>
          <span className="toast-message">{toast.message}</span>
          {toast.type === 'loading' && (
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        {getProgressBar()}
      </div>
    </>
  );
}
