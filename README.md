# Magic Transporters API

## Overview

This project is a RESTful API system for managing **Magic Transporters** that can load items and start and end transport missions. It is built with TypeScript, Express.js, and MongoDB using Mongoose for data management.

## Requirements

- Node.js (version 14 or newer)
- MongoDB (can be used locally or with MongoDB Atlas)
- TypeScript
- A package manager like `npm`

## Project Installation

1. **Download the Project**
   - Download or clone the project to your local machine.

2. **Install Dependencies**
   - Navigate to the project folder and run the following command to install all required packages:

     ```bash
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root of the project and add your database connection string as follows:

     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/magic_transporters
     PORT=5000
     ```

4. **Build and Run the Project**

   You can build and run the project easily with the following commands:

   - **To build the project**:

     ```bash
     npm run build
     ```

   - **To run the project**:

     ```bash
     npm start
     ```

   Alternatively, you can use `ts-node` to run the project directly:

   ```bash
   npx ts-node src/index.ts
   ```

## Project Structure

```plaintext
.
├── src
│   ├── controllers
│   │   ├── magicItemController.ts    # Handles business logic for managing magic items.
│   │   └── magicMoverController.ts   # Handles business logic for managing magic movers.
│   ├── models
│   │   ├── MagicMover.ts             # Schema and model definition for a magic mover.
│   │   ├── MagicItem.ts              # Schema and model definition for magic items.
│   │   └── MoverLog.ts               # Schema and model definition for mover activity logs.
│   ├── routes
│   │   ├── magicItemRoutes.ts        # Defines API endpoints for magic items.
│   │   └── magicMoverRoutes.ts       # Defines API endpoints for magic movers.
│   ├── index.ts                      # The main entry point for initializing and starting the server.
│   └── jest.config.js                # Jest configuration file for testing setup.
├── tests
│   ├── magicItemRoutes.test.ts       # tests for magicItem Api.
│   └── magicMoverRoutes.test.ts      # tests for magicMover Api.
└── README.md                         # this file.
```

## API Usage

### Magic Movers Routes

- **Add a New Magic Mover**
  - **POST** `/api/magicmovers/add`
  - **Body**: `{ "name": "Mover Name", "weightLimit": 100 }`

- **Load Items to a Mover**
  - **POST** `/api/magicmovers/load/:id`
  - **Body**: `{ "itemNames": ["item1", "item2"] }`

- **Start a Mission**
  - **GET** `/api/magicmovers/start-mission/:id`

- **End a Mission**
  - **GET** `/api/magicmovers/end-mission/:id`

- **Get Leaderboard of Active Movers**
  - **GET** `/api/magicmovers/leaderboard`


### Magic Item Routes

- **Get Mover By Id**
  - **GET** `/api/magicmovers/mover/:id`

- **Add a New Item**
  - **POST** `/api/magicitems/add`
  - **Body**: `{ "name": "Mover Name", "weight": 20 }`

### Postman Request Examples

1. **Add a Magic Mover**

   ```json
   POST http://localhost:5000/api/magicmovers/add
   Body: { "name": "Magic Mover 1", "weightLimit": 150 }
   ```

2. **Load Items**

   ```json
   POST http://localhost:5000/api/magicmovers/load/{moverId}
   Body: { "itemNames": ["item1", "item2"] }
   ```

3. **Start a Mission**

   ```json
   GET http://localhost:5000/api/magicmovers/start-mission/{moverId}
   ```

4. **End a Mission**

   ```json
   GET http://localhost:5000/api/magicmovers/end-mission/{moverId}
   ```

5. **Get Active Movers Leaderboard**

   ```json
   GET http://localhost:5000/api/magicmovers/leaderboard
   ```
   
6. **Get Mover by ID**

   ```json
   GET http://localhost:5000/api/magicmovers/mover/{moverId}
   ```

7. **Add a New Item**

   ```json
   POST http://localhost:5000/api/magicitems/add
   Body: { "name": "item1", "weight": 20 }
   ```

## Documentation

- **JSDoc**: This project uses JSDoc to document the code. You can view the full code documentation in the source files.
- **Swagger**: The API documentation is available live through Swagger. Once the project is running, you can access the Swagger UI at `http://localhost:5000/api-docs`.

## Testing

The project uses **Jest** and **Supertest** for end-to-end testing. You can run the tests with the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
