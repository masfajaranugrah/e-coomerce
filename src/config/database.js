import { Sequelize }  from 'sequelize';

  const sequelize = new Sequelize(`${process.env.SVR_PUB}`, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
  });

 export default sequelize;