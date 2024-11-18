import mongoose from 'mongoose';
import { MongoDB_idToid } from '../services/MongoDB_idToid.js';

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        default: 0
    },
    country_code: {
        type: String,
        required: true
    },
    country_name_code: {
        type: String,
        required: true
    },
    country_icon: {
        type: String
    }
}, { timestamps: true });

MongoDB_idToid(countrySchema);

const Country = mongoose.model('Country', countrySchema);

export default Country;
