const { execSync } = require('child_process');

console.log("🔍 Dumping Jan 2026 events...");

for (let d = 1; d <= 31; d++) {
    const day = d.toString().padStart(2, '0');
    const dateKey = `2026-01-${day}`;

    try {
        const output = execSync(`firebase firestore:get calendar_events/${dateKey} --project apptaxi-f2190`, { encoding: 'utf8' });
        if (output && output.trim()) {
            const data = JSON.parse(output);
            if (data.events && Array.isArray(data.events)) {
                data.events.forEach(e => {
                    console.log(`[${dateKey}] Type: ${e.type}, Text: "${e.text}", ID: ${e.shiftId}`);
                });
            }
        }
    } catch (e) {
    }
}
