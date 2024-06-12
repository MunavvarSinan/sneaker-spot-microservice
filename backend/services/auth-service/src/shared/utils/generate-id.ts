import { init } from '@paralleldrive/cuid2';

interface GenerateId {
    generate: () => string;
}

export const generateId: GenerateId = {
    generate: () => {
        const createId = init({
            random: Math.random,
            length: 10,
            fingerprint: 'ecommerce-auth-service'
        })
        return createId();
    }
}