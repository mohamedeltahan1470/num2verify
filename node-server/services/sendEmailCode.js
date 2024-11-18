import nodemailer from 'nodemailer';

export const sendEmailCode = async (recipientEmail, type) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const action = (type == "Activation_Code")? "activate your email address" : "reset your password";

    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: 'Activation Code from Num2Verify',
        html: `
            <div style="font-family: Helvetica, sans-serif; text-align: center; background-color: #f4f6f8; padding: 20px 20px 0px 20px; border-radius: 10px;">
                <h2 style="color: #005bb5;">Welcome to Num2Verify!</h2>
                
                <p style="color: #333;">Thank you for choosing our service. To ${action}, please use the following One-Time Password (OTP):</p>
                <div style="margin: 20px; padding: 15px; background-color: #005bb5; color: white; border-radius: 18px; display: inline-block; font-size: 19px; font-weight: bold;">
                    ${otp}
                </div>
                <p style="color: #333; margin-top: 20px;">This code is valid for a limited time. If you did not request this code, please disregard this email.</p>
                <p style="color: #555;">Best Regards,<br/>The Num2Verify Team</p>
                <p style="color: #f4f6f8;">OTP code ${otp} - Num2 Verify</p>

            </div>

        `,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        return { 
            send_activation_code_status: true, 
            send_activation_code_message: 'Activation code sent successfully.',  
            otp 
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return { 
            send_activation_code_status: false, 
            send_activation_code_message: `Failed to send activation code: ${error.message}` 
        };
    }
};
