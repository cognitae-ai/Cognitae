import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, ff, gId, exportData } from '../../lib/constants';
import { analyse } from '../../lib/engine';
import { db } from '../../lib/db';
import { Btn, Badge } from '../shared/UI';

export default function Analyst({ activeConvo, setActiveConvo }) {
    const [text, setText] = useState("");
    const [res, setRes] = useState(null);

    const runScan = () => {
        if (!text.trim()) return;
        setRes(analyse(text));
    };

    const saveToDb = async () => {
        if (!res) return;
        await db.sessions.add({
            id: gId(), type: 'Analysis', name: `Analysis: ${text.substring(0, 30)}...`,
            text, analysis: res, t: Date.now()
        });
        alert("Analysis saved to History.");
    };

    const navigate = useNavigate();

    if (activeConvo) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: ff }}>
                <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.sf }}>
                    <div>
                        <h2 style={{ fontSize: 16, fontWeight: 500, color: C.br, margin: '0 0 4px 0' }}>{activeConvo.name}</h2>
                        <div style={{ fontSize: 11, color: C.mu }}>{activeConvo.type} | {new Date(activeConvo.t).toLocaleString()} {activeConvo.model ? `| Target: ${activeConvo.model}` : ''} {activeConvo.grade && `| Grade: ${activeConvo.grade}`}</div>
                    </div>
                    <Btn onClick={() => setActiveConvo(null)} outline>Close Viewer</Btn>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 40, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ maxWidth: 800, width: '100%' }}>

                        {activeConvo.type === 'Audit Lab' && activeConvo.messages?.map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 24, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                                <div style={{ width: 28, height: 28, borderRadius: 4, background: m.role === 'user' ? C.sf : `linear-gradient(135deg,${C.cr}18,${C.ac}18)`, color: m.role === 'user' ? C.mu : C.cr, border: `1px solid ${m.role === 'user' ? C.bd : C.cr + '30'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold', flexShrink: 0 }}>{m.role === 'user' ? 'U' : 'E'}</div>
                                <div style={{ flex: 1, maxWidth: '85%' }}>
                                    <div style={{ background: C.sf, border: `1px solid ${C.bd}`, padding: 16, borderRadius: 6, fontSize: 12, color: C.tx, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.content}</div>
                                </div>
                            </div>
                        ))}

                        {activeConvo.type === 'Benchmark' && Object.keys(activeConvo.resps).map(k => (
                            <div key={k} style={{ marginBottom: 32, background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 6, overflow: 'hidden' }}>
                                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bd}`, background: C.bg, fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em' }}>Phase ID: {k}</div>
                                <div style={{ padding: 16 }}>

                                    {activeConvo.dynamicTexts?.[k] && (
                                        <div style={{ padding: '0 0 16px 0', marginBottom: 16, borderBottom: `1px dashed ${C.dm}` }}>
                                            <div style={{ fontSize: 10, color: C.ac, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '.1em' }}>Dynamic Adversarial Prompt:</div>
                                            <div style={{ fontSize: 11, color: C.br, lineHeight: 1.5 }}>{activeConvo.dynamicTexts[k]}</div>
                                        </div>
                                    )}

                                    <div style={{ fontSize: 10, color: C.dm, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '.1em' }}>Target Response:</div>
                                    <div style={{ fontSize: 12, color: C.tx, lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: activeConvo.anals?.[k] ? 24 : 0 }}>{activeConvo.resps[k]}</div>

                                    {activeConvo.anals?.[k] && (
                                        <div style={{ padding: 16, background: C.bg, borderLeft: `2px solid ${C.ac}`, borderRadius: 4 }}>
                                            <div style={{ fontSize: 10, color: C.ac, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '.1em' }}>Auditor Analysis:</div>
                                            <div style={{ fontSize: 11, color: C.br, lineHeight: 1.5, marginBottom: activeConvo.anals[k].findings?.length ? 12 : 0 }}>{activeConvo.anals[k].sv}</div>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {activeConvo.anals?.[k]?.findings?.map((f, i) => (
                                                    <div key={i} style={{ background: C.sf, border: `1px solid ${C.bd}`, padding: '4px 8px', borderRadius: 4, fontSize: 10, color: C.hi }}>{typeof f === 'string' ? f : f.pn}</div>
                                                ))}
                                            </div>
                                            {activeConvo.scores?.[k] !== undefined && (
                                                <div style={{ marginTop: 12, fontSize: 10, color: C.sa, fontWeight: 'bold' }}>Awarded Score: {activeConvo.scores[k]} / 5</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {activeConvo.type === 'Analysis' && (
                            <div style={{ background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 6, overflow: 'hidden' }}>
                                <div style={{ padding: 20, borderBottom: `1px solid ${C.bd}`, whiteSpace: 'pre-wrap', color: C.tx, fontSize: 12, lineHeight: 1.6 }}>
                                    {activeConvo.text}
                                </div>
                                {activeConvo.analysis && (
                                    <div style={{ padding: 20, background: C.bg }}>
                                        <div style={{ fontSize: 18, color: C.mo, fontWeight: 'bold', marginBottom: 16 }}>{activeConvo.analysis.sv}</div>
                                        {activeConvo.analysis.findings?.map((f, i) => (
                                            <div key={i} style={{ marginBottom: 8, background: C.sf, border: `1px solid ${C.bd}`, borderLeft: `2px solid ${f.col}`, padding: 12, borderRadius: 4, fontSize: 11, color: C.br }}>
                                                <strong>{f.pn}</strong>: {f.match}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    }

    if (!text.trim() && !res) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: ff, alignItems: 'center', justifyContent: 'center', padding: 40, overflowY: 'auto' }}>
                <div style={{ maxWidth: 800, width: '100%' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 300, color: C.br, marginBottom: 16 }}>Welcome to Expositor</h1>
                    <p style={{ fontSize: 14, color: C.mu, lineHeight: 1.6, marginBottom: 40, maxWidth: 600 }}>
                        Expositor is an adversarial testing workbench designed to evaluate Large Language Models against complex structural vulnerabilities.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
                        <div style={{ background: C.sf, border: `1px solid ${C.bd}`, padding: 20, borderRadius: 6 }}>
                            <div style={{ fontSize: 11, color: C.ac, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>The Target</div>
                            <div style={{ fontSize: 12, color: C.tx, lineHeight: 1.5 }}>The model under test. Exposed to adversarial conditions to measure compliance and resilience.</div>
                        </div>
                        <div style={{ background: C.sf, border: `1px solid ${C.bd}`, padding: 20, borderRadius: 6 }}>
                            <div style={{ fontSize: 11, color: C.cr, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>The Auditor</div>
                            <div style={{ fontSize: 12, color: C.tx, lineHeight: 1.5 }}>An evaluator intelligence that grades Target responses against the vulnerability taxonomy.</div>
                        </div>
                        <div style={{ background: C.sf, border: `1px solid ${C.bd}`, padding: 20, borderRadius: 6 }}>
                            <div style={{ fontSize: 11, color: C.mo, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>The Synthesizer</div>
                            <div style={{ fontSize: 12, color: C.tx, lineHeight: 1.5 }}>A creative generator that fabricates highly specific adversarial prompts and scenarios.</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <button onClick={() => navigate('/expositor/benchmark')} style={{ flex: 1, background: C.sa, color: '#000', border: 'none', padding: '16px 24px', borderRadius: 4, fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                            Run Vulnerability Benchmark
                        </button>
                        <button onClick={() => navigate('/expositor/lab')} style={{ flex: 1, background: 'transparent', color: C.br, border: `1px solid ${C.sa}`, padding: '16px 24px', borderRadius: 4, fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                            Start Free-form Audit
                        </button>
                    </div>

                    <div style={{ marginTop: 60, borderTop: `1px solid ${C.bd}`, paddingTop: 20 }}>
                        <div style={{ fontSize: 12, color: C.mu, marginBottom: 12 }}>Or paste a raw transcript below for static analysis:</div>
                        <textarea
                            value={text} onChange={e => setText(e.target.value)} placeholder="Paste raw conversation logs here..."
                            style={{ width: '100%', background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 4, padding: 16, fontFamily: ff, fontSize: 11, color: C.tx, lineHeight: 1.6, resize: 'vertical', minHeight: 120, outline: 'none', boxSizing: 'border-box' }}
                        />
                        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                            <Btn onClick={runScan} disabled={!text.trim()}>Run Static Scan</Btn>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: ff }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: 14, fontWeight: 500, color: C.br, margin: 0, letterSpacing: '-.02em' }}>Raw Analysis</h2>
                    <div style={{ fontSize: 10, color: C.mu }}>Pattern detection against raw conversational transcripts</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Btn onClick={runScan} disabled={!text.trim()}>Run Scan</Btn>
                    <Btn onClick={saveToDb} outline disabled={!res}>Save to History</Btn>
                    <Btn onClick={() => exportData(res, 'analysis-report.json')} outline disabled={!res}>Export JSON</Btn>
                    <Btn onClick={() => { setText(""); setRes(null) }} outline>Clear</Btn>
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: 20, borderRight: `1px solid ${C.bd}`, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 9, color: C.mu, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Target Transcript</div>
                    <textarea
                        value={text} onChange={e => setText(e.target.value)} placeholder="Paste raw conversation logs here..."
                        style={{ flex: 1, width: '100%', background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 4, padding: 16, fontFamily: ff, fontSize: 11, color: C.tx, lineHeight: 1.6, resize: 'none', outline: 'none' }}
                    />
                </div>
                <div style={{ width: 380, background: C.sf, overflowY: 'auto' }}>
                    {!res ? (
                        <div style={{ padding: '40px 20px', textAlign: 'center', color: C.dm, fontSize: 11 }}>
                            <div style={{ fontSize: 24, marginBottom: 8 }}>{">"}</div>
                            Awaiting generic input text...
                        </div>
                    ) : (
                        <div>
                            <div style={{ padding: '20px', borderBottom: `1px solid ${C.bd}` }}>
                                <div style={{ fontSize: 9, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Status</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div style={{ fontSize: 24, fontWeight: 300, color: res.sv === "CRITICAL" ? C.cr : res.sv === "HIGH" ? C.hi : res.sv === "MODERATE" ? C.mo : res.sv === "LOW" ? C.lo : C.sa }}>{res.sv}</div>
                                    <div style={{ fontSize: 10, color: C.mu }}>P-Score: {res.os.toFixed(2)}</div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', borderBottom: `1px solid ${C.bd}` }}>
                                <div style={{ fontSize: 9, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Structural Indicators</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.br, marginBottom: 6 }}><span>Hedge Ratio</span><span>{res.structural.hedgeRatio}</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.br, marginBottom: 6 }}><span>Friction Coeff</span><span>{res.structural.frictionCoeff}</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.br }}><span>Length</span><span>{res.structural.totalTurns} turns</span></div>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ fontSize: 9, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Pattern Signatures ({res.findings.length})</div>
                                {res.findings.length === 0 && <div style={{ fontSize: 10, color: C.dm, fontStyle: 'italic' }}>No signatures detected in log.</div>}
                                {res.findings.map((f, i) => (
                                    <div key={i} style={{ background: C.bg, border: `1px solid ${C.bd}`, borderLeft: `2px solid ${f.col}`, borderRadius: 4, padding: '10px 12px', marginBottom: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                            <span style={{ fontSize: 10, fontWeight: 600, color: f.col }}>{f.pid}</span>
                                            <span style={{ fontSize: 9, color: C.mu }}>{f.grp}</span>
                                        </div>
                                        <div style={{ fontSize: 10, color: C.br, marginBottom: 4, fontWeight: 500 }}>{f.pn}</div>
                                        <div style={{ fontSize: 9, color: C.mu, fontStyle: 'italic', marginBottom: 8, lineHeight: 1.4 }}>{f.desc}</div>
                                        <div style={{ fontSize: 9, color: C.br, background: C.sf, padding: '4px 6px', borderRadius: 2, fontFamily: 'monospace' }}>"{f.match}"</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
