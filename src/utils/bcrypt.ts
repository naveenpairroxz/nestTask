import * as bcrypt from 'bcrypt';


// const saltRound = 10;
export function hashPassword(rowPassword: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rowPassword, salt);
}

export function comparedPassword(rowPassword: string, hash: string) {
    return bcrypt.compare(rowPassword, hash);
}