'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Send, Hash } from 'lucide-react';

export default function WorkspacePage() {
  const { data, addChatMessage } = useApp();
  const [activeChannel, setActiveChannel] = useState('sales');
  const [inputText, setInputText] = useState('');

  const filteredMessages = data.workspace.messages.filter(m => m.channel === activeChannel);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addChatMessage(activeChannel, inputText);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 140px)' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/workspace" className="btn btn-sm btn-brass">Live Team Chat</Link>
      </div>

      <div className="vt-card" style={{ flex: 1, padding: 0, display: 'grid', gridTemplateColumns: '240px 1fr 220px', overflow: 'hidden' }}>
        <div style={{ background: 'var(--bg-soft)', borderRight: '1px solid var(--border)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
            CHANNELS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.workspace.channels.map(ch => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
                  borderRadius: '8px', border: 'none', background: activeChannel === ch ? 'var(--white)' : 'transparent',
                  color: activeChannel === ch ? 'var(--green-dark)' : 'var(--text)',
                  fontWeight: activeChannel === ch ? 700 : 500, fontSize: '13.5px', cursor: 'pointer'
                }}
              >
                <Hash size={15} color={activeChannel === ch ? 'var(--green-dark)' : 'var(--text-dim)'} />
                <span>{ch}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px' }}>
            <Hash size={18} color="var(--green)" /> #{activeChannel}
          </div>

          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredMessages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-tint)',
                  border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '13px', color: 'var(--green-dark)', flexShrink: 0
                }}>
                  {msg.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>{msg.sender}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '3px', background: 'var(--bg-soft)', padding: '8px 12px', borderRadius: '10px', display: 'inline-block', border: '1px solid var(--border)' }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="vt-input" 
              placeholder={`Message #${activeChannel}...`}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              style={{ borderRadius: '20px' }}
            />
            <button type="submit" className="btn btn-brass">
              <Send size={15} />
            </button>
          </form>
        </div>

        <div style={{ background: 'var(--bg-soft)', borderLeft: '1px solid var(--border)', padding: '16px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.08em', marginBottom: '12px' }}>
            MEMBERS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div>🟢 Rhea Nair (Admin)</div>
            <div>🟢 Dev Kulkarni</div>
            <div>🟢 Sana Merchant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
