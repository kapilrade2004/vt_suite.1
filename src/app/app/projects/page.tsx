'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Briefcase, Plus, Eye, X } from 'lucide-react';
import { Project } from '@/data/mockData';

export default function ProjectsPage() {
  const { data } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/projects" className="btn btn-sm btn-brass">Projects Overview</Link>
        <Link href="/app/projects/tasks" className="btn btn-sm btn-ghost">Tasks & Gantt Timeline</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>ACTIVE PROJECTS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--ink)' }}>{data.projects.stats.activeProjects}</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>COMPLETED</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--green-dark)' }}>{data.projects.stats.completedProjects}</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL BUDGET</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--ink)' }}>{data.projects.stats.totalBudget}</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>HOURS LOGGED (MTD)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--green-dark)' }}>{data.projects.stats.hoursLoggedThisMonth}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {data.projects.list.map(prj => (
          <div key={prj.id} className="vt-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span className={`badge ${prj.status === 'Completed' ? 'badge-green' : prj.priority === 'Urgent' ? 'badge-red' : 'badge-blue'}`}>
                  {prj.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Due: {prj.deadline}</span>
              </div>

              <h3 style={{ fontSize: '17px', color: 'var(--ink)', marginBottom: '4px' }}>{prj.title}</h3>
              <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginBottom: '16px' }}>Client: {prj.client}</div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span>Completion</span>
                  <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>{prj.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${prj.progress}%`, height: '100%', background: 'var(--green)' }}></div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>PROJECT BUDGET</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--ink)' }}>{prj.budget}</div>
              </div>
              <button onClick={() => setSelectedProject(prj)} className="btn btn-sm btn-ghost">
                <Eye size={13} /> Open Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ maxWidth: '640px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px' }}>{selectedProject.title}</h3>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Client: {selectedProject.client} • Manager: {selectedProject.manager}</div>
              </div>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div className="vt-card" style={{ background: 'var(--bg-soft)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>DEADLINE</div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{selectedProject.deadline}</div>
              </div>
              <div className="vt-card" style={{ background: 'var(--bg-soft)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>APPROVED BUDGET</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-dark)' }}>{selectedProject.budget}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-brass btn-sm" onClick={() => setSelectedProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
