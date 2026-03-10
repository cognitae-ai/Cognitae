import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';

export default function Dump() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            const notes = await db.notes.toArray();
            const sessions = await db.sessions.toArray();
            const settings = await db.settings.toArray();
            const benchmarks = await db.benchmarks.toArray();

            // fetch taxonomy from localStorage as it is stored there too for init fallback
            const taxonomy_v1 = await db.settings.get('taxonomy_v1') || localStorage.getItem('exp_taxonomy_v1');

            setData({ notes, sessions, settings, benchmarks, taxonomy_v1 });
        };
        fetchAll();
    }, []);

    if (!data) return <div>Loading export...</div>;

    return <pre id="db-dump">{JSON.stringify(data, null, 2)}</pre>;
}
