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
const crypto_1 = require("crypto");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('Magic Items API', () => {
    it('should fetch a magic item by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/magicitems/6735f2508c64bd5db7edd7f7');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
    }));
    it('should add a new magic item', () => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = { name: `testItem-${(0, crypto_1.randomUUID)()}`, weight: 10 };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/magicitems/add')
            .send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newItem.name);
    }));
});
