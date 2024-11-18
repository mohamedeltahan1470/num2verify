import express from 'express';
import {getCountriesOrNumbers} from '../controllers/numberController.js';
import './numberRoutes.swagger.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/list' , getCountriesOrNumbers);

export default router;
