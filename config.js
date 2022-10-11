import dotenv from "config.js";

const config = () => {
    switch (process.env.NODE_ENV) {
        case 'test':
        case 'TEST':
            dotenv.config({path: '.env.test'});
            break;
        default:
            dotenv.config();
    }
};

export default Object.freeze(config);
