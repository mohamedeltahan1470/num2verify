import mongoose from 'mongoose';
import { MongoDB_idToid } from '../services/MongoDB_idToid.js';

const tokenBlocklistSchema = new mongoose.Schema({
    user_token: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

MongoDB_idToid(tokenBlocklistSchema);

const TokenBlocklist = mongoose.model('TokenBlocklist', tokenBlocklistSchema);

export default TokenBlocklist;
