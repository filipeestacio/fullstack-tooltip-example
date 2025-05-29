import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Filipes Products API',
            version: '1.0.0',
            description: 'API documentation for Filipes Products API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;