import express from 'express';
import {
    registerUser,
    loginUser,
    tokenRefresh,
    decodeToken,
    getForgetPasswordCode,
    sendForgetPasswordReset,
    passwordReset,
    logout,
    getProfile,
    updateProfile,
    deleteProfile,
    getActivationCode,
    activateAccount,
    getUserNumbers,
    claimUserNumber,
    deleteUserNumber,
    getUserNumberMessages,
} from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';
import './userRoutes.swagger.js'; 

const router = express.Router();
console.log(router)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/token-refresh', verifyToken, tokenRefresh);
router.post('/decode-token', verifyToken, decodeToken);
router.get('/forget-password', getForgetPasswordCode);
router.post('/forget-password', sendForgetPasswordReset);
router.post('/password-reset', verifyToken , passwordReset);
router.post('/logout', verifyToken , logout);
router.get('/profile', verifyToken, getProfile);
router.post('/profile', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteProfile);
router.get('/activation-code', getActivationCode);
router.post('/activation-code', activateAccount);
router.get('/numbers', verifyToken, getUserNumbers);
router.post('/numbers', verifyToken, claimUserNumber);
router.delete('/numbers/', verifyToken, deleteUserNumber);
router.get('/number/messages', verifyToken, getUserNumberMessages);



export default router;
