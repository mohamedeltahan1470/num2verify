import mongoose from 'mongoose';
import { MongoDB_idToid } from '../services/MongoDB_idToid.js';

const userNumberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  number: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Number',
    required: true,
    unique: true, 
  },
}, { timestamps: true });

MongoDB_idToid(userNumberSchema)

const UserNumber = mongoose.model('UserNumber', userNumberSchema);

export default UserNumber;
