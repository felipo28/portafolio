const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL y SUPABASE_KEY son requeridos');
  process.exit(1);
}

const envDir = path.join(__dirname, '..', 'src', 'environments');

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
