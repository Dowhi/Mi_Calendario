const { execSync } = require('child_process');

console.log("🔍 Investigando turnos 'Turno' en Enero 2026...");

const ghostDates = [];

for (let d = 1; d <= 31; d++) {
    const day = d.toString().padStart(2, '0');
    const dateKey = `2026-01-${day}`;

    try {
        const output = execSync(`firebase firestore:get calendar_events/${dateKey} --project apptaxi-f2190`, { encoding: 'utf8' });
        if (output && output.trim()) {
            const data = JSON.parse(output);
            if (data.events && Array.isArray(data.events)) {
                const turns = data.events.filter(e => e.type !== 'note');
                const ghostEvents = turns.filter(e => !e.shiftId && (!e.text || e.text.trim() === ''));

                // También chequear si el texto es literal "Turno" pero sin shiftId (opcional)
                const literalTurnos = turns.filter(e => e.text === 'Turno' && !e.shiftId);

                if (ghostEvents.length > 0 || literalTurnos.length > 0) {
                    console.log(`📍 Encontrado en ${dateKey}: ${ghostEvents.length} vacíos, ${literalTurnos.length} literales 'Turno'`);
                    ghostDates.push({ date: dateKey, ghosts: ghostEvents.length, literales: literalTurnos.length });
                }
            }
        }
    } catch (e) {
        // Probablemente el documento no existe
    }
}

if (ghostDates.length === 0) {
    console.log("❌ No se encontraron turnos sin ID o con texto vacío en calendar_events.");
} else {
    console.log("\n✅ Resumen de hallazgos:");
    ghostDates.forEach(g => console.log(`- ${g.date}: ${g.ghosts} fantasma, ${g.literales} 'Turno' literal`));
    console.log(`\nTotal de días afectados: ${ghostDates.length}`);
}
