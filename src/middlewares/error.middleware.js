import {NODE_ENV} from '../config/env.js';

export  class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status =  `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorHandler = (err, req, res, next) => {

        if (NODE_ENV === 'development') {
            res.status(err.statusCode || 500).json({
                status: err.status,
                error: err,
                message: err.message,
                stack: err.stack,
            });
        } else if (NODE_ENV === 'production') {
            res.status(err.statusCode || 500).json({
                status: err.status,
                message: err.isOperational ? err.message : 'Something went wrong!',
            });
        }
    };
 
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
 
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});