'use client';

import * as React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', title, message, onClose, ...props }, ref) => {
    const variants = {
      success: {
        bg: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
        icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
        titleColor: 'text-green-900 dark:text-green-100',
        msgColor: 'text-green-700 dark:text-green-300',
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
        icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
        titleColor: 'text-red-900 dark:text-red-100',
        msgColor: 'text-red-700 dark:text-red-300',
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
        icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
        titleColor: 'text-yellow-900 dark:text-yellow-100',
        msgColor: 'text-yellow-700 dark:text-yellow-300',
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
        icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        titleColor: 'text-blue-900 dark:text-blue-100',
        msgColor: 'text-blue-700 dark:text-blue-300',
      },
    };

    const style = variants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'fixed top-4 right-4 z-[200] flex items-start gap-3 rounded-lg border p-4 shadow-lg min-w-[300px] max-w-[400px] animate-in slide-in-from-top-5 duration-300',
          style.bg,
          className
        )}
        {...props}
      >
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div className="flex-1 min-w-0">
          {title && <p className={cn('text-sm font-semibold', style.titleColor)}>{title}</p>}
          {message && <p className={cn('text-sm', style.msgColor)}>{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              'flex-shrink-0 rounded-md p-1 hover:bg-black/10 transition-colors',
              style.titleColor
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = 'Toast';

interface ToastState {
  id: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
}

interface ToastContextType {
  toasts: ToastState[];
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastState, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export { Toast };
