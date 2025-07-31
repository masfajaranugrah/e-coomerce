import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from 'cookie-parser';

const app = express();


// route 
import {errorHandler} from "./middlewares/error.middleware.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from './routes/transaction.js';
// import usersRoutes from './routes/user.js';
import authRoutes from './routes/authRoutes.js';
 
const whitelist = ['http://localhost:8080','https://722159a37f7c.ngrok-free.app', undefined];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
// app.use(requestLogger());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the API",
    });
});


app.use(errorHandler)

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/transactions', transactionRoutes);
// app.use('/api/v1/users', usersRoutes);


export default app;