"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Connects to the MongoDB database using Mongoose.
 * Logs success message on successful connection, otherwise logs an error and exits the process.
 *
 * @returns {Promise<void>} - Resolves if the connection is successful, otherwise throws an error.
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost:27017/magic-transporters', {
        // Additional connection options can be added here if needed.
        });
        console.log('MongoDB connected successfully');
        console.log('start...');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure if the connection fails.
    }
});
exports.default = connectDB;
