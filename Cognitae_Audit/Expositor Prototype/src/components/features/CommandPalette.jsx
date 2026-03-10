import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, ff } from '../../lib/constants';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(o => !o);
                setQuery("");
                setActiveIndex(0);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    // Define commands
    const allCommands = [
        { id: 'benchmark', label: 'Run Vulnerability Benchmark', route: '/expositor/benchmark' },
        { id: 'audit', label: 'Start Free-form Audit', route: '/expositor/lab' },
        { id: 'analyst', label: 'Go to Analyst Dashboard', route: '/expositor/analyst' },
        { id: 'taxonomy', label: 'Edit Vulnerability Taxonomy', route: '/expositor/taxonomy' },
        { id: 'config', label: 'Configure Agent Personas', route: '/expositor/agencies' },
        { id: 'settings', label: 'Preferences & Settings', route: '/expositor/settings' },
        { id: 'history', label: 'View Session History', route: '/expositor/analyst' }
    ];

    const commands = allCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    const executeCommand = (cmd) => {
        if (cmd.route) navigate(cmd.route);
        else if (cmd.action) cmd.action();
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', paddingTop: '15vh', backdropFilter: 'blur(2px)' }} onClick={() => setOpen(false)}>
            <div style={{ width: 600, background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 8, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ color: C.mu, fontSize: 16 }}>{">"}</div>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => (i + 1) % commands.length); }
                            if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => (i - 1 + commands.length) % commands.length); }
                            if (e.key === 'Enter' && commands[activeIndex]) { e.preventDefault(); executeCommand(commands[activeIndex]); }
                        }}
                        placeholder="Type a command or search..."
                        style={{ flex: 1, background: 'transparent', border: 'none', color: C.br, fontFamily: ff, fontSize: 16, outline: 'none' }}
                    />
                </div>
                <div style={{ maxHeight: 400, overflowY: 'auto', padding: 8 }}>
                    {commands.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: C.dm, fontSize: 12, fontFamily: ff }}>No commands found.</div>}
                    {commands.map((cmd, i) => (
                        <div
                            key={cmd.id}
                            onClick={() => executeCommand(cmd)}
                            onMouseEnter={() => setActiveIndex(i)}
                            style={{ padding: '12px 16px', background: activeIndex === i ? C.sf : 'transparent', color: activeIndex === i ? C.ac : C.tx, borderRadius: 4, cursor: 'pointer', fontFamily: ff, fontSize: 12, display: 'flex', alignItems: 'center', gap: 12 }}
                        >
                            <span style={{ color: activeIndex === i ? C.ac : C.dm }}>{cmd.route ? '→' : '◇'}</span>
                            {cmd.label}
                        </div>
                    ))}
                </div>
                <div style={{ padding: '8px 16px', background: C.sf, borderTop: `1px solid ${C.bd}`, fontSize: 9, color: C.dm, fontFamily: ff, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Use ↑/↓ arrows to navigate, Enter to select</span>
                    <span>Esc to close</span>
                </div>
            </div>
        </div>
    );
}
