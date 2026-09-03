'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Folder, TrendingUp, CheckCircle2, Clock, Zap, Plus, Download, RefreshCw, 
  Search, Filter, Table as TableIcon, LayoutGrid, ChevronDown, Edit3, X, 
  Calendar, User, AlertTriangle, ChevronRight, Layers, FileText
} from 'lucide-react';

interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  category: 'CRM' | 'Web App' | 'Mobile App' | 'E-Commerce' | 'Design';
  salesOwner: string;
  projectManager: string;
  developerAssigned: string;
  startDate: string;
  expectedDelivery: string;
  status: 'In Progress' | 'Not Started' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  progress: number;
  description: string;
  isOverdue?: boolean;
}

const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: '1',
    name: 'test',
    client: 'Nishit Patel',
    category: 'CRM',
    salesOwner: 'sushil',
    projectManager: '—',
    developerAssigned: 'nishit',
    startDate: '21 Aug 2026',
    expectedDelivery: '30 Aug 2026',
    status: 'In Progress',
    priority: 'Medium',
    progress: 15,
    description: '—',
    isOverdue: true
  },
  {
    id: '2',
    name: 'Child Coffee',
    client: 'Coffee Shop',
    category: 'CRM',
    salesOwner: 'Sushil Bhujade',
    projectManager: 'Aditya',
    developerAssigned: 'Ajay Pawar, Var...',
    startDate: '1 Jul 2026',
    expectedDelivery: '5 Aug 2026',
    status: 'In Progress',
    priority: 'High',
    progress: 90,
    description: 'CRM and Web development',
    isOverdue: true
  },
  {
    id: '3',
    name: 'Website New Home page',
    client: 'Santosh R Pandey',
    category: 'Web App',
    salesOwner: 'Sushil Bhujade',
    projectManager: 'Aditya',
    developerAssigned: 'Ajay Pawar',
    startDate: '10 Jul 2026',
    expectedDelivery: '17 Jul 2026',
    status: 'In Progress',
    priority: 'High',
    progress: 35,
    description: 'Home page development',
    isOverdue: true
  }
];

export default function ProjectsPage() {
  const { data } = useApp();
  const [projects, setProjects] = useState<ProjectRecord[]>(INITIAL_PROJECTS);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // Filter panel popover state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterClient, setFilterClient] = useState<string>('All clients');

  // Add Project Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    client: '',
    category: 'CRM' as const,
    salesOwner: 'Sushil Bhujade',
    projectManager: 'Aditya',
    developerAssigned: 'Ajay Pawar',
    startDate: new Date().toISOString().split('T')[0],
    expectedDelivery: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    status: 'In Progress' as const,
    priority: 'Medium' as const,
    progress: 10,
    description: ''
  });

  const clearFilters = () => {
    setFilterStatus('All');
    setFilterPriority('All');
    setFilterClient('All clients');
  };

  const isFilterActive = filterStatus !== 'All' || filterPriority !== 'All' || filterClient !== 'All clients';

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.salesOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.developerAssigned.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || p.priority === filterPriority;
    const matchesClient = filterClient === 'All clients' || p.client === filterClient;

    return matchesSearch && matchesStatus && matchesPriority && matchesClient;
  });

  const totalCount = projects.length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
  const deliveredCount = projects.filter(p => p.status === 'Completed').length;
  const onHoldCount = projects.filter(p => p.status === 'On Hold').length;
  const criticalCount = projects.filter(p => p.isOverdue || p.priority === 'Critical').length;

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.client) return;

    const newPrj: ProjectRecord = {
      id: String(Date.now()),
      name: addForm.name,
      client: addForm.client,
      category: addForm.category,
      salesOwner: addForm.salesOwner,
      projectManager: addForm.projectManager,
      developerAssigned: addForm.developerAssigned,
      startDate: addForm.startDate,
      expectedDelivery: addForm.expectedDelivery,
      status: addForm.status,
      priority: addForm.priority,
      progress: Number(addForm.progress) || 0,
      description: addForm.description || '—',
      isOverdue: false
    };

    setProjects(prev => [newPrj, ...prev]);
    setIsAddModalOpen(false);
    setAddForm({
      name: '',
      client: '',
      category: 'CRM',
      salesOwner: 'Sushil Bhujade',
      projectManager: 'Aditya',
      developerAssigned: 'Ajay Pawar',
      startDate: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'In Progress',
      priority: 'Medium',
      progress: 10,
      description: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      
      {/* ── Sub Navigation Tabs ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/projects" className="btn btn-sm btn-brass">Overview</Link>
        <Link href="/app/projects/tasks" className="btn btn-sm btn-ghost">Tasks & Board</Link>
      </div>

      {/* ── Page Header Row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Projects</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
            Manage and track all client projects
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" style={{ height: '36px', width: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RefreshCw size={15} />
          </button>

          <button className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
            <Download size={14} /> Export
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-brass btn-sm" 
            style={{ height: '36px', borderRadius: '10px', background: '#2563eb', borderColor: '#2563eb', color: '#fff' }}
          >
            <Plus size={15} /> New Project
          </button>
        </div>
      </div>

      {/* ── 5 Stat Cards Summary Bar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
        
        {/* TOTAL */}
        <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #dbeafe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.05em' }}>TOTAL</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginTop: '4px' }}>{totalCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', boxShadow: '0 2px 6px rgba(37,99,235,0.15)' }}>
            <TrendingUp size={20} />
          </div>
        </div>

        {/* IN PROGRESS */}
        <div style={{ background: '#fefce8', borderRadius: '16px', padding: '18px 20px', border: '1px solid #fef08a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#ca8a04', letterSpacing: '0.05em' }}>IN PROGRESS</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#713f12', marginTop: '4px' }}>{inProgressCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8a04', boxShadow: '0 2px 6px rgba(202,138,4,0.15)' }}>
            <Folder size={20} />
          </div>
        </div>

        {/* DELIVERED */}
        <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '18px 20px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', letterSpacing: '0.05em' }}>DELIVERED</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#14532d', marginTop: '4px' }}>{deliveredCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', boxShadow: '0 2px 6px rgba(22,163,74,0.15)' }}>
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* ON HOLD */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>ON HOLD</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#334155', marginTop: '4px' }}>{onHoldCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', boxShadow: '0 2px 6px rgba(100,116,139,0.15)' }}>
            <Clock size={20} />
          </div>
        </div>

        {/* CRITICAL / OVERDUE */}
        <div style={{ background: '#fef2f2', borderRadius: '16px', padding: '18px 20px', border: '1px solid #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', letterSpacing: '0.05em' }}>CRITICAL / OVERDUE</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#7f1d1d', marginTop: '4px' }}>{criticalCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', boxShadow: '0 2px 6px rgba(220,38,38,0.15)' }}>
            <Zap size={20} />
          </div>
        </div>

      </div>

      {/* ── Toolbar Row (Search, Filters & View Toggle) ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Search Input */}
        <div style={{ position: 'relative', width: '380px', maxWidth: '100%' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search project, client, team member..."
            className="vt-input"
            style={{ paddingLeft: '36px', height: '38px', fontSize: '13px', borderRadius: '12px', background: '#fff' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
          
          {/* Filters Dropdown Popover */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn btn-secondary btn-sm"
              style={{
                height: '38px', borderRadius: '12px', background: isFilterActive ? '#eff6ff' : '#fff',
                color: isFilterActive ? '#2563eb' : 'inherit', borderColor: isFilterActive ? '#bfdbfe' : 'var(--border)'
              }}
            >
              <Filter size={14} /> Filters <ChevronDown size={13} />
            </button>

            {isFilterOpen && (
              <div style={{
                position: 'absolute', right: 0, top: '44px', zIndex: 30, width: '280px',
                background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0',
                padding: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)' }}>Filters</span>
                  {isFilterActive && (
                    <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      Clear
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>STATUS</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {['All', 'Not Started', 'In Progress', 'Completed', 'On Hold'].map(st => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        style={{
                          fontSize: '11.5px', fontWeight: filterStatus === st ? 700 : 500,
                          padding: '4px 10px', borderRadius: '12px', border: 'none',
                          background: filterStatus === st ? '#2563eb' : '#f1f5f9',
                          color: filterStatus === st ? '#fff' : '#475569', cursor: 'pointer'
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Filter */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>PRIORITY</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {['All', 'Low', 'Medium', 'High', 'Critical'].map(pr => (
                      <button
                        key={pr}
                        onClick={() => setFilterPriority(pr)}
                        style={{
                          fontSize: '11.5px', fontWeight: filterPriority === pr ? 700 : 500,
                          padding: '4px 10px', borderRadius: '12px', border: 'none',
                          background: filterPriority === pr ? '#2563eb' : '#f1f5f9',
                          color: filterPriority === pr ? '#fff' : '#475569', cursor: 'pointer'
                        }}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Filter */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>CLIENT</label>
                  <select
                    value={filterClient}
                    onChange={e => setFilterClient(e.target.value)}
                    className="vt-input"
                    style={{ height: '34px', fontSize: '12px', borderRadius: '10px' }}
                  >
                    <option value="All clients">All clients</option>
                    {Array.from(new Set(projects.map(p => p.client))).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>
            )}
          </div>

          {/* Cards View Sort Select */}
          {viewMode === 'cards' && (
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as any)}
              className="vt-input"
              style={{ height: '38px', fontSize: '12.5px', borderRadius: '12px', width: '130px', background: '#fff' }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          )}

          {/* View Toggle Segmented Buttons */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? '#2563eb' : 'transparent',
                color: viewMode === 'table' ? '#fff' : '#64748b',
                border: 'none', borderRadius: '10px', padding: '6px 14px',
                fontSize: '12.5px', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <TableIcon size={14} /> Table
            </button>

            <button
              onClick={() => setViewMode('cards')}
              style={{
                background: viewMode === 'cards' ? '#2563eb' : 'transparent',
                color: viewMode === 'cards' ? '#fff' : '#64748b',
                border: 'none', borderRadius: '10px', padding: '6px 14px',
                fontSize: '12.5px', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <LayoutGrid size={14} /> Cards
            </button>
          </div>

        </div>
      </div>

      {/* Counter text */}
      <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>
        Showing <strong>{filteredProjects.length}</strong> of <strong>{totalCount}</strong> projects
      </div>

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>PROJECT NAME ⇅</th>
                <th>CLIENT ⇅</th>
                <th>CATEGORY ⇅</th>
                <th>SALES OWNER ⇅</th>
                <th>PROJECT MANAGER ⇅</th>
                <th>DEVELOPER ASSIGNED ⇅</th>
                <th>START DATE ⇅</th>
                <th>EXPECTED DELIVERY ⇅</th>
                <th>STATUS ⇅</th>
                <th>PRIORITY ⇅</th>
                <th>PROGRESS ⇅</th>
                <th>DESCRIPTION</th>
                <th style={{ textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((prj, idx) => (
                <tr key={prj.id}>
                  <td style={{ color: 'var(--text-dim)', fontWeight: 600 }}>{idx + 1}</td>
                  
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
                      <strong style={{ fontSize: '13.5px', color: 'var(--ink)' }}>{prj.name}</strong>
                    </div>
                  </td>

                  <td style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>
                    {prj.client}
                  </td>

                  <td>
                    <span style={{
                      padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
                      background: prj.category === 'CRM' ? '#f3e8ff' : '#dbeafe',
                      color: prj.category === 'CRM' ? '#7c3aed' : '#1d4ed8'
                    }}>
                      {prj.category}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        S
                      </span>
                      <span>{prj.salesOwner}</span>
                    </div>
                  </td>

                  <td>
                    {prj.projectManager !== '—' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          A
                        </span>
                        <span>{prj.projectManager}</span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-dim)' }}>—</span>
                    )}
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        AP
                      </span>
                      <span>{prj.developerAssigned}</span>
                    </div>
                  </td>

                  <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>
                    {prj.startDate}
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: prj.isOverdue ? '#dc2626' : 'var(--ink)' }}>
                        {prj.expectedDelivery}
                      </span>
                      {prj.isOverdue && (
                        <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700,
                      background: '#dbeafe', color: '#1d4ed8', display: 'inline-flex', alignItems: 'center', gap: '4px'
                    }}>
                      {prj.status} <ChevronDown size={12} />
                    </span>
                  </td>

                  <td>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700,
                      background: prj.priority === 'High' ? '#fff7ed' : '#f0f9ff',
                      color: prj.priority === 'High' ? '#c2410c' : '#0369a1'
                    }}>
                      {prj.priority === 'High' ? '⚠️ High' : '~ Medium'}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '110px' }}>
                      <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${prj.progress}%`, height: '100%', background: prj.progress > 50 ? '#2563eb' : '#f97316' }}></div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink)' }}>{prj.progress}%</span>
                    </div>
                  </td>

                  <td style={{ fontSize: '12px', color: 'var(--text-dim)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {prj.description}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-sm btn-ghost" style={{ color: 'var(--text-dim)', padding: '4px 8px' }}>
                      <Edit3 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── CARDS VIEW ── */}
      {viewMode === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
          {filteredProjects.map(prj => (
            <div 
              key={prj.id} 
              className="vt-card" 
              style={{ padding: 0, overflow: 'hidden', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div style={{ padding: '20px' }}>
                {/* Header Pills */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }}></span> {prj.status}
                    </span>
                    {prj.isOverdue && (
                      <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '10px', border: '1px solid #fecaca' }}>
                        Overdue
                      </span>
                    )}
                    <span style={{ background: prj.priority === 'High' ? '#fff7ed' : '#f0f9ff', color: prj.priority === 'High' ? '#c2410c' : '#0369a1', fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px' }}>
                      {prj.priority === 'High' ? '⚠️ High' : '~ Medium'}
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>⋮</button>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px 0' }}>{prj.name}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={13} /> {prj.client}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Folder size={13} /> {prj.category}
                </div>

                {/* Team Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>A</span>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', fontSize: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>AP</span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '6px' }}>
                    <span>Progress</span>
                    <strong style={{ color: 'var(--ink)' }}>{prj.progress}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${prj.progress}%`, height: '100%', background: '#2563eb' }}></div>
                  </div>
                </div>

                {/* Dates */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block', fontSize: '10px', fontWeight: 700 }}>START</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{prj.startDate}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#ef4444', display: 'block', fontSize: '10px', fontWeight: 700 }}>DELIVERY</span>
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>{prj.expectedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Banner */}
              <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px 20px', fontSize: '12px', fontWeight: 800, textAlign: 'center', letterSpacing: '0.05em', borderTop: '1px solid #dbeafe' }}>
                IN PROGRESS
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD NEW PROJECT MODAL ── */}
      {isAddModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '540px', width: '90%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Create New Project</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                  Add a new client project to track deliverables & timelines.
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">PROJECT NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile App Redesign"
                  className="vt-input"
                  value={addForm.name}
                  onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">CLIENT NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Santosh R Pandey"
                  className="vt-input"
                  value={addForm.client}
                  onChange={e => setAddForm({ ...addForm, client: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">CATEGORY</label>
                  <select
                    className="vt-input"
                    value={addForm.category}
                    onChange={e => setAddForm({ ...addForm, category: e.target.value as any })}
                  >
                    <option value="CRM">CRM</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="vt-label">PRIORITY</label>
                  <select
                    className="vt-input"
                    value={addForm.priority}
                    onChange={e => setAddForm({ ...addForm, priority: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">SALES OWNER</label>
                  <input
                    type="text"
                    className="vt-input"
                    value={addForm.salesOwner}
                    onChange={e => setAddForm({ ...addForm, salesOwner: e.target.value })}
                  />
                </div>

                <div>
                  <label className="vt-label">DEVELOPER ASSIGNED</label>
                  <input
                    type="text"
                    className="vt-input"
                    value={addForm.developerAssigned}
                    onChange={e => setAddForm({ ...addForm, developerAssigned: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">START DATE</label>
                  <input
                    type="date"
                    className="vt-input"
                    value={addForm.startDate}
                    onChange={e => setAddForm({ ...addForm, startDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="vt-label">EXPECTED DELIVERY</label>
                  <input
                    type="date"
                    className="vt-input"
                    value={addForm.expectedDelivery}
                    onChange={e => setAddForm({ ...addForm, expectedDelivery: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="vt-label">DESCRIPTION</label>
                <textarea
                  rows={2}
                  placeholder="Project scope & details..."
                  className="vt-input"
                  style={{ height: 'auto', padding: '8px 12px' }}
                  value={addForm.description}
                  onChange={e => setAddForm({ ...addForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" style={{ background: '#2563eb', borderColor: '#2563eb', color: '#fff', padding: '10px 20px' }}>
                  Create Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
