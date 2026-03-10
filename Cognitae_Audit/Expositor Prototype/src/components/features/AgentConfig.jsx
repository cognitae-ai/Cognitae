import React, { useState, useEffect } from 'react';
import { C, ff } from '../../lib/constants';
import { ST } from '../../lib/db';
import { Btn, Tooltip } from '../shared/UI';
import { SKELETON as AS, ORGANS as AO, MUSCLES as AM, SKIN as ASK } from './knowledge/auditor';
import { SKELETON as SS, ORGANS as SO, MUSCLES as SM, SKIN as SSK } from './knowledge/synthesizer';

export default function AgentConfig() {
    const [activeAgent, setActiveAgent] = useState('auditor');
    const [msg, setMsg] = useState("");

    // State for the four core S/O/M/S components
    const [prompts, setPrompts] = useState({
        auditor: { skeleton: AS, organs: AO, muscles: AM, skin: ASK },
        synthesizer: { skeleton: SS, organs: SO, muscles: SM, skin: SSK }
    });

    useEffect(() => {
        const loadCustom = async () => {
            const pA = await ST.get('prompt_auditor');
            const pS = await ST.get('prompt_synthesizer');

            setPrompts({
                auditor: {
                    skeleton: pA?.skeleton || AS,
                    organs: pA?.organs || AO,
                    muscles: pA?.muscles || AM,
                    skin: pA?.skin || ASK
                },
                synthesizer: {
                    skeleton: pS?.skeleton || SS,
                    organs: pS?.organs || SO,
                    muscles: pS?.muscles || SM,
                    skin: pS?.skin || SSK
                }
            });
        };
        loadCustom();
    }, []);

    const handleChange = (part, value) => {
        setPrompts(prev => ({
            ...prev,
            [activeAgent]: {
                ...prev[activeAgent],
                [part]: value
            }
        }));
    };

    const handleSave = async () => {
        const key = `prompt_${activeAgent}`;
        await ST.set(key, prompts[activeAgent]);
        setMsg(`Saved override for ${activeAgent.toUpperCase()}`);
        setTimeout(() => setMsg(""), 3000);
    };

    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset this agent to factory defaults?")) return;
        const key = `prompt_${activeAgent}`;
        await ST.del(key);

        setPrompts(prev => ({
            ...prev,
            auditor: activeAgent === 'auditor' ? { skeleton: AS, organs: AO, muscles: AM, skin: ASK } : prev.auditor,
            synthesizer: activeAgent === 'synthesizer' ? { skeleton: SS, organs: SO, muscles: SM, skin: SSK } : prev.synthesizer
        }));

        setMsg(`Reset ${activeAgent.toUpperCase()} to defaults`);
        setTimeout(() => setMsg(""), 3000);
    };

    const getTooltip = (part) => {
        if (part === 'skeleton') return "Defines the core identity, overarching goal, and foundational premise of the AI's existence in this context.";
        if (part === 'organs') return "The explicit directives, hard rules, constraints, and operational guidelines the AI must logically process and follow.";
        if (part === 'muscles') return "Concrete examples of expected behavior, edge cases, and formatting templates to build practical 'muscle memory'.";
        if (part === 'skin') return "The stylistic overlay, tonal instructions, persona voice, and formatting quirks applied to the final output text.";
        return "";
    };

    const renderInput = (label, part, rows = 6) => (
        <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 600, color: C.br, marginBottom: 8, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                {label}
                <Tooltip text={getTooltip(part)} />
            </label>
            <textarea
                value={prompts[activeAgent][part]}
                onChange={e => handleChange(part, e.target.value)}
                style={{ width: '100%', background: C.sf, border: `1px solid ${C.bd}`, padding: '12px', borderRadius: 6, fontFamily: ff, fontSize: 11, color: C.tx, lineHeight: 1.6, resize: 'vertical', outline: 'none' }}
                rows={rows}
            />
        </div>
    );

    return (
        <div style={{ padding: '40px 60px', maxWidth: 1000, margin: '0 auto', fontFamily: ff, height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, borderBottom: `1px solid ${C.bd}`, paddingBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 300, color: C.br, margin: '0 0 8px 0' }}>Agent Configuration</h1>
                    <div style={{ fontSize: 11, color: C.mu }}>Modify the core prompt architecture (S/O/M/S) for Expositor's testing agents.</div>
                </div>
                {msg && <div style={{ fontSize: 10, color: C.sa, background: C.sa + '14', padding: '6px 12px', borderRadius: 4 }}>{msg}</div>}
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                <button onClick={() => setActiveAgent('auditor')} style={{ flex: 1, padding: '12px', background: activeAgent === 'auditor' ? C.sf : 'transparent', border: `1px solid ${activeAgent === 'auditor' ? C.ac : C.bd}`, borderRadius: 6, color: activeAgent === 'auditor' ? C.ac : C.mu, cursor: 'pointer', fontFamily: ff, fontSize: 12, fontWeight: 500, transition: 'all .2s' }}>
                    [ The Auditor ]
                </button>
                <button onClick={() => setActiveAgent('synthesizer')} style={{ flex: 1, padding: '12px', background: activeAgent === 'synthesizer' ? C.sf : 'transparent', border: `1px solid ${activeAgent === 'synthesizer' ? C.ac : C.bd}`, borderRadius: 6, color: activeAgent === 'synthesizer' ? C.ac : C.mu, cursor: 'pointer', fontFamily: ff, fontSize: 12, fontWeight: 500, transition: 'all .2s' }}>
                    [ The Synthesizer ]
                </button>
            </div>

            <div style={{ background: C.bg, border: `1px solid ${C.dm}`, borderRadius: 8, padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, color: C.br, margin: 0 }}>{activeAgent === 'auditor' ? 'Auditor Architecture' : 'Synthesizer Architecture'}</h3>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <Btn onClick={handleReset} outline>Reset to Defaults</Btn>
                        <Btn onClick={handleSave}>Save Overrides</Btn>
                    </div>
                </div>

                {renderInput('Skeleton (Core Identity)', 'skeleton', 6)}
                {renderInput('Organs (Directives)', 'organs', 8)}
                {renderInput('Muscles (Method/Examples)', 'muscles', 12)}
                {renderInput('Skin (Tone/Persona)', 'skin', 4)}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.bd}` }}>
                    <Btn onClick={handleSave}>Save Overrides</Btn>
                </div>
            </div>
        </div>
    );
}
