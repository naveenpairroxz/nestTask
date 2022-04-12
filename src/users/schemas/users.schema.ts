import * as mongoose from 'mongoose';
// import * as bcrypt from 'bcrypt';

// const salt: number = 10;

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true }
});


// for hiding password in response
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

// // * Hash the password befor it is beeing saved to the database
// UserSchema.pre('save', function (next: (err: Error | null) => void) {
//     // * Make sure you don't hash the hash
//     if (!this.isModified('password')) {
//         return next(null);
//     }
//     bcrypt.hash(this.password, salt, (err: Error, hash: String) => {
//         if (err) return next(err);
//         this.password = hash;
//     });
// });

// UserSchema.methods.comparePasswords = function (
//     comparedPassword: String,
//     next: (err: Error | null, same: Boolean | null) => void,
// ) {
//     bcrypt.compare(comparedPassword, this.password, function (err, isMatch) {
//         if (err) {
//             return next(err, null);
//         }
//         next(null, isMatch);
//     });
// };
