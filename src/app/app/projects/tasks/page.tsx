'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Calendar, CheckSquare, Clock, X } from 'lucide-react';
import { Task } from '@/data/mockData';

export default function TasksPage() {
  const { data, addTask } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'gantt'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    project: 'Kestrel Factory IoT Suite',
    assignee: 'Karan Verma',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Urgent',
    dueDate: '2026-08-30'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    addTask(formData);
    setFormData({ title: '', project: 'Kestrel Factory IoT Suite', assignee: 'Karan Verma', priority: 'Medium', dueDate: '2026-08-30' });
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-crm-subnav">
        <Link href="/app/projects" className="btn btn-sm btn-ghost">Projects Overview</Link>
        <Link href="/app/projects/tasks" className="btn btn-sm btn-brass">Tasks & Gantt Timeline</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-brass' : 'btn-ghost'}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-brass' : 'btn-ghost'}`}
            onClick={() => setViewMode('kanban')}
          >
            Kanban Board
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'gantt' ? 'btn-brass' : 'btn-ghost'}`}
            onClick={() => setViewMode('gantt')}
          >
            Gantt Timeline
          </button>
        </div>

        <button className="btn btn-brass btn-sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={15} /> Create Task
        </button>
      </div>

      {viewMode === 'list' && (
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Project</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.tasks.map(task => (
                <tr key={task.id}>
                  <td style={{ fontWeight: 600 }}>{task.title}</td>
                  <td><span className="badge badge-gray">{task.project}</span></td>
                  <td>{task.assignee}</td>
                  <td>
                    <span className={`badge ${task.priority === 'Urgent' ? 'badge-red' : task.priority === 'High' ? 'badge-orange' : 'badge-gray'}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{task.dueDate}</td>
                  <td>
                    <span className={`badge ${task.status === 'Done' ? 'badge-green' : task.status === 'In Progress' ? 'badge-blue' : 'badge-gray'}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'gantt' && (
        <div className="vt-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px' }}>Project Milestone Timeline (Gantt)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.projects.gantt.map(item => (
              <div key={item.id} style={{ background: 'var(--bg-soft)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', fontWeight: 600 }}>
                  <span>{item.name}</span>
                  <span>{item.start} → {item.end} ({item.progress}%)</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e4e9ec', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', background: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px' }}>Create New Project Task</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">Task Title *</label>
                <input 
                  type="text" 
                  className="vt-input" 
                  required 
                  placeholder="e.g. Design API endpoint schema"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Assignee</label>
                <input 
                  type="text" 
                  className="vt-input" 
                  value={formData.assignee}
                  onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-brass">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
