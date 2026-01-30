import bcrypt from 'bcrypt';

const saltCount = 10;

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltCount);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (plain, hashedPassword) => {
    return bcrypt.compareSync(plain, hashedPassword);
}