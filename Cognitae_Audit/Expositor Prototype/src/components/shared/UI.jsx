import React, { useState } from 'react';
import { ff, C } from '../../lib/constants';

export function Badge({ text, color }) {
    return (
        <span style={{
            display: 'inline-flex', padding: '1px 6px', borderRadius: 3,
            fontSize: 9, fontWeight: 600, fontFamily: ff, letterSpacing: '.06em',
            background: color + '14', color, border: `1px solid ${color}28`
        }}>
            {text}
        </span>
    );
}

export function Btn({ children, onClick, color = C.ac, outline, disabled, small, style = {} }) {
    const s = outline
        ? {
            padding: small ? '4px 8px' : '7px 14px', borderRadius: 4, border: `1px solid ${C.dm}`,
            background: 'transparent', color: C.mu, fontFamily: ff, fontSize: small ? 9 : 10,
            cursor: disabled ? 'default' : 'pointer', opacity: disabled ? .4 : 1,
            ...style
        }
        : {
            padding: small ? '4px 8px' : '7px 14px', borderRadius: 4, border: 'none',
            background: color, color: '#fff', fontFamily: ff, fontSize: small ? 9 : 10,
            fontWeight: 600, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? .4 : 1,
            letterSpacing: '.02em',
            ...style
        };
    return <button onClick={onClick} disabled={disabled} style={s}>{children}</button>;
}

export function Tooltip({ text }) {
    const [show, setShow] = useState(false);
    return (
        <span
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            style={{ position: 'relative', display: 'inline-flex', cursor: 'help', marginLeft: 6, width: 14, height: 14, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: C.sf, border: `1px solid ${C.dm}`, color: C.mu, fontSize: 9, fontFamily: ff, fontWeight: 'bold' }}
        >
            ?
            {show && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8, background: C.bg, border: `1px solid ${C.bd}`, padding: '8px 12px', borderRadius: 4, color: C.tx, fontSize: 11, fontWeight: 'normal', width: 200, whiteSpace: 'normal', textAlign: 'center', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                    {text}
                </div>
            )}
        </span>
    );
}
