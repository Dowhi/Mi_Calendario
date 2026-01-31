const { execSync } = require('child_process');

console.log("🔍 Final Verification: Searching for data that triggers 'Turno' in statistics...");

for (let d = 1; d <= 31; d++) {
    const day = d.toString().padStart(2, '0');
    const dateKey = `2026-01-${day}`;

    try {
        const output = execSync(`firebase firestore:get calendar_events/${dateKey} --project apptaxi-f2190`, { encoding: 'utf8' });
        if (output && output.trim()) {
            const data = JSON.parse(output);
            if (data.events && Array.isArray(data.events)) {
                data.events.forEach(e => {
                    const isNote = e.type === 'note';
                    // The old logic was: events.filter(e => e.type !== 'note')
                    if (!isNote) {
                        const key = e.shiftId || e.text || 'Turno';
                        if (key === 'Turno') {
                            console.log(`🚩 GHOST FOUND! Date: ${dateKey}, Event: ${JSON.stringify(e)}`);
                        }
                    }
                });
            }
        }
    } catch (e) {
    }
}
