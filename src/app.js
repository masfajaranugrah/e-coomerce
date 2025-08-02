import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from 'cookie-parser';

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./docs/swaggerOptions.js";
 
const swaggerSpec = swaggerJSDoc(swaggerOptions);




const app = express();
 

// route 
import {errorHandler} from "./middlewares/error.middleware.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from './routes/transaction.js';
import usersRoutes from './routes/user.js';
import authRoutes from './routes/authRoutes.js';
import couponRoutes from './routes/counponRoutes.js';
 


 const whitelist = ['http://localhost:3000','https://c7fd0769a117.ngrok-free.app', undefined];
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
// Swagger setup

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/coupons', couponRoutes);


export default app;