import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Yazan Kh',
    email: 'ykherfan@zingvibes.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Hayley Dunphy',
    email: 'hayley@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jason Smith',
    email: 'jason@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
