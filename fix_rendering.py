
import os

filepath = r"c:\Users\DOWHI\Mis Aplicaciones\Antigravity\Habilidades de Agentes\Mi_Calendario\docs\index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

target = """                            // Agregar hora a la primera línea si existe
                            let displayText = line;
                            if (index === 0 && note.time) {
                                displayText = `${line} ${note.time}`;
                            }"""

replacement = """                            // Agregar hora a la primera línea si existe
                            let displayText = line;
                            if (index === 0 && note.time) {
                                displayText = line ? `${line} ${note.time}` : note.time;
                            }"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Success: Pattern replaced.")
else:
    # Try with different whitespace or smaller part
    target_minimal = "displayText = `${line} ${note.time}`;"
    replacement_minimal = "displayText = line ? `${line} ${note.time}` : note.time;"
    if target_minimal in content:
        new_content = content.replace(target_minimal, replacement_minimal)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Success: Minimal pattern replaced.")
    else:
        print("Error: Pattern not found.")
