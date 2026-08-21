'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SuiteData, initialMockData, Lead, Invoice, Task } from '../data/mockData';

interface Toast {
  message: string;
  type: 'success' | 'error';
}

interface AppContextType {
  data: SuiteData;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected') => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  moveDeal: (dealId: string, sourceStage: string, targetStage: string) => void;
  addChatMessage: (channel: string, text: string) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SuiteData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vasifytech_next_data');
      return saved ? JSON.parse(saved) : initialMockData;
    }
    return initialMockData;
  });

  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vasifytech_next_data', JSON.stringify(data));
    }
  }, [data]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const addLead = (newLead: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const lead: Lead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...newLead
    };
    setData(prev => ({
      ...prev,
      crm: {
        ...prev.crm,
        leads: [lead, ...prev.crm.leads],
        stats: {
          ...prev.crm.stats,
          totalLeads: prev.crm.stats.totalLeads + 1
        }
      }
    }));
    showToast(`Lead "${lead.name}" added successfully!`);
  };

  const updateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected') => {
    setData(prev => ({
      ...prev,
      hr: {
        ...prev.hr,
        leaves: prev.hr.leaves.map(l => l.id === leaveId ? { ...l, status } : l)
      }
    }));
    showToast(`Leave request ${leaveId} marked as ${status}.`);
  };

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInv: Invoice = {
      id: `INV-${Math.floor(1050 + Math.random() * 900)}`,
      ...invoice
    };
    setData(prev => ({
      ...prev,
      finance: {
        ...prev.finance,
        invoices: [newInv, ...prev.finance.invoices]
      }
    }));
    showToast(`Invoice ${newInv.id} created successfully!`);
  };

  const moveDeal = (dealId: string, sourceStage: string, targetStage: string) => {
    setData(prev => {
      const sourceList = prev.crm.dealsPipeline[sourceStage] || [];
      const deal = sourceList.find(d => d.id === dealId);
      if (!deal) return prev;

      return {
        ...prev,
        crm: {
          ...prev.crm,
          dealsPipeline: {
            ...prev.crm.dealsPipeline,
            [sourceStage]: sourceList.filter(d => d.id !== dealId),
            [targetStage]: [...(prev.crm.dealsPipeline[targetStage] || []), deal]
          }
        }
      };
    });
    showToast(`Deal moved to ${targetStage.toUpperCase()}`);
  };

  const addChatMessage = (channel: string, text: string) => {
    const msg = {
      id: Date.now(),
      sender: "You (Admin)",
      avatar: "YO",
      channel,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setData(prev => ({
      ...prev,
      workspace: {
        ...prev.workspace,
        messages: [...prev.workspace.messages, msg]
      }
    }));
  };

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      id: `TSK-${Math.floor(805 + Math.random() * 100)}`,
      status: 'To Do',
      ...task
    };
    setData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        tasks: [newTask, ...prev.projects.tasks]
      }
    }));
    showToast(`Task "${newTask.title}" created.`);
  };

  const resetData = () => {
    setData(initialMockData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vasifytech_next_data');
    }
    showToast('Reset data to initial state');
  };

  return (
    <AppContext.Provider value={{
      data,
      toast,
      showToast,
      addLead,
      updateLeaveStatus,
      addInvoice,
      moveDeal,
      addChatMessage,
      addTask,
      resetData
    }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: toast.type === 'error' ? '#dc2626' : '#1DA851',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '50px',
          boxShadow: '0 10px 24px -10px rgba(0,0,0,0.3)',
          fontFamily: 'var(--body)',
          fontWeight: 600,
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          {toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
