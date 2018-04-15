const userRepo = require('../server/app/repositories/user');

userRepo.sync({force: true})
  .then(() => {
    for(let i = 1; i <= 20; i += 1) {
      userRepo.create({
        username: `anis_${i}`,
        password: `pass_${i}`,
        firstName: `Anis ${i}`,
        lastName: `Bouhachem ${i}`
      });
    }
  });
  