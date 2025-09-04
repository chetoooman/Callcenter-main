// check-env.js
require('dotenv').config();

console.log('🔍 Verificando variables de entorno:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'No definida');
console.log('DB_PORT:', process.env.DB_PORT);

// Verifica que ninguna variable sea undefined
if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error('❌ Faltan variables de entorno requeridas');
  process.exit(1);
}

console.log('✅ Todas las variables de entorno están definidas');