import * as fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/tranzinc-/g, 'translate-');
fs.writeFileSync('src/App.tsx', app);
