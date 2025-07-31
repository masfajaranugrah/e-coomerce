import app from "./app.js";
import "./config/env.js";

 (async () => {
    try {
        const {default: sequelize} = await import("./config/database.js");
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database connection established successfully.");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();