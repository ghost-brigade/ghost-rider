import dotenv from 'dotenv';

class config {
    static env = () => {
        switch (process.env.NODE_ENV) {
            case 'test':
            case 'TEST':
                dotenv.config({path: '.env.test'});
                break;
            default:
                dotenv.config();
        }
    };
}

export default config;
