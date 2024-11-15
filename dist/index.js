"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const magicMoverRoutes_1 = __importDefault(require("./routes/magicMoverRoutes"));
const magicItemRoutes_1 = __importDefault(require("./routes/magicItemRoutes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use('/api/magicmovers', magicMoverRoutes_1.default);
app.use('/api/magicitems', magicItemRoutes_1.default);
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
(0, db_1.default)();
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}
exports.default = app;
