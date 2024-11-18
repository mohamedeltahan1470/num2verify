import bcrypt from 'bcrypt'

const password = 'num22veriff';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Generated Hash:', hash);
});
