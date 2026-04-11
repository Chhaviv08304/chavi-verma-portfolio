import * as fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/cyan-/g, 'pink-');
app = app.replace(/emerald-/g, 'rose-');
app = app.replace(/slate-950/g, 'black');
app = app.replace(/slate-/g, 'zinc-');
app = app.replace(/rgba\(6,182,212,0\.3\)/g, 'rgba(236,72,153,0.3)');
app = app.replace(/Chavi<span className="text-pink-500">\.<\/span>/g, 'Chavi Verma');
app = app.replace(/Chavi<span className="text-cyan-500">\.<\/span>/g, 'Chavi Verma');

fs.writeFileSync('src/App.tsx', app);
