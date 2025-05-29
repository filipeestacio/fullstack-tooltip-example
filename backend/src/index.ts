import { connect } from "./db";
import app from "./app";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, async () => {
    await connect();
    console.log("Server is running on port 3000");
});