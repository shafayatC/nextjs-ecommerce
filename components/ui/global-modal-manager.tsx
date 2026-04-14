'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ModalConfig {
  id: string;
  title?: string;
  props?: Record<string, unknown>;
}

interface GlobalModalContextType {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  modalContent: Record<string, React.ReactNode>;
  setModalContent: React.Dispatch<React.SetStateAction<Record<string, React.ReactNode>>>;
}

const GlobalModalContext = React.createContext<GlobalModalContextType | undefined>(undefined);

export function GlobalModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = React.useState<ModalConfig | null>(null);
  const [modalContent, setModalContent] = React.useState<Record<string, React.ReactNode>>({});

  const openModal = React.useCallback((config: ModalConfig) => {
    setActiveModal(config);
  }, []);

  const closeModal = React.useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <GlobalModalContext.Provider value={{ openModal, closeModal, modalContent, setModalContent }}>
      {children}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-50 w-full max-w-md mx-4 bg-background rounded-lg shadow-lg">
            {activeModal.title && (
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">{activeModal.title}</h2>
                <Button variant="ghost" size="sm" onClick={closeModal} className="p-1 h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="p-4">
              {modalContent[activeModal.id]}
            </div>
          </div>
        </div>
      )}
    </GlobalModalContext.Provider>
  );
}

export function useGlobalModal() {
  const context = React.useContext(GlobalModalContext);
  if (!context) throw new Error('useGlobalModal must be used within GlobalModalProvider');
  return context;
}
