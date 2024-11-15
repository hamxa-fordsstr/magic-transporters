import express from 'express';
import connectDB from './config/db';
import magicMoverRoutes from './routes/magicMoverRoutes';
import magicItemRoutes from './routes/magicItemRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/magicmovers', magicMoverRoutes);
app.use('/api/magicitems', magicItemRoutes);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Magic Transporters API',
      version: '1.0.0',
      description: 'API for managing Magic Movers and Items',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

export default app;
