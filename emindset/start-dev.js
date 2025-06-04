import { spawn } from 'child_process';
import process from 'node:process';

// Configuración
const EXPRESS_PORT = 3001;
const REACT_PORT = 5177;

// Función para iniciar un proceso
function startProcess(command, args, name, env = {}) {
  console.log(`Iniciando ${name}...`);
  
  const proc = spawn(command, args, {
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, ...env }
  });
  
  proc.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  proc.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });
  
  proc.on('close', (code) => {
    console.log(`${name} se ha cerrado con código ${code}`);
  });
  
  return proc;
}

// Iniciar el servidor Express
const expressServer = startProcess('node', ['server.js'], 'Express Server', {
  PORT: EXPRESS_PORT
});

// Iniciar el servidor de desarrollo de React
const reactServer = startProcess('npm', ['run', 'dev'], 'React Dev Server', {
  PORT: REACT_PORT
});

// Manejar la terminación del proceso
process.on('SIGINT', () => {
  console.log('\nCerrando servidores...');
  expressServer.kill();
  reactServer.kill();
  process.exit(0);
});

console.log(`\nServidores iniciados:\n- Express: http://localhost:${EXPRESS_PORT}\n- React: http://localhost:${REACT_PORT}\n`);
console.log('Presiona Ctrl+C para detener los servidores.');
