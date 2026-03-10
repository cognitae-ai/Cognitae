import React, { useState, useRef, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { C, ff, gId } from '../../lib/constants';
import { db } from '../../lib/db';
import { Btn, Badge, Tooltip } from '../shared/UI';
import yaml from 'js-yaml';

export default function CognitaeCommand({ cognitaeState }) {
    const s = cognitaeState?.current || {};

    // Core state hoisted to keep chat alive when changing tabs
    const [messages, setMessages] = useState(s.messages || []);
    const [input, setInput] = useState(s.input || "");
    const [activePersona, setActivePersona] = useState(s.persona || "Locus");
    const [turn, setTurn] = useState(s.turn || "user"); // 'user' or 'assistant'
    const [activeLogId, setActiveLogId] = useState(s.activeLogId || null);
    const [filterPersona, setFilterPersona] = useState("All");

    const bottomRef = useRef(null);

    // Sync to parent ref on change
    useEffect(() => {
        if (cognitaeState) {
            cognitaeState.current = { messages, input, persona: activePersona, turn, activeLogId };
        }
    }, [messages, input, activePersona, turn, activeLogId, cognitaeState]);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages]);

    // Auto-save logic
    useEffect(() => {
        const autoSave = async () => {
            if (messages.length === 0) return;
            // If new session (first message)
            if (!activeLogId && messages.length === 1) {
                const title = messages[0].content.substring(0, 25) + (messages[0].content.length > 25 ? '...' : '');
                try {
                    const id = await db.cognitae_logs.add({
                        name: title,
                        persona: activePersona,
                        timestamp: Date.now(),
                        messages: messages
                    });
                    setActiveLogId(id);
                } catch (err) { console.error("Auto-save failed", err); }
            }
            // If existing session, auto-update messages array
            else if (activeLogId) {
                try {
                    await db.cognitae_logs.update(activeLogId, { messages: messages });
                } catch (err) { console.error("Auto-update failed", err); }
            }
        };
        autoSave();
    }, [messages, activeLogId, activePersona]);

    // Load History from IndexedDB
    const allLogs = useLiveQuery(() => db.cognitae_logs.orderBy('timestamp').reverse().toArray()) || [];
    const logs = filterPersona === "All" ? allLogs : allLogs.filter(l => l.persona === filterPersona);

    const personas = [
        { id: 'Threadglass', name: 'Threadglass', color: '#06b6d4', link: 'https://gemini.google.com/gem/1N6l93pFwbSvKSKMssGFHyl2ZbIhx8uoL?usp=sharing' },
        { id: 'Virel', name: 'Virel', color: C.lo, link: 'https://gemini.google.com/gem/7fa7200256fa?usp=sharing' },
        { id: 'Vigil', name: 'Vigil', color: C.mo, link: 'https://gemini.google.com/gem/1cjDGsCNCS6zMbDDOls-b2GRLF131xYqp?usp=sharing' },
        { id: 'Locus', name: 'Locus', color: C.cr, link: 'https://gemini.google.com/gem/1aJuD_D6xHFZg7dlF_JWuBgndd8iBJCq0?usp=sharing' },
        { id: 'Mediatrix', name: 'Mediatrix', color: '#a855f7', link: 'https://gemini.google.com/gem/1750udwGpv0Qb3z3TGPDWwX1V_vOtGmd6?usp=sharing' }
    ];

    const pDef = personas.find(p => p.id === activePersona) || personas[0];

    const sendManual = () => {
        const txt = input.trim();
        if (!txt) return;
        setInput("");

        if (turn === 'user') {
            setMessages([...messages, { role: "user", content: txt, id: gId(), t: Date.now() }]);
            setTurn('assistant');
        } else {
            setMessages([...messages, { role: "assistant", content: txt, id: gId(), t: Date.now(), annotations: [] }]);
            setTurn('user');
        }
    };

    const extractManifest = (str) => {
        const ymlMatch = str.match(/```yaml\n([\s\S]*?)\n```/);
        if (!ymlMatch) return { text: str, data: null };
        try {
            const data = yaml.load(ymlMatch[1]);
            const text = str.replace(ymlMatch[0], '').trim();
            return { text, data };
        } catch (e) {
            return { text: str, data: null };
        }
    };

    const toggleAnnotation = (id) => {
        setMessages(messages.map(m => {
            if (m.id === id) return { ...m, isAnnotating: !m.isAnnotating, draftAnnotation: "", draftType: "Observation", draftCustomTitle: "", draftColor: C.ac };
            return m;
        }));
    };

    const saveAnnotation = (id) => {
        setMessages(messages.map(m => {
            if (m.id === id && m.draftAnnotation?.trim()) {
                const isCustom = m.draftType === "Custom";
                const annType = isCustom && m.draftCustomTitle?.trim() ? m.draftCustomTitle.trim() : (m.draftType || "Observation");
                const annColor = isCustom ? (m.draftColor || C.ac) : null;
                const newAnn = { id: gId(), type: annType, text: m.draftAnnotation.trim(), timestamp: Date.now(), color: annColor };
                const updatedAnnotations = m.annotations ? [...m.annotations, newAnn] : [newAnn];
                return { ...m, annotations: updatedAnnotations, isAnnotating: false, draftAnnotation: "", draftType: "Observation", draftCustomTitle: "", draftColor: C.ac };
            }
            return m;
        }));
    };

    const deleteAnnotation = (msgId, annId) => {
        setMessages(messages.map(m => {
            if (m.id === msgId && m.annotations) {
                return { ...m, annotations: m.annotations.filter(a => a.id !== annId) };
            }
            return m;
        }));
    };

    const startNewSession = () => {
        if (!window.confirm("Start a new session? This will clear the current view.")) return;
        setMessages([]);
        setInput("");
        setTurn("user");
        setActiveLogId(null);
    };

    const loadSession = (log) => {
        if (messages.length > 0 && !activeLogId && !window.confirm("Discard unsaved session?")) return;
        setActiveLogId(log.id);
        setActivePersona(log.persona);
        setMessages(log.messages || []);
        setTurn("user");
    };

    const deleteSession = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Delete this saved Cognitae session permanently?")) {
            await db.cognitae_logs.delete(Number(id));
            if (activeLogId === id) {
                setMessages([]);
                setInput("");
                setTurn("user");
                setActiveLogId(null);
            }
        }
    };

    const renameSession = async () => {
        if (!activeLogId) return;
        const existing = allLogs.find(l => l.id === activeLogId);
        if (!existing) return;

        const newName = prompt("Rename this session:", existing.name);
        if (newName && newName.trim()) {
            await db.cognitae_logs.update(activeLogId, { name: newName.trim() });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg }}>
            {/* Header */}
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <div>
                    <h2 style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, color: C.br, margin: 0, letterSpacing: '-.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>👁️</span> Cognitae Command
                    </h2>
                    <div style={{ fontFamily: ff, fontSize: 10, color: C.mu }}>Manual log tracking for Google Gem communications</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Btn onClick={renameSession} disabled={!activeLogId} style={{ background: C.sf, color: C.br, border: `1px solid ${C.dm}` }}>
                        Rename Session
                    </Btn>
                    <Btn onClick={startNewSession} outline>Clear / New</Btn>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Fixed History Sidebar */}
                <div style={{ width: 280, borderRight: `1px solid ${C.bd}`, background: C.sf, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bd}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Btn onClick={startNewSession} style={{ width: '100%', padding: '8px', background: C.bg, border: `1px dashed ${C.dm}`, color: C.br }}>+ New Session</Btn>
                        <select
                            value={filterPersona}
                            onChange={e => setFilterPersona(e.target.value)}
                            style={{ background: C.bg, color: C.tx, border: `1px solid ${C.dm}`, padding: '6px 8px', borderRadius: 4, fontFamily: ff, fontSize: 10, outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="All">Filter by Persona: All</option>
                            {personas.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
                        {logs.length === 0 ? (
                            <div style={{ padding: 20, textAlign: 'center', color: C.mu, fontSize: 10, fontFamily: ff }}>No saved sessions yet.</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {logs.map(log => {
                                    const isActive = activeLogId === log.id;
                                    const pd = personas.find(p => p.id === log.persona) || personas[0];
                                    return (
                                        <div
                                            key={log.id}
                                            onClick={() => loadSession(log)}
                                            style={{
                                                padding: '10px 12px', borderRadius: 6, cursor: 'pointer', fontFamily: ff,
                                                background: isActive ? C.bd : 'transparent',
                                                border: isActive ? `1px solid ${pd.color}40` : '1px solid transparent',
                                                display: 'flex', flexDirection: 'column', gap: 6
                                            }}
                                            onMouseEnter={e => !isActive && (e.currentTarget.style.background = C.bg)}
                                            onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ fontSize: 11, color: isActive ? C.br : C.tx, fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {log.name || `Session ${log.id}`}
                                                </div>
                                                <button onClick={(e) => deleteSession(log.id, e)} style={{ background: 'transparent', border: 'none', color: C.mu, cursor: 'pointer', fontSize: 12, opacity: 0.6 }}>×</button>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: pd.color }}>
                                                    {pd.name}
                                                </div>
                                                <div style={{ fontSize: 9, color: C.dm }}>{new Date(log.timestamp).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Interface */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.bg, minWidth: 0 }}>

                    {/* Persona Tabs */}
                    <div style={{ padding: '0 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', gap: 8, background: C.bg, paddingTop: 12 }}>
                        {personas.map(p => (
                            <button
                                key={p.id}
                                onClick={() => {
                                    if (messages.length > 0 && activePersona !== p.id && !window.confirm(`Switching personas will discard current session unless saved. Proceed?`)) return;
                                    setActivePersona(p.id);
                                    if (activePersona !== p.id) {
                                        setMessages([]);
                                        setActiveLogId(null);
                                    }
                                }}
                                style={{
                                    padding: '8px 16px', borderRadius: '6px 6px 0 0', border: 'none', fontFamily: ff, fontSize: 10, cursor: 'pointer', transition: 'all 0.2s',
                                    background: activePersona === p.id ? C.sf : 'transparent',
                                    color: activePersona === p.id ? C.br : C.mu,
                                    borderTop: activePersona === p.id ? `2px solid ${p.color}` : '2px solid transparent',
                                    borderLeft: activePersona === p.id ? `1px solid ${C.bd}` : '1px solid transparent',
                                    borderRight: activePersona === p.id ? `1px solid ${C.bd}` : '1px solid transparent',
                                    display: 'flex', alignItems: 'center', gap: 6, fontWeight: activePersona === p.id ? 600 : 400
                                }}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        <div style={{ maxWidth: 800, margin: '0 auto' }}>
                            {messages.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: ff, fontSize: 13, background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 8, marginTop: 40 }}>
                                    <p style={{ color: C.br, marginBottom: 12 }}>You are tracking a manual conversation with <strong>{pDef.name}</strong>.</p>
                                    <p style={{ color: C.mu, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                                        Use this interface to paste prompts and responses sequentially from your Google Gem session. This matches the Manual Mode interface of the Audit Lab for familiar consistency.
                                    </p>
                                    <div style={{ marginTop: 24 }}>
                                        <a href={pDef.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '8px 16px', background: `${pDef.color}20`, border: `1px solid ${pDef.color}40`, color: pDef.color, borderRadius: 6, textDecoration: 'none', fontSize: 11, fontWeight: 500, transition: 'all 0.2s' }}>
                                            Open {pDef.name} Gem →
                                        </a>
                                    </div>
                                    <div style={{ marginTop: 40, fontSize: 11, color: C.dm, textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center' }}>
                                        Awaiting Input...
                                    </div>
                                </div>
                            )}
                            {messages.map((m, idx) => {
                                const isAI = m.role === 'assistant';
                                const { text, data } = isAI ? extractManifest(m.content) : { text: m.content, data: null };

                                return (
                                    <div key={m.id} style={{ marginBottom: 24, display: 'flex', flexDirection: m.role === "user" ? 'row-reverse' : 'row', gap: 12 }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: 4, flexShrink: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: ff, fontSize: 10, fontWeight: 700,
                                            background: m.role === 'user' ? C.sf : `linear-gradient(135deg, ${pDef.color}18, ${pDef.color}30)`,
                                            color: m.role === 'user' ? C.mu : pDef.color, border: `1px solid ${m.role === 'user' ? C.bd : pDef.color + '28'}`
                                        }}>
                                            {m.role === 'user' ? 'U' : pDef.name.substring(0, 1)}
                                        </div>
                                        <div style={{ flex: 1, maxWidth: '85%' }}>
                                            <div style={{
                                                background: m.role === 'user' ? C.sf : 'transparent',
                                                border: m.role === 'user' ? `1px solid ${C.bd}` : 'none',
                                                borderRadius: 6, padding: m.role === 'user' ? '10px 14px' : '0 4px',
                                                fontFamily: ff, fontSize: 11, color: C.br, lineHeight: 1.6, whiteSpace: 'pre-wrap'
                                            }}>
                                                {text}
                                            </div>

                                            {data && (
                                                <div style={{ marginTop: 12, padding: 12, background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 6, borderLeft: `2px solid ${pDef.color}` }}>
                                                    <div style={{ fontSize: 9, color: pDef.color, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        Live Telemetry
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                                                        {Object.entries(data).map(([k, v]) => (
                                                            <div key={k} style={{ background: C.bg, padding: '6px 10px', borderRadius: 4, border: `1px solid ${C.dm}` }}>
                                                                <div style={{ fontSize: 9, color: C.mu, textTransform: 'capitalize', marginBottom: 2 }}>{k.replace(/_/g, ' ')}</div>
                                                                <div style={{ fontSize: 11, color: C.br, fontFamily: ff }}>{typeof v === 'object' ? JSON.stringify(v) : String(v)}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {isAI && (
                                                <div style={{ marginTop: 8 }}>
                                                    {m.annotations && m.annotations.length > 0 && (
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                                                            {m.annotations.map(ann => {
                                                                const annColor = ann.color || (ann.type === 'Deviation' ? C.rd : ann.type === 'Constraint Dropped' ? C.or : C.ac);
                                                                return (
                                                                    <div key={ann.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#1e293b40', padding: '8px 12px', borderRadius: 4, borderLeft: `2px solid ${annColor}` }}>
                                                                        <div style={{ flex: 1 }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                                                                <span style={{ fontSize: 9, color: annColor, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600 }}>{ann.type}</span>
                                                                                <span style={{ fontSize: 8, color: C.dm }}>{new Date(ann.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                            </div>
                                                                            <div style={{ fontSize: 11, color: C.tx, fontFamily: ff, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>{ann.text}</div>
                                                                        </div>
                                                                        <button onClick={() => deleteAnnotation(m.id, ann.id)} style={{ background: 'none', border: 'none', color: C.mu, cursor: 'pointer', fontSize: 12, padding: 2, opacity: 0.6 }}>×</button>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {!m.isAnnotating ? (
                                                        <button onClick={() => toggleAnnotation(m.id)} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', color: C.mu, fontSize: 10, cursor: 'pointer', fontFamily: ff, padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                            <span style={{ fontSize: 12 }}>+</span> Add Annotation
                                                        </button>
                                                    ) : (
                                                        <div style={{ marginTop: 4, background: '#1e293b80', border: `1px dashed ${C.ac}40`, borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                                    <span style={{ fontSize: 9, color: C.ac, textTransform: 'uppercase', letterSpacing: '.05em' }}>New Annotation</span>
                                                                    <select
                                                                        value={m.draftType || "Observation"}
                                                                        onChange={e => setMessages(messages.map(msg => msg.id === m.id ? { ...msg, draftType: e.target.value } : msg))}
                                                                        style={{ background: C.bg, color: C.tx, border: `1px solid ${C.dm}`, borderRadius: 4, fontSize: 10, padding: '2px 4px', outline: 'none', cursor: 'pointer' }}
                                                                    >
                                                                        <option value="Observation">Observation</option>
                                                                        <option value="Deviation">Deviation</option>
                                                                        <option value="Constraint Dropped">Constraint Dropped</option>
                                                                        <option value="Hallucination">Hallucination</option>
                                                                        <option value="Custom">Custom...</option>
                                                                    </select>
                                                                    {m.draftType === 'Custom' && (
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                            <input
                                                                                value={m.draftCustomTitle || ""}
                                                                                onChange={e => setMessages(messages.map(msg => msg.id === m.id ? { ...msg, draftCustomTitle: e.target.value } : msg))}
                                                                                placeholder="Custom Title"
                                                                                style={{ width: 120, background: C.bg, color: C.tx, border: `1px solid ${C.dm}`, borderRadius: 4, fontSize: 10, padding: '3px 6px', outline: 'none' }}
                                                                            />
                                                                            <input
                                                                                type="color"
                                                                                value={m.draftColor || C.ac}
                                                                                onChange={e => setMessages(messages.map(msg => msg.id === m.id ? { ...msg, draftColor: e.target.value } : msg))}
                                                                                style={{ width: 24, height: 24, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <button onClick={() => toggleAnnotation(m.id)} style={{ background: 'none', border: 'none', color: C.mu, fontSize: 10, cursor: 'pointer' }}>Cancel</button>
                                                            </div>
                                                            <textarea
                                                                value={m.draftAnnotation || ""}
                                                                onChange={e => setMessages(messages.map(msg => msg.id === m.id ? { ...msg, draftAnnotation: e.target.value } : msg))}
                                                                placeholder="Record analyst observations for this specific turn..."
                                                                style={{ width: '100%', background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 4, padding: 8, fontFamily: ff, fontSize: 11, color: C.tx, resize: 'vertical', minHeight: 60, outline: 'none' }}
                                                            />
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Btn small onClick={() => saveAnnotation(m.id)} disabled={!m.draftAnnotation?.trim()} style={{ background: C.ac, color: '#000' }}>Save</Btn>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={bottomRef} />
                        </div>
                    </div>

                    <div style={{ padding: '20px', borderTop: `1px solid ${C.bd}`, background: C.bg }}>
                        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <Badge text={turn === 'user' ? "Your Turn" : "AI's Turn"} color={turn === 'user' ? C.ac : pDef.color} />
                                    <span style={{ fontSize: 11, color: C.mu, display: 'flex', alignItems: 'center' }}>
                                        {turn === 'user' ? "Paste the prompt you sent to the Gem." : `Paste the raw Markdown/YAML response from ${pDef.name} here.`}
                                    </span>
                                </div>
                                <Btn outline small onClick={() => setTurn(turn === 'user' ? 'assistant' : 'user')}>Force Switch Turn</Btn>
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                                <textarea
                                    value={input} onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendManual();
                                        }
                                    }}
                                    placeholder={turn === 'assistant' ? "Paste raw AI response here..." : "Input user prompt..."}
                                    style={{ flex: 1, background: C.sf, border: `1px solid ${turn === 'assistant' ? pDef.color : C.bd}`, borderRadius: 4, padding: '12px 14px', fontFamily: ff, fontSize: 11, color: C.tx, lineHeight: 1.5, resize: 'none', outline: 'none' }}
                                    rows={3}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <Btn onClick={sendManual} disabled={!input.trim()} style={{ background: turn === 'assistant' ? pDef.color : C.ac, color: '#000' }}>
                                        {turn === 'user' ? "Add Prompt" : "Submit AI Response"}
                                    </Btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
