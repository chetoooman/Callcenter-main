const bcrypt = require('bcryptjs');
const sequelize = require('./config/db');
const User = require('./models/User');

const crearUsuarios = async () => {
  await sequelize.sync();

  const usuarios = [
    {
      name: 'Supervisor 1',
      lastName: 'Test',
      username: 'supervisor1',
      email: 'supervisor1@callcenter.com',
      password: '123456',
      role: 'supervisor'
    },
    {
      name: 'Admin 1',
      lastName: 'Test',
      username: 'admin1',
      email: 'admin1@callcenter.com',
      password: '123456',
      role: 'admin'
    },
    {
      name: 'Super Admin 1',
      lastName: 'Test',
      username: 'superadmin1',
      email: 'superadmin1@callcenter.com',
      password: '123456',
      role: 'superAdmin'
    }
  ];

  for (const u of usuarios) {
    const existe = await User.findOne({ where: { email: u.email } });
    if (existe) {
      console.log(`⚠️ Usuario ya existe: ${u.email}`);
      continue;
    }
    const password_hash = await bcrypt.hash(u.password, 10);
    const creado = await User.create({
      name: u.name,
      lastName: u.lastName,
      username: u.username,
      email: u.email,
      password: password_hash,
      role: u.role
    });
    console.log(`✅ Usuario creado: ${creado.username} (${u.role})`);
  }

  process.exit();
};

crearUsuarios();
