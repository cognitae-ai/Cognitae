import React, { useState } from 'react';
import { C, ff } from '../../lib/constants';
import { useTaxonomy } from '../../lib/taxonomy';
import { Badge, Btn } from '../shared/UI';

export default function TaxonomyBrowser() {
    const { tx, saveTaxonomy } = useTaxonomy();
    const [selId, setSelId] = useState(tx[0]?.items[0]?.id);
    const [edit, setEdit] = useState(false);

    let sel = null; let gIdx = -1; let iIdx = -1;
    tx.forEach((g, gi) => {
        const idx = g.items.findIndex(i => i.id === selId);
        if (idx !== -1) { sel = g.items[idx]; gIdx = gi; iIdx = idx; }
    });

    if (!sel && tx[0]?.items[0]) {
        sel = tx[0].items[0]; gIdx = 0; iIdx = 0;
        if (selId !== sel.id) setSelId(sel.id);
    }

    const updateSel = (field, val) => {
        const newTx = [...tx];
        newTx[gIdx].items[iIdx] = { ...sel, [field]: val };
        saveTaxonomy(newTx);
    };

    const addGroup = () => {
        const id = `NEW-${Math.floor(Math.random() * 1000)}`;
        const newTx = [...tx, { grp: "New Group", src: "Custom", items: [{ id, n: "New Taxon", s: "MODERATE", c: C.mo, d: "Description...", ex: "Example...", kw: [] }] }];
        saveTaxonomy(newTx);
        setSelId(id);
    };

    const addTaxon = (idx) => {
        const id = `NEW-${Math.floor(Math.random() * 1000)}`;
        const newTx = [...tx];
        newTx[idx].items.push({ id, n: "New Taxon", s: "MODERATE", c: C.mo, d: "Description...", ex: "Example...", kw: [] });
        saveTaxonomy(newTx);
        setSelId(id);
    };

    if (!sel) return null;

    const Input = ({ val, field, type = "text" }) => (
        <input type={type} value={val} onChange={e => updateSel(field, e.target.value)} style={{ width: '100%', background: C.rs, border: `1px solid ${C.dm}`, color: C.tx, padding: 8, borderRadius: 4, fontFamily: ff, fontSize: 13, marginBottom: 12, outline: 'none' }} />
    );
    const Textarea = ({ val, field }) => (
        <textarea value={val} onChange={e => updateSel(field, e.target.value)} style={{ width: '100%', background: C.rs, border: `1px solid ${C.dm}`, color: C.tx, padding: 8, borderRadius: 4, fontFamily: ff, fontSize: 13, minHeight: 120, marginBottom: 12, outline: 'none', resize: 'vertical' }} />
    );

    return (
        <div style={{ display: 'flex', height: '100%', background: C.bg, fontFamily: ff }}>
            <div style={{ width: 280, borderRight: `1px solid ${C.bd}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.bd}` }}>
                    <h2 style={{ fontSize: 14, fontWeight: 500, color: C.br, margin: 0, letterSpacing: '-.02em' }}>Vulnerability Taxonomy</h2>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
                    {tx.map((g, gi) => (
                        <div key={g.grp} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 8px' }}>
                                {edit ? <input value={g.grp} onChange={e => { const nTx = [...tx]; nTx[gi].grp = e.target.value; saveTaxonomy(nTx); }} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${C.dm}`, color: C.dm, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', width: '100%', outline: 'none' }} /> : <span style={{ fontSize: 9, color: C.dm, textTransform: 'uppercase', letterSpacing: '.1em' }}>{g.grp}</span>}
                                {edit && <Btn small outline onClick={() => addTaxon(gi)}>+</Btn>}
                            </div>
                            {g.items.map(t => (
                                <button key={t.id} onClick={() => setSelId(t.id)} style={{ display: 'block', width: '100%', textAlign: 'left', background: selId === t.id ? C.sf : 'transparent', border: 'none', padding: '8px', borderRadius: 4, cursor: 'pointer', marginBottom: 2 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: selId === t.id ? t.c : C.mu }}>{t.id}</span>
                                    </div>
                                    <div style={{ fontSize: 10, color: selId === t.id ? C.tx : C.dm, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.n}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                    {edit && <div style={{ padding: '8px' }}><Btn outline style={{ width: '100%' }} onClick={addGroup}>+ Add Category</Btn></div>}
                </div>
            </div>
            <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
                <div style={{ maxWidth: 600 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                        <Btn outline={!edit} onClick={() => setEdit(!edit)}>{edit ? 'Disable Edit Mode' : 'Enable Edit Mode'}</Btn>
                    </div>

                    {!edit ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <h1 style={{ fontSize: 24, fontWeight: 300, color: sel.c, margin: 0 }}>{sel.id}: {sel.n}</h1>
                                <Badge text={sel.s} color={sel.c} />
                            </div>
                            <p style={{ fontSize: 14, color: C.br, lineHeight: 1.6, marginBottom: 32 }}>{sel.d}</p>
                            <div style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Structural Example</div>
                            <div style={{ background: C.sf, border: `1px solid ${C.bd}`, borderRadius: 6, padding: '20px', fontSize: 12, color: C.tx, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                {sel.ex}
                            </div>
                            <div style={{ marginTop: 32 }}>
                                <div style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Detection Signatures</div>
                                {sel.kw?.map((k, i) => (
                                    <div key={i} style={{ fontSize: 11, color: C.tx, background: C.bg, padding: '8px 12px', border: `1px solid ${C.bd}`, borderLeft: `2px solid ${C.dm}`, marginBottom: 4, borderRadius: 4, fontFamily: 'monospace' }}>
                                        {k.re.source || k.re} <span style={{ color: C.mu, marginLeft: 8 }}>({k.w})</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ background: C.sf, padding: 24, borderRadius: 6, border: `1px solid ${C.bd}` }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>ID</label>
                                    <Input val={sel.id} field="id" />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>Name</label>
                                    <Input val={sel.n} field="n" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>Severity</label>
                                    <select value={sel.s} onChange={e => updateSel("s", e.target.value)} style={{ width: '100%', background: C.rs, border: `1px solid ${C.dm}`, color: C.tx, padding: 8, borderRadius: 4, fontFamily: ff, fontSize: 13, marginBottom: 12, outline: 'none' }}>
                                        <option value="LOW">LOW</option>
                                        <option value="MODERATE">MODERATE</option>
                                        <option value="HIGH">HIGH</option>
                                        <option value="CRITICAL">CRITICAL</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>Color Hex</label>
                                    <Input val={sel.c} field="c" />
                                </div>
                            </div>
                            <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>Description</label>
                            <Textarea val={sel.d} field="d" />
                            <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, display: 'block' }}>Structural Example</label>
                            <Textarea val={sel.ex} field="ex" />

                            <label style={{ fontSize: 10, color: C.mu, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, marginTop: 12, display: 'block' }}>Detection Signatures (Regex)</label>
                            {sel.kw?.map((k, i) => (
                                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                    <input value={k.re.source || k.re} onChange={e => {
                                        const newKw = [...sel.kw];
                                        // Store as string; engine.js handles new RegExp()
                                        newKw[i] = { ...newKw[i], re: e.target.value };
                                        updateSel('kw', newKw);
                                    }} style={{ flex: 1, background: C.rs, border: `1px solid ${C.dm}`, color: C.tx, padding: '4px 8px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11, outline: 'none' }} />
                                    <input type="number" step="0.1" value={k.w} onChange={e => {
                                        const newKw = [...sel.kw];
                                        newKw[i] = { ...newKw[i], w: parseFloat(e.target.value) || 0 };
                                        updateSel('kw', newKw);
                                    }} style={{ width: 60, background: C.rs, border: `1px solid ${C.dm}`, color: C.tx, padding: '4px 8px', borderRadius: 4, fontFamily: ff, fontSize: 11, outline: 'none' }} />
                                    <Btn outline small onClick={() => {
                                        const newKw = [...sel.kw];
                                        newKw.splice(i, 1);
                                        updateSel('kw', newKw);
                                    }}>x</Btn>
                                </div>
                            ))}
                            <Btn outline small onClick={() => {
                                const newKw = [...(sel.kw || [])];
                                newKw.push({ re: 'new_pattern', w: 0.5 });
                                updateSel('kw', newKw);
                            }}>+ Add Signature</Btn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
