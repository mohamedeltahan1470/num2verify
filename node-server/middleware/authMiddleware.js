import jwt from 'jsonwebtoken';
import TokenBlocklist from '../models/TokenBlockList.js';
import User from '../models/UserModel.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tokenBlocked = await TokenBlocklist.find({user_token: token});
    if (tokenBlocked.length !== 0){
      throw error;
    }
    if (decoded.tokenType !== 'access'){
      return res.status(401).json({ message: 'Wrong token type provided' });
    }

    const userId = decoded.id;
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    next();
  } catch (error) {
    res.status(401).json({
      "detail": "Given token not valid for any token type",
      "code": "token_not_valid",
      "messages": [
        {
          "token_class": "AccessToken",
          "token_type": "access",
          "message": "Token is invalid or expired"
        }
      ]
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
};

