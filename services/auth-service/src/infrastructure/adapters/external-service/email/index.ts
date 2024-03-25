import { AuthFailureError } from "@application/core/api/api-error";
import transporter from "./nodemailer/nodemailer.config";
import config from "@shared/config";


interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export class EmailAdapter {

    constructor() {
        transporter?.verify((error, success) => {
            if (error) {
                console.error('Failed to connect to email server:', error);
            } else {
                console.log('Connected to email server:', success);
            }
        })
    }

    private sendMail(options: MailOptions): void {
        transporter?.sendMail(options, (error, info) => {
            if (error) {
                new AuthFailureError('Failed to send email');
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
    public sendResetEmail(email: string, token: string): void {
        const resetLink = `${config.server_url}/api/reset-password/${token}`;
        const mailOptions: MailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Password reset',
            html: `Please click <a href="${resetLink}">here</a> to reset your password.`
        };
        console.log(resetLink);
        this.sendMail(mailOptions);
    }

    public sendVerifyEmail(email: string, token: string): void {
        const verifyLink = `${config.server_url}/api/email/verify-email/${token}`;
        const mailOptions: MailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Email verification',
            html: `Please click <a href="${verifyLink}">here</a> to verify your email.`
        };
        console.log(verifyLink);
        this.sendMail(mailOptions);
    }
}