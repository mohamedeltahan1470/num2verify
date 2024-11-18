import mongoose from 'mongoose';
import { MongoDB_idToid } from '../services/MongoDB_idToid.js';

const { Schema } = mongoose;

const numbersSchema = new Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

MongoDB_idToid(numbersSchema);

const Number = mongoose.model('Number', numbersSchema);

export default Number;
