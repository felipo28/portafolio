const fs = require('fs');
const path = require('path');

const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_KEY || '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL y SUPABASE_KEY son requeridos');
  console.error('SUPABASE_URL:', supabaseUrl ? 'set' : 'NOT SET');
  console.error('SUPABASE_KEY:', supabaseKey ? 'set' : 'NOT SET');
  process.exit(1);
}

const envDir = path.join(__dirname, '..', 'src', 'environments');
fs.mkdirSync(envDir, { recursive: true });
console.log('Escribiendo archivos en:', envDir);

const devContent =
  `export const environment = {\n` +
  `  production: false,\n` +
  `  supabaseUrl: '${supabaseUrl}',\n` +
  `  supabaseKey: '${supabaseKey}'\n` +
  `};\n`;

const prodContent =
  `export const environment = {\n` +
  `  production: true,\n` +
  `  supabaseUrl: '${supabaseUrl}',\n` +
  `  supabaseKey: '${supabaseKey}'\n` +
  `};\n`;

fs.writeFileSync(path.join(envDir, 'environment.ts'), devContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), prodContent);

console.log('environment.ts y environment.prod.ts generados correctamente');
