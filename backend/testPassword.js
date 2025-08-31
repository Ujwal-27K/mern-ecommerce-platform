const bcrypt = require('bcryptjs');

const hashedPassword = '$2a$10$e6KMMPgO.Z0MTmWrRUIQ6eyjYnzA0SBcvZtiQ3.Hrf9xObPDiwi92';
const inputPassword = 'Admin1234';

bcrypt.compare(inputPassword, hashedPassword)
  .then(match => {
    console.log(match ? 'Password match' : 'Password does not match');
  })
  .catch(err => {
    console.error('Error comparing passwords:', err);
  });
