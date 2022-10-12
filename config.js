import dotenv from 'dotenv';

const init = () => {
    switch (process.env.NODE_ENV) {
        case 'test':
        case 'TEST':
            dotenv.config({path: '.env.test'});
            break;
        default:
            dotenv.config();
    }
};

export default init;
