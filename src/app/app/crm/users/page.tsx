'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Search, Edit3, Trash2, X, RefreshCw, CheckCircle2, AlertCircle, Plus, Sparkles
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface UserItem {
  id: number;
  user_name: string;
  mobile_number: string;
  email: string;
  company_name: string;
  service_needed?: string;
  created_at: string;
  trial_ends_at?: string;
  trial_status?: string;
  days_left?: number;
}

export default function CRMRegisteredUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    user_name: '',
    mobile_number: '',
    email: '',
    company_name: '',
    service_needed: 'Full Business Suite'
  });
  const [addError, setAddError] = useState('');
  const [savingAdd, setSavingAdd] = useState(false);

  // Edit Modal State
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editForm, setEditForm] = useState({
    user_name: '',
    mobile_number: '',
    email: '',
    company_name: '',
    service_needed: 'Full Business Suite'
  });
  const [editError, setEditError] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete Confirmation State
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      try {
        res = await fetchApi('/api/users');
      } catch (e) {
        res = null;
      }
      let fetchedList: UserItem[] = [];
      if (res) {
        try {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.users)) {
            fetchedList = data.users;
          }
        } catch (e) {}
      }
      
      // Merge active session user from localStorage if not already in MySQL list
      try {
        const stored = localStorage.getItem('vt_active_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email && !fetchedList.some(u => u.email === parsed.email)) {
            fetchedList.unshift({
              id: parsed.id || Date.now(),
              user_name: parsed.user_name || parsed.name || 'Active User',
              mobile_number: parsed.mobile_number || parsed.phone || 'N/A',
              email: parsed.email,
              company_name: parsed.company_name || parsed.company || 'Active Business',
              service_needed: parsed.service_needed || 'Full Business Suite',
              created_at: parsed.created_at || new Date().toISOString(),
              trial_status: 'active',
              days_left: 7
            });
          }
        }
      } catch (e) {}

      setUsers(fetchedList);
    } catch (err) {
      setError('Unable to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpgradeUser = async (u: UserItem) => {
    try {
      const res = await fetchApi(`/api/users/${u.id}/upgrade`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`User ${u.user_name} upgraded to Premium successfully!`);
        setTimeout(() => setSuccessMsg(''), 4000);
        fetchUsers();
      }
    } catch (e) {
      alert('Failed to upgrade user.');
    }
  };

  const handleTriggerReminders = async () => {
    try {
      const res = await fetchApi('/api/users/check-trials');
      const data = await res.json();
      if (data.success) {
        const count = data.remindersSent ? data.remindersSent.length : 0;
        setSuccessMsg(`📧 Trial Reminder Check Complete: Triggered ${count} email notification(s).`);
        setTimeout(() => setSuccessMsg(''), 5000);
        fetchUsers();
      }
    } catch (e) {
      alert('Failed to trigger reminder check.');
    }
  };

  const handleSendTestEmail = async (emailAddr: string) => {
    try {
      const res = await fetchApi('/api/users/send-test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: emailAddr })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`📩 Email dispatched successfully to ${emailAddr}! Check your inbox.`);
        setTimeout(() => setSuccessMsg(''), 6000);
      }
    } catch (e) {
      alert('Failed to send test email.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.user_name.toLowerCase().includes(term) ||
      u.mobile_number.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.company_name.toLowerCase().includes(term)
    );
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setSavingAdd(true);

    try {
      const res = await fetchApi('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        data = { message: 'Server returned non-JSON response.' };
      }

      if (res.ok && data.success) {
        setSuccessMsg(`✅ User "${addForm.user_name}" created successfully in MySQL database!`);
        setTimeout(() => setSuccessMsg(''), 5000);
        setIsAddUserModalOpen(false);
        setAddForm({
          user_name: '',
          mobile_number: '',
          email: '',
          company_name: '',
          service_needed: 'Full Business Suite'
        });
        fetchUsers();
      } else {
        setAddError(data.message || 'Failed to create user.');
      }
    } catch (err: any) {
      setAddError(err?.message || 'Unable to create user. Please check your connection.');
    } finally {
      setSavingAdd(false);
    }
  };

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setEditForm({
      user_name: u.user_name,
      mobile_number: u.mobile_number,
      email: u.email,
      company_name: u.company_name,
      service_needed: u.service_needed || 'Full Business Suite'
    });
    setEditError('');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditError('');
    setSavingEdit(true);

    try {
      const res = await fetchApi(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`User ${editForm.user_name} updated successfully.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        setEditingUser(null);
        fetchUsers();
      } else {
        setEditError(data.message || 'Failed to update user.');
      }
    } catch (err) {
      setEditError('Unable to update user. Please try again.');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    setDeleting(true);

    try {
      const res = await fetchApi(`/api/users/${deletingUser.id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`User deleted successfully.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        setDeletingUser(null);
        fetchUsers();
      } else {
        alert(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      alert('Unable to delete user. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* CRM SUB NAVIGATION */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-brass">Registered Users ({users.length})</Link>
      </div>

      {/* HEADER & ALERTS */}
      {successMsg && (
        <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '12px', padding: '14px 18px', color: 'var(--green-dark)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} color="var(--green-dark)" />
          {successMsg}
        </div>
      )}

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', color: '#991b1b', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} color="#991b1b" />
          {error}
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="vt-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search registered users by name, mobile, email, or company..."
            className="vt-input"
            style={{ paddingLeft: '34px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={handleTriggerReminders} className="btn btn-secondary btn-sm" title="Check trial expirations and send 1-2 day email reminders">
            <Sparkles size={14} color="var(--green-dark)" /> Trigger Reminders
          </button>
          <button onClick={fetchUsers} className="btn btn-secondary btn-sm" disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh DB
          </button>
          <button onClick={() => setIsAddUserModalOpen(true)} className="btn btn-brass btn-sm">
            <Plus size={15} /> Add User
          </button>
        </div>
      </div>

      {/* FULL USER DATA TABLE */}
      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER NAME</th>
              <th>MOBILE NUMBER</th>
              <th>EMAIL ADDRESS</th>
              <th>COMPANY NAME</th>
              <th>SERVICE NEEDED</th>
              <th>TRIAL END DATE</th>
              <th>STATUS</th>
              <th>REGISTRATION DATE</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>
                  Loading database users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>
                  {searchTerm ? 'No registered users match your search.' : 'No registered users in database.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const daysLeft = u.days_left !== undefined ? Number(u.days_left) : 7;
                const isPremium = u.trial_status === 'premium';
                const isExpired = daysLeft <= 0 && !isPremium;
                const isWarning = daysLeft <= 2 && daysLeft > 0 && !isPremium;

                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700, color: 'var(--green-dark)' }}>#{u.id}</td>
                    <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{u.user_name}</td>
                    <td style={{ fontWeight: 600 }}>{u.mobile_number}</td>
                    <td style={{ fontWeight: 600 }}>{u.email}</td>
                    <td>{u.company_name}</td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: '11.5px', fontWeight: 700 }}>
                        {u.service_needed || 'full_suite'}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                      {u.trial_ends_at ? new Date(u.trial_ends_at).toLocaleDateString() : '7 Days'}
                    </td>
                    <td>
                      {isPremium ? (
                        <span className="badge badge-amber" style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Sparkles size={12} color="#d97706" /> Premium
                        </span>
                      ) : isExpired ? (
                        <span className="badge badge-orange" style={{ fontSize: '11px', color: '#dc2626' }}>
                          Expired
                        </span>
                      ) : isWarning ? (
                        <span className="badge badge-orange" style={{ fontSize: '11px' }}>
                          {daysLeft} Day{daysLeft === 1 ? '' : 's'} Left
                        </span>
                      ) : (
                        <span className="badge badge-green" style={{ fontSize: '11px' }}>
                          {daysLeft} Days Left
                        </span>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '12.5px' }}>
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'center' }}>
                        {!isPremium && (
                          <button
                            onClick={() => handleUpgradeUser(u)}
                            className="btn btn-sm btn-ghost"
                            style={{ color: '#d97706', padding: '4px 8px', fontSize: '12px', fontWeight: 700 }}
                          >
                            Upgrade
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="btn btn-sm btn-ghost"
                          style={{ color: 'var(--green-dark)', padding: '4px 8px', fontSize: '12px' }}
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => setDeletingUser(u)}
                          className="btn btn-sm btn-ghost"
                          style={{ color: '#ef4444', padding: '4px 8px', fontSize: '12px' }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Add New Registered User (MySQL)</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {addError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', color: '#991b1b', fontSize: '13.5px', marginBottom: '16px' }}>
                {addError}
              </div>
            )}

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">User Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="vt-input"
                  value={addForm.user_name}
                  onChange={(e) => setAddForm({ ...addForm, user_name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className="vt-input"
                  value={addForm.mobile_number}
                  onChange={(e) => setAddForm({ ...addForm, mobile_number: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  className="vt-input"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Tech Innovations"
                  className="vt-input"
                  value={addForm.company_name}
                  onChange={(e) => setAddForm({ ...addForm, company_name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Service Needed / Module</label>
                <select
                  className="vt-input"
                  value={addForm.service_needed}
                  onChange={(e) => setAddForm({ ...addForm, service_needed: e.target.value })}
                >
                  <option value="Full Business Suite">Full Business Suite (All Modules)</option>
                  <option value="CRM & Sales">CRM & Sales</option>
                  <option value="HR & Payroll">HR & Payroll</option>
                  <option value="Projects">Projects</option>
                  <option value="Finance">Finance</option>
                  <option value="Workspace">Workspace</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddUserModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" disabled={savingAdd}>
                  {savingAdd ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Edit Registered User</h3>
              <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {editError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', color: '#991b1b', fontSize: '13.5px', marginBottom: '16px' }}>
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">User Name *</label>
                <input
                  type="text"
                  required
                  className="vt-input"
                  value={editForm.user_name}
                  onChange={(e) => setEditForm({ ...editForm, user_name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  className="vt-input"
                  value={editForm.mobile_number}
                  onChange={(e) => setEditForm({ ...editForm, mobile_number: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="vt-input"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Company Name *</label>
                <input
                  type="text"
                  required
                  className="vt-input"
                  value={editForm.company_name}
                  onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Service Needed / Module</label>
                <select
                  className="vt-input"
                  value={editForm.service_needed}
                  onChange={(e) => setEditForm({ ...editForm, service_needed: e.target.value })}
                >
                  <option value="Full Business Suite">Full Business Suite (All Modules)</option>
                  <option value="CRM & Sales">CRM & Sales</option>
                  <option value="HR & Payroll">HR & Payroll</option>
                  <option value="Projects">Projects</option>
                  <option value="Finance">Finance</option>
                  <option value="Workspace">Workspace</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" disabled={savingEdit}>
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingUser && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
              <Trash2 size={22} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
              Delete User Record?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginBottom: '20px' }}>
              Are you sure you want to delete <strong>{deletingUser.user_name}</strong> ({deletingUser.email}) from MySQL database?
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setDeletingUser(null)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={handleDeleteUser} disabled={deleting} style={{ background: '#ef4444', color: '#fff', flex: 1 }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
