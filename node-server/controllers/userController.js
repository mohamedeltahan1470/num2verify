import User from '../models/UserModel.js';
import UserNumber from '../models/UserNumberModel.js';
import Country from '../models/CountryModel.js';
import TokenBlocklist from '../models/TokenBlockList.js';
import NumberModel from '../models/NumberModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { sendEmailCode } from '../services/sendEmailCode.js';
import { validatePassword } from '../services/validatePassword.js';
import { validateEmail } from '../services/validateEmail.js';
import { findMessages } from '../services/findMessages.js';
import moment from 'moment-timezone';

export const registerUser = async (req, res) => {
  const { email, password, confirm_password, first_name, last_name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 'email': ['user with this email already exists.'] });
    }
    if (!confirm_password) {
      return res.status(400).json({ success: false, message: 'confirm_password is required' });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'email is required' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ success: false, message: 'password is different than confirm_password' });
    }

    const emailParts = email.split('@');
    if (email === password || emailParts[0] == password) {
      return res.status(400).json({ success: false, message: 'password must be different than email' });
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return res.status(400).json({ success: false, message: passwordValidationError });
    }

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      return res.status(400).json({ success: false, message: emailValidationError });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { send_activation_code_status, send_activation_code_message, otp } = await sendEmailCode(email, "Activation_Code");
    if(!send_activation_code_status){
      return res.status(400).json({ success: false, message: send_activation_code_message });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,      
      activation_code: otp
    });

    res.status(201).json({
      success: true,
      message: 'User is Created Successfully',
      user_details: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture || '/media/images/user/default_picture.png',
        date_joined: user.createdAt,
        is_active: user.is_active,
      },
      activation_code: {
        success: send_activation_code_status,
        message: send_activation_code_message,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({non_field_errors: ['Invalid login credentials'] });
    }
    if (!user.is_active){
      return res.status(400).json({detail: 'No active account found with the given credentials' });
    }

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      return res.status(400).json({ success: false, message: emailValidationError });
    }

    const accessToken = jwt.sign({ id: user._id, email: user.email, tokenType: 'access' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ id: user._id, email: user.email, tokenType: 'refresh' }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(200).json({
      success: true,
      access: accessToken,
      refresh: refreshToken,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture || '/media/images/user/default_picture.png',
        email: user.email,
        date_joined: user.createdAt,
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const tokenRefresh = async (req, res) => {
  const { refresh } = req.body;
  try {
    const decoded = jwt.verify(refresh, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email })

    const newToken = jwt.sign({ id: user.id, email: user.email, tokenType: 'access' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({success: true, access: newToken });
  } catch (error) {
    res.status(400).json({ error: 'Given token not valid for any token type' });
  }
};

export const decodeToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, ...decoded });
  } catch (error) {
    res.status(400).json({ error: 'Given token not valid for any token type' });
  }
};

export const getForgetPasswordCode = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ success: false, message: 'email id required.' });
  }

  try{
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'there is no account associated with this email' });
    }

    const { send_activation_code_status, send_activation_code_message, otp } = await sendEmailCode(email, "Forgot_Password_Code");

    if(!send_activation_code_status){
      return res.status(400).json({ success: false, message: 'There was a problem. Please try again' });
    }
    
    await user.updateOne({ password_reset_code: otp.toString() })

    res.status(200).json({
      "password_reset_code_success": true,
      "password_reset_code_message": "password_reset_code sent successfully"
    })
    
  } catch(error){
    res.status(400).json({
      "password_reset_code_success": false,
      "password_reset_code_error": error
    });
  }
};

export const sendForgetPasswordReset = async (req, res) => {
  const { email, password_reset_code, new_password, confirm_new_password } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'email id required.' });
  }
  
  if (!password_reset_code) {
      return res.status(400).json({ success: false, message: 'password_reset_code required.' });
  }
  if (!new_password) {
      return res.status(400).json({ success: false, message: 'new_password id required.' });
  }
  if (!confirm_new_password) {
      return res.status(400).json({ success: false, message: 'confirm_new_password id required.' });
  }
  if (new_password !== confirm_new_password) {
      return res.status(400).json({ success: false, message: 'new_password is different than confirm_new_password.' });
  }

  try{
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ success: false, message: 'there is no account associated with this email' });
    }

    const old_password = user.password

    if (await bcrypt.compare(new_password, old_password)) {
      return res.status(400).json({ success: false, message: 'new_password must be different than your old_password.' });
    }

    const passwordValidationError = validatePassword(new_password);
    if (passwordValidationError) {
      return res.status(400).json({ success: false, message: passwordValidationError });
    }

    if (password_reset_code !== user.password_reset_code){
      return res.status(400).json({ success: false, "message": "Invalid password_reset_code" });
    }

    const new_password_hash = await bcrypt.hash(new_password, 10);

    await user.updateOne({ password: new_password_hash, password_reset_code: ""})
    return res.status(200).json({ success: true, message: 'Password updated successfully.' });

  } catch(error){
    return res.status(500).json({ success: false, message: 'Internal server error' });

  }
};

export const passwordReset = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  const { old_password, new_password, confirm_new_password  } = req.body;

    if (!old_password) {
      return res.status(400).json({ success: false, message: 'old_password is required.' });
    }
    if (!new_password) {
        return res.status(400).json({ success: false, message: 'new_password is required.' });
    }
    if (!confirm_new_password) {
        return res.status(400).json({ success: false, message: 'confirm_new_password is required.' });
    }

    if (new_password !== confirm_new_password) {
        return res.status(400).json({ success: false, message: 'new_password is different than confirm_new_password.' });
    }

    if (old_password === new_password) {
        return res.status(400).json({ success: false, message: 'new_password must be different than old_password.' });
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'old_password is wrong.' });
    }

    const passwordValidationError = validatePassword(new_password);
    if (passwordValidationError) {
        return res.status(400).json({ success: false, message: passwordValidationError });
    }

    user.password = await bcrypt.hash(new_password, 10);
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully.' });


  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }

    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const logout = async (req, res) => {
  
  try {
    const accesstoken = req.headers.authorization?.split(' ')[1];

    let decodedAccessToken;

    try {
      decodedAccessToken = jwt.verify(accesstoken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid access token' });
    }

    const { refresh } = req.body;
    if (!refresh) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(refresh, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    if (
      decodedAccessToken.id === decodedRefreshToken.id &&
      decodedAccessToken.exp > decodedRefreshToken.iat
    ) {
      await TokenBlocklist.create({ user_token: accesstoken });
      
      await TokenBlocklist.create({ user_token: refresh });

      return res.status(200).json({
        success: true,
        message: 'User logged out successfully'
      });
    } else {
      return res.status(400).json({ success: false, message: 'Token mismatch or invalid token timings' });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      profile_details: {
        id: user._id,
        email: user.email,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        picture: user.picture || '/media/images/user/default_picture.png',
        date_joined: user.createdAt,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const {first_name, last_name} = req.body
  
  const updateFields = {};
  if (first_name) updateFields.first_name = first_name;
  if (last_name) updateFields.last_name = last_name;

  try {
    const updatedUser = await User.findByIdAndUpdate(decoded.id, updateFields, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User Updated Successfully',
      profile_details: {
        id: updatedUser._id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        picture: updatedUser.picture || '/media/images/user/default_picture.png',
        date_joined: updatedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndDelete(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
      profile_details: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getActivationCode = async (req, res) => {
  const email = req.query.email;


  if (!email) {
    return res.status(400).json({ success: false, message: 'email is required.' });
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError) {
    return res.status(400).json({ success: false, message: emailValidationError });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'there is no account associated with this email' });
    }

    if (user.is_active) {
      return res.status(200).json({ success: false, message: 'account already activated' });
    }

    const { send_activation_code_status, send_activation_code_message, otp } = await sendEmailCode(email, "Activation_Code");
    if(!send_activation_code_status){
      return res.status(400).json({ success: false, message: send_activation_code_message });
    }
    await user.updateOne({ activation_code: otp })
    return res.status(200).json({ success: true, message: send_activation_code_message });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const activateAccount = async (req, res) => {
  const { email, activation_code } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'email id required.' });
  }

  if (!activation_code && activation_code != 0) {
    return res.status(400).json({ success: false, message: 'activation_code required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'there is no account associated with this email' });
    }

    if (user.is_active) {
      return res.status(200).json({ success: false, message: 'account already activated' });
    }

    if (user.activation_code == activation_code) {
      user.is_active = true;
      user.activation_code = 0;
      await user.save();
      return res.status(200).json({ success: true, message: 'account activated successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid activation_code' });
    }
    
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getUserNumbers = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const numberObjects = await UserNumber.find({ user: decoded.id })
      .populate({ 
        path: 'number',
        populate: {
          path: 'country',
          model: 'Country',
        } 
     });



    const mappedNumbers = numberObjects.map(({ number }) => ({
      id: number._id,
      number: number.number,
      country_name_code: number.country.country_name_code
    }));


   console.log(mappedNumbers)
    return res.status(200).json({
      success: true,
      numbers_list: mappedNumbers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const claimUserNumber = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  const numberId = req.body.number_id;

  if (!numberId) {
      return res.status(400).json({ success: false, message: 'number_id is required.' });
  }

  try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const user = await User.findById(userId)

      const numberObject = await NumberModel.findById(numberId.toString());
      if (!numberObject) {
          return res.status(400).json({ success: false, message: 'Number does not exist.' });
      }

      const claimedNumbers = await UserNumber.find({ user: userId }).populate('number');

      const claimedNumbersStrings = claimedNumbers.map(({ number }) => (number.number));

      if (claimedNumbersStrings.includes(numberObject.number)) {
          return res.status(400).json({ success: false, message: 'Number already claimed.' });
      }

      const userNumbersCount = await UserNumber.countDocuments({ user: userId });
      if (userNumbersCount >= user.numbers_limit) {
          return res.status(400).json({ success: false, message: 'You reached your maximum numbers limit.' });
      }

      const userNumberObject = await UserNumber.create({ user: userId, number: numberId });
      const numberObjects = await UserNumber.find({ user: userId }).populate('number');
      
      const mappedNumbers = numberObjects.map(({ number }) => ({
        id: number._id,
        number: number.number,
      }));

      return res.status(201).json({
          success: true,
          message: 'user claimed number successfully',
          user_numbers: mappedNumbers
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUserNumber = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  const numberId = req.query.number_id;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId)


      if (numberId) {
          const numberObject = await UserNumber.findOneAndDelete({ number: numberId, user: userId });
          if (!numberObject) {
              return res.status(400).json({ success: false, message: 'number_id does not exist or you do not own this number' });
          }
          const userNumbers = await UserNumber.find({ user: userId });
          return res.status(200).json({
              success: true,
              message: 'user removed number successfully',
              user_numbers: userNumbers
          });
      } else {
          await UserNumber.deleteMany({ user: userId });
          return res.status(200).json({
              success: true,
              message: 'user removed all his numbers successfully',
              user_numbers: []
          });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserNumberMessages = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user." });
    }

    const userNumberId = req.query.user_number_id;

    if (!userNumberId) {
      return res.status(400).json({ success: false, message: "user_number_id is required." });
    }

    const userNumberObject = await UserNumber.findOne({ user: userId, number: userNumberId }).populate('number');

    if (!userNumberObject) {
      return res.status(400).json({ success: false, message: "user_number_id does not exist." });
    }
    const messagesInfo = findMessages(userNumberObject.number.number);

    const numberMessages = messagesInfo.map(messageInfo => ({
      message_date: moment.utc(messageInfo[0], "YYYY-MM-DD HH:mm:ss").tz("Africa/Cairo").format(),
      message_receiver: messageInfo[1],
      message_sender: messageInfo[2],
      message_content: messageInfo[3]
    }));
    
    return res.status(200).json({
      success: true,
      number_messages: numberMessages
    });

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

