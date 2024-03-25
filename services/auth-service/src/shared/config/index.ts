export default {
    DATABASE_URL: process.env.DATABASE_URL || '',
    PORT: process.env.PORT || 8091,
    NODE_ENV: process.env.NODE_ENV || 'development',
    RABBITMQ_URI: process.env.RABBITMQ_URI || 'amqp://localhost',
    PUBLIC_KEY: process.env.PUBLIC_KEY || 'public_key',
    PRIVATE_KEY: process.env.PRIVATE_KEY || 'private',
    tokenInfo: {
        accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
        refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS || '0'),
        issuer: process.env.TOKEN_ISSUER || '',
        audience: process.env.TOKEN_AUDIENCE || '',
        jwt_secret: process.env.JWT_SECRET || '',
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || ''
    },
    GMAIL_USER: process.env.GMAIL_USER || '',
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || '',
    email: {
        from: process.env.EMAIL_FROM || ''
    },
    server_url: process.env.SERVER_URL || 'http://localhost:8091'
}