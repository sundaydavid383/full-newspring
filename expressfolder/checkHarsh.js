const bcrypt = require('bcryptjs');

const adminPassword = 'moni'; // your plain password
const hash1 = '$2b$10$igeFEO6s49f3Q71WFMqNUeqAkIF.Bca5ZSsCQ0P6czc6qIO4SH/7y';
const hash2 = '$2b$10$P/MxrB4w4Mfk8cqhqaWmyupaIeRomP5Q8cO3LhvqF7tjifAFP5KnW';

bcrypt.compare(adminPassword, hash1).then(match => {
  console.log('Hash 1 match:', match);
});

bcrypt.compare(adminPassword, hash2).then(match => {
  console.log('Hash 2 match:', match);
});