import config from '@shared/config';
import nodemailer, { type Transporter } from 'nodemailer'

let transporter: Transporter | null = null;

const createTestAccount = async () => {
    try {
        const account = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })
        console.log('Test account created:', account);
    } catch (error) {
        console.error('Failed to create a test account:', error);
    }
}

if (config.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.GMAIL_USER,
            pass: config.GMAIL_PASSWORD
        }
    })
} else {
    void createTestAccount();
}

export default transporter;