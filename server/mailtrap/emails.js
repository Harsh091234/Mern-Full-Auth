import { transporter, sender } from "./mailtrap.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = email;
    const mailOptions = {
      from: `"${sender.name}" <${sender.email}>`,
      to: recipient,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };
    try {
        
        const res = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message);
        throw new Error("error sending verificaton email")
    }
}

export const sendWelcomeEmail = async(email, name) => {
  const recipient = email;
  const mailOptions = {
    from: `"${sender.name}" <${sender.email}>`,
    to: recipient,

    html: WELCOME_EMAIL_TEMPLATE.replace(
      "{Your App Team}",
      "ShrakusCOM"
    ).replace("{userName}", name),
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("welcome email sent successfully");
  } catch (error) {
    console.log(error.message);
    throw new Error("error sending welcome email");
  }
}

export const sendPasswordResetEmail = async (email, url) => {
  const recipient = email;
  console.log("email", email);
  const mailOptions = {
    from: `"${sender.name}" <${sender.email}>`,
    to: recipient,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      url
    ),
  };
  try {
    const res = await transporter.sendMail(mailOptions);
 
  } catch (error) {
    console.log(error.message);
    throw new Error("error sending password reset email");
  }
};

export const sendResetSuccessEmail = async(email) => {
  const recipient = email;
  const mailOptions = {
    from: `"${sender.name}" <${sender.email}>`,
    to: recipient,
    subject: "Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
    throw new Error("error sending reset success email");
  }
}