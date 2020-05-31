const connection = require('./connection');

const { v4: uuidv4 } = require('uuid');

const { addUser } = require('./query/user');

const { ROLE } = require('../helpers/Constants');

const sql = `

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Code Academy');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Freelancers');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','start up');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Public');
`;

connection
  .query(sql)
  .then(() => console.log('Add Data!'))
  .catch((e) => console.error('failed to build', e.stack));

addUser(
  {
    name: 'Admin',
    phone: '059000000',
    email: 'admin@no.com',
    password: 'Gs123456',
    birthDate: '1/1/2000',
    role: ROLE.ADMIN,
  },
  (err, result) => {
    console.log('Error in user', err);
  },
);

addUser({
  name: 'Karmel Mahmoud Salah',
  phone: '051000000',
  email: 'karmel@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'Hanan Awawdeh',
  phone: '051000000',
  email: 'Hanan@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'banan Alhaj',
  phone: '051000000',
  email: 'banan@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 'bayan Al jubah',
  phone: '051000000',
  email: 'bayan@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'nidaa awawdeh',
  phone: '051000000',
  email: 'nidaa@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'Duha Ballut',
  phone: '051000000',
  email: 'duha@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'Sahar Froukh',
  phone: '051000000',
  email: 'sahar@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
// =============
addUser({
  name: ' Abed Alfattah Sowaity',
  phone: '051000000',
  email: 'bbed@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'yakoob Hammouri',
  phone: '051000000',
  email: 'yakoob@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'Hussein shahatet',
  phone: '051000000',
  email: 'hussein@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'ruba sider',
  phone: '051000000',
  email: 'ruba@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'bayan seder',
  phone: '051000000',
  email: 'bayans@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'kholoud fannoun',
  phone: '051000000',
  email: 'kholoud@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
addUser({
  name: 'tasneem al-bhiri',
  phone: '051000000',
  email: 'tasneem@hotmail.com',
  password: 'Gs123456',
  birthDate: '10/10/2010',
  role: ROLE.USER,
});
