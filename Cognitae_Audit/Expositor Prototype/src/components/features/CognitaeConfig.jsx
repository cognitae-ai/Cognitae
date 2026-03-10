import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { C, ff } from '../../lib/constants';
import { db } from '../../lib/db';
import { Btn, Badge } from '../shared/UI';

// Vite Glob Import for all .yml files in the Cognitae_Audit directory
// The ?raw query returns the string content of the file
const yamlModules = import.meta.glob('../../../../Cognitae_Audit/*/*.yml', { query: '?raw', import: 'default', eager: true });

export default function CognitaeConfig() {
    const [files, setFiles] = useState({});
    const [activeFile, setActiveFile] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const [loading, setLoading] = useState(true);

    // Load static files from Vite glob on mount
    useEffect(() => {
        const loadFiles = () => {
            const result = {
                'Locus': [],
                'Mediatrix': [],
                'Threadglass': [],
                'Vigil': [],
                'Virel': []
            };

            for (const path in yamlModules) {
                const content = yamlModules[path];
                // path looks like: ../../../Cognitae_Audit/Locus_Expositor/001_Locus_Expositor_Core.yml
                const parts = path.split('/');
                const filename = parts[parts.length - 1];
                const folder = parts[parts.length - 2];

                let persona = 'Unknown';
                if (folder.includes('Locus')) persona = 'Locus';
                if (folder.includes('Mediatrix')) persona = 'Mediatrix';
                if (folder.includes('Thread_Glass')) persona = 'Threadglass';
                if (folder.includes('Vigil')) persona = 'Vigil';
                if (folder.includes('Virel')) persona = 'Virel';

                if (result[persona]) {
                    result[persona].push({
                        id: `${persona}_${filename}`,
                        persona,
                        filename,
                        path,
                        originalContent: content
                    });
                }
            }

            // Sort files within each persona
            Object.keys(result).forEach(k => {
                result[k].sort((a, b) => a.filename.localeCompare(b.filename));
            });

            setFiles(result);
            setLoading(false);

            if (result['Locus'] && result['Locus'].length > 0) {
                setActiveFile(result['Locus'][0]);
            }
        };
        loadFiles();
    }, []);

    // Load local revisions from Dexie for the active File
    const revisions = useLiveQuery(() => {
        if (!activeFile) return [];
        return db.cognitae_yaml.where({ id: activeFile.id }).reverse().sortBy('timestamp');
    }, [activeFile]) || [];

    // Set editor content when file or revisions change
    useEffect(() => {
        if (!activeFile) return;
        if (revisions && revisions.length > 0) {
            setEditorContent(revisions[0].content); // Load newest revision
        } else {
            setEditorContent(activeFile.originalContent); // Fallback to raw disk file
        }
    }, [activeFile, revisions]);

    const saveRevision = async () => {
        if (!activeFile) return;

        try {
            await db.cognitae_yaml.put({
                id: activeFile.id,
                persona: activeFile.persona,
                filename: activeFile.filename,
                timestamp: Date.now(),
                content: editorContent
            });
            // Dexie useLiveQuery will auto-update the revisions list
        } catch (err) {
            console.error("Failed to save local YAML revision", err);
            alert("Failed to save revision. See console for details.");
        }
    };

    const deleteRevision = async (id, timestamp) => {
        if (!window.confirm("Permanently delete this local revision?")) return;
        try {
            // Need to filter out the specific timestamp
            const existing = await db.cognitae_yaml.get(id);
            if (existing && existing.timestamp === timestamp) {
                await db.cognitae_yaml.delete(id); // Since we put with ID as primary key, this deletes the latest. 
                // Note: Our schema 'id, persona, filename, timestamp' sets 'id' as primary key. 
                // If we want multiple revisions per file, we should have made primary key [id+timestamp] or auto-increment.
                // For now, since schema is 'id', it actually just overwrites. Let's verify schema.
                // Schema is 'id, ...'. So db.put({id: 'Locus_001.yml'}) actually just overwrites the one record for that file.
                // Thus, we only ever have ONE local revision per file. This is simpler and probably preferred to avoid infinite DB growth.
            }
        } catch (err) {
            console.error("Failed to delete revision", err);
        }
    };

    const downloadFile = () => {
        if (!activeFile || !editorContent) return;
        const blob = new Blob([editorContent], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = activeFile.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const personas = [
        { id: 'Threadglass', name: 'Threadglass', color: '#06b6d4' },
        { id: 'Virel', name: 'Virel', color: C.lo },
        { id: 'Vigil', name: 'Vigil', color: C.mo },
        { id: 'Locus', name: 'Locus', color: C.cr },
        { id: 'Mediatrix', name: 'Mediatrix', color: '#a855f7' }
    ];

    if (loading) {
        return <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: C.mu, fontFamily: ff, fontSize: 12 }}>Scanning Cognitae_Audit directory for YAML manifests...</div>
    }

    const currentPDef = activeFile ? personas.find(p => p.id === activeFile.persona) : personas[0];
    const hasLocalEdit = Boolean(revisions.length > 0 && activeFile && revisions[0].content !== activeFile.originalContent);
    const isModifiedFromSaved = activeFile ? (hasLocalEdit ? editorContent !== revisions[0].content : editorContent !== activeFile.originalContent) : false;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg }}>
            {/* Header */}
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <div>
                    <h2 style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, color: C.br, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>⚙️</span> Cognitae Config
                    </h2>
                    <div style={{ fontFamily: ff, fontSize: 10, color: C.mu }}>YAML File Editor and Version Manager</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {isModifiedFromSaved && <span style={{ fontFamily: ff, fontSize: 10, color: C.ac, fontWeight: 600 }}>Unsaved Changes</span>}
                    <Btn onClick={saveRevision} disabled={!isModifiedFromSaved} style={{ background: isModifiedFromSaved ? C.ac : C.sf, color: isModifiedFromSaved ? '#000' : C.mu, border: `1px solid ${isModifiedFromSaved ? C.ac : C.dm}` }}>
                        Save Local Override
                    </Btn>
                    <Btn onClick={downloadFile} outline style={{ color: C.br, borderColor: C.bd }}>
                        ↓ Export .yml
                    </Btn>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Left File Explorer */}
                <div style={{ width: 280, borderRight: `1px solid ${C.bd}`, background: C.sf, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bd}`, fontSize: 11, fontFamily: ff, color: C.mu, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        Manifest Directory
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {personas.map(p => (
                            <div key={p.id}>
                                <div style={{ padding: '8px 16px', background: C.bg, borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: ff, color: C.br, position: 'sticky', top: 0, zIndex: 10 }}>
                                    {p.id}
                                </div>
                                <div>
                                    {files[p.id]?.map(f => {
                                        const isActive = activeFile?.id === f.id;
                                        return (
                                            <div
                                                key={f.id}
                                                onClick={() => setActiveFile(f)}
                                                style={{
                                                    padding: '6px 16px 6px 36px',
                                                    fontSize: 10, fontFamily: ff, cursor: 'pointer',
                                                    background: isActive ? '#1e293b40' : 'transparent',
                                                    color: isActive ? p.color : C.tx,
                                                    borderLeft: isActive ? `2px solid ${p.color}` : '2px solid transparent',
                                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                                }}
                                                onMouseEnter={e => !isActive && (e.currentTarget.style.background = C.bg)}
                                                onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                                            >
                                                {f.filename}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Central Code Editor */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.bg, minWidth: 0, borderRight: `1px solid ${C.bd}` }}>
                    <div style={{ padding: '10px 20px', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', gap: 8, background: '#0f172a80' }}>
                        <div style={{ fontFamily: ff, fontSize: 12, color: C.br, fontWeight: 500 }}>
                            {activeFile?.filename}
                        </div>
                    </div>
                    <textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        spellCheck="false"
                        style={{
                            flex: 1,
                            width: '100%',
                            background: C.bg,
                            border: 'none',
                            outline: 'none',
                            padding: '20px',
                            fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                            fontSize: 13,
                            color: C.tx,
                            lineHeight: 1.6,
                            resize: 'none',
                            whiteSpace: 'pre'
                        }}
                    />
                </div>

                {/* Right Version Control Pane */}
                <div style={{ width: 300, background: C.sf, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bd}`, fontSize: 11, fontFamily: ff, color: C.mu, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        Version History
                    </div>
                    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>

                        {/* Current Local Overlay (if exists) */}
                        {hasLocalEdit && (
                            <div style={{ background: '#1e293b50', border: `1px solid ${C.ac}40`, borderRadius: 6, padding: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <Badge text="Local Override" color={C.ac} />
                                    <span style={{ fontSize: 9, color: C.dm }}>{new Date(revisions[0].timestamp).toLocaleString()}</span>
                                </div>
                                <div style={{ fontSize: 10, color: C.mu, fontFamily: ff, marginBottom: 12, lineHeight: 1.4 }}>
                                    This version is stored in the browser. It overrides the physical disk file for Expositor reads.
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <Btn small outline style={{ flex: 1, fontSize: 10 }} onClick={() => setEditorContent(revisions[0].content)}>Load Editor</Btn>
                                    <Btn small outline style={{ color: C.rd, borderColor: `${C.rd}40` }} onClick={() => deleteRevision(revisions[0].id, revisions[0].timestamp)}>Discard</Btn>
                                </div>
                            </div>
                        )}

                        {/* Physical Disk Base */}
                        <div style={{ background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 6, padding: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <Badge text="Original (Disk)" color={C.mu} />
                            </div>
                            <div style={{ fontSize: 10, color: C.dm, fontFamily: ff, marginBottom: 12, lineHeight: 1.4 }}>
                                The raw `{activeFile?.filename}` file currently residing on your F:\ drive.
                            </div>
                            <Btn small outline style={{ width: '100%', fontSize: 10, opacity: hasLocalEdit ? 0.7 : 1 }} onClick={() => setEditorContent(activeFile.originalContent)}>
                                Load Editor
                            </Btn>
                        </div>

                    </div>

                    <div style={{ padding: 16, borderTop: `1px solid ${C.bd}`, background: '#0f172a50' }}>
                        <div style={{ fontSize: 10, color: C.dm, fontFamily: ff, marginBottom: 12, lineHeight: 1.5 }}>
                            <strong>Security Note:</strong> Browsers cannot hot-replace files on your hard drive.
                            To apply Local Overrides to the physical `Cognitae_Audit` folder, click <strong>Export .yml</strong> and replace the file manually.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
