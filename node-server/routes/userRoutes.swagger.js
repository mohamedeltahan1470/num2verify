/**
 * @swagger
 * tags:
 *   - name: Register
 *     description: Operations for user registration
 *   - name: Login
 *     description: Operations for user login
 *   - name: Token
 *     description: Operations for token management
 *   - name: ForgotPassword
 *     description: Operations for password recovery and management 
 *   - name: Profile
 *     description: User profile operations
 *   - name: Logout
 *     description: User logout operations
 *   - name: Password Reset
 *     description: User password reset operations
 *   - name: Activation
 *     description: User account activation related endpoints
 *   - name: Numbers
 *     description: User numbers operations
 *   - name: "Number Messages"
 *     description: "Operations related to retrieving number messages"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags: [Register]
 *     summary: Register a new user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: "User access token (don't use this header in Try it out, use JWT auth lock instead)
 *           Default value : Bearer access_token"
 *       - name: Content-Type
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           default: application/json
 *         description: Specifies the format of the request body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *               confirm_password:
 *                 type: string
 *                 description: The password confirmation
 *               first_name:
 *                 type: string
 *                 description: The user's first name
 *               last_name:
 *                 type: string
 *                 description: The user's last name
 *             required:
 *               - email
 *               - password
 *               - confirm_password
 *               - first_name
 *               - last_name
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User is Created Successfully
 *                 user_details:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's unique ID
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                     first_name:
 *                       type: string
 *                       description: The user's first name
 *                     last_name:
 *                       type: string
 *                       description: The user's last name
 *                     picture:
 *                       type: string
 *                       description: The user's profile picture URL
 *                     date_joined:
 *                       type: string
 *                       format: date-time
 *                       description: The date the user joined
 *                     is_active:
 *                       type: boolean
 *                       description: Whether the user's account is active
 *                 activation_code:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Status of the activation code sent
 *                     message:
 *                       type: string
 *                       description: Message regarding activation code
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     email:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ['user with this email already exists.']
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: 'password is different than confirm_password'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'An error occurred during registration'
 */


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [Login]
 *     summary: Login a user
 *     description: Authenticate a user and return access and refresh tokens.
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: "User access token (don't use this header in Try it out, use JWT auth lock instead)
 *           Default value : Bearer access_token"
 *       - name: Content-Type
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           default: application/json
 *         description: Specifies the format of the request body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 access:
 *                   type: string
 *                   example: your_access_token
 *                 refresh:
 *                   type: string
 *                   example: your_refresh_token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f4f1a4f1f4f4e9c5a
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     picture:
 *                       type: string
 *                       example: /media/images/user/default_picture.png
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     date_joined:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-01T00:00:00Z
 *       400:
 *         description: Invalid login credentials or inactive account
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     non_field_errors:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ['Invalid login credentials']
 *                 - type: object
 *                   properties:
 *                     detail:
 *                       type: string
 *                       example: 'No active account found with the given credentials'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'An error occurred during login'
 */

/**
 * @swagger
 * /api/user/token-refresh:
 *   post:
 *     tags: [Token]
 *     summary: Refresh access token
 *     description: Generate a new access token using a valid refresh token.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh:
 *                 type: string
 *                 example: your_refresh_token
 *     responses:
 *       200:
 *         description: Successful token refresh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 access:
 *                   type: string
 *                   example: your_new_access_token
 *       400:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /api/user/token-refresh:
 *   post:
 *     tags: [Token]
 *     summary: Refresh access token
 *     description: Generate a new access token using a valid refresh token.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: User access token (don't use this header in Try It out, use JWT auth lock instead)
 *         schema:
 *           type: string
 *           default: "Bearer access_token"            
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         description: Format of the request body
 *         schema:
 *           type: string
 *           default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh:
 *                 type: string
 *                 example: your_refresh_token
 *     responses:
 *       200:
 *         description: Successful token refresh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 access:
 *                   type: string
 *                   example: your_new_access_token
 *       400:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /api/user/decode-token:
 *   post:
 *     tags: [Token]
 *     summary: Decode a token
 *     description: Decode the payload of a given token.
 *     parameters:         
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         description: Format of the request body
 *         schema:
 *           type: string
 *           default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: your_access_token
 *     responses:
 *       200:
 *         description: Successful token decoding
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *               additionalProperties: true
 *       400:
 *         description: Invalid token
 */

/**
 * @swagger
 * /api/user/forget-password:
 *   get:
 *     summary: Get forget password code
 *     tags: [ForgotPassword]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *       - in: query
 *         name: email
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully sent password reset code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password_reset_code_success:
 *                   type: boolean
 *                   example: true
 *                 password_reset_code_message:
 *                   type: string
 *                   example: "password_reset_code sent successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "email id required."
 *
 *   post:
 *     summary: Send forget password reset
 *     tags: [ForgotPassword]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: User access token (don't use this header in Try It out, use JWT auth lock instead)
 *         schema:
 *           type: string
 *           default: Bearer access_token            
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         description: Format of the request body
 *         schema:
 *           type: string
 *           default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password_reset_code:
 *                 type: string
 *                 example: "123456"
 *               new_password:
 *                 type: string
 *                 example: "newPassword123"
 *               confirm_new_password:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully."
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "new_password is different than confirm_new_password."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/user/password-reset:
 *   post:
 *     tags: [Password Reset]
 *     summary: Reset user password
 *     description: Allows a user to reset their password using a token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 description: The current password of the user
 *                 example: "OldPassword123"
 *               new_password:
 *                 type: string
 *                 description: The new password for the user
 *                 example: "NewPassword123"
 *               confirm_new_password:
 *                 type: string
 *                 description: Confirmation for the new password
 *                 example: "NewPassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully."
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "new_password must be different than old_password."
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid token."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     tags: [Logout]
 *     summary: Logout user
 *     description: Allows a user to log out by invalidating the access and refresh tokens.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh:
 *                 type: string
 *                 description: The refresh token of the user
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Refresh token required"
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags: [Profile]
 *     summary: Get user profile
 *     description: Retrieve the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 profile_details:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 607d1b8e8b6b0e001f8c5b35
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     picture:
 *                       type: string
 *                       example: /media/images/user/default_picture.png
 *                     date_joined:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-05-10T14:48:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 *  /api/user/profile:
 *   post:
 *     tags: [Profile]
 *     summary: Update user profile
 *     description: Update the profile information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Updated Successfully
 *                 profile_details:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 607d1b8e8b6b0e001f8c5b35
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     first_name:
 *                       type: string
 *                       example: Jane
 *                     last_name:
 *                       type: string
 *                       example: Smith
 *                     picture:
 *                       type: string
 *                       example: /media/images/user/default_picture.png
 *                     date_joined:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-05-10T14:48:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 *  /api/user/profile:
 *   delete:
 *     tags: [Profile]
 *     summary: Delete user profile
 *     description: Permanently delete the currently authenticated user's profile.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     responses:
 *       200:
 *         description: Successfully deleted user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Deleted Successfully
 *                 profile_details:
 *                   type: object
 *                   properties: {}
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/user/activation-code:
 *   get:
 *     tags: [Activation]
 *     summary: Get activation code for account activation
 *     description: This endpoint retrieves the activation code for a given email address.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email address associated with the account.
 *         schema:
 *           type: string
 *           example: user@example.com
 *     responses:
 *       200:
 *         description: Activation code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Activation code sent successfully.
 *       400:
 *         description: Email is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: email is required.
 *       404:
 *         description: No account associated with the email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: there is no account associated with this email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/user/activation-code:
 *   post:
 *     tags: [Activation]
 *     summary: Activate user account
 *     description: This endpoint activates the user account using the provided email and activation code.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address associated with the account.
 *                 example: user@example.com
 *               activation_code:
 *                 type: string
 *                 description: The activation code sent to the email address.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Account activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: account activated successfully.
 *       400:
 *         description: Missing email or activation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: activation_code required.
 *       404:
 *         description: No account associated with the email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: there is no account associated with this email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/user/numbers:
 *   get:
 *     tags: [Numbers]
 *     summary: Retrieve user numbers
 *     description: Returns a list of numbers claimed by the user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     responses:
 *       200:
 *         description: A list of user numbers.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             numbers_list:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   number:
 *                     type: string
 *                     example: "+123456789"
 *       500:
 *         description: Server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Error message"
 */

/**
 * @swagger
 * /api/user/numbers:
 *   post:
 *     tags: [Numbers]
 *     summary: Claim a user number
 *     description: Allows a user to claim a number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *     responses:
 *       201:
 *         description: Number claimed successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: "user claimed number successfully"
 *             user_numbers:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   number:
 *                     type: string
 *                     example: "+123456789"
 *       400:
 *         description: Bad request.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "number_id is required."
 *       500:
 *         description: Server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Error message"
 */

/**
 * @swagger
 * /api/user/numbers:
 *   delete:
 *     tags: [Numbers]
 *     summary: Delete a user number
 *     description: Deletes a specific number claimed by the user or all numbers if no ID is provided.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *       - in: query
 *         name: id
 *         required: false
 *         description: The ID of the number to delete. If not provided, all user numbers will be deleted.
 *         type: string
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Number deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: "user removed number successfully"
 *             user_numbers:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   number:
 *                     type: string
 *                     example: "+123456789"
 *       400:
 *         description: Bad request.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "number_id does not exist or you do not own this number"
 *       500:
 *         description: Server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Error message"
 */

/**
 * @swagger
 * /api/user/number/messages:
 *   get:
 *     tags: [Number Messages]
 *     summary: "Get user number messages"
 *     description: "Retrieve messages associated with a user's number."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *       - in: query
 *         name: user_number_id
 *         required: true
 *         description: "The ID of the user's number."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Messages retrieved successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 number_messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-27T12:00:00+02:00"
 *                       message_receiver:
 *                         type: string
 *                         example: "+201234567890"
 *                       message_sender:
 *                         type: string
 *                         example: "+201098765432"
 *                       message_content:
 *                         type: string
 *                         example: "Hello, this is a test message."
 *       400:
 *         description: "Bad Request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "user_number_id is required."
 *       401:
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Authorization token missing."
 *       500:
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */