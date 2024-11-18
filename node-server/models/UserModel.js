import mongoose from 'mongoose';
import UserNumber from './UserNumberModel.js';
import { MongoDB_idToid } from '../services/MongoDB_idToid.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    picture: {
        type: String
    },
    numbers_limit: {
        type: Number,
        default: 10
    },
    is_active: {
        type: Boolean,
        default: false
    },
    activation_code: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: 'activation_code must be an integer'
        }
    },
    password_reset_code: {
        type: String,
        default: ""
    }
}, { timestamps: true });


userSchema.pre('findOneAndDelete', async function (next) {
  try {
    const user = await this.model.findOne(this.getQuery());
    if (user) {
      await UserNumber.deleteMany({ user: user._id });
    }
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('deleteMany', async function (next) {
  try {
    const users = await this.model.find(this.getQuery());

    if (users.length > 0) {
      const userIds = users.map(user => user._id);

      await UserNumber.deleteMany({ userId: { $in: userIds } });
    }

    next();
  } catch (err) {
    next(err);
  }
});
  
MongoDB_idToid(userSchema);

const User = mongoose.model('User', userSchema);

export default User;
