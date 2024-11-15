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
describe('Magic Movers API', () => {
    it('should add a new Magic Mover', () => __awaiter(void 0, void 0, void 0, function* () {
        let newMover = {
            name: `TestMover-${(0, crypto_1.randomUUID)()}`,
            weightLimit: 100
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/magicmovers/add')
            .send(newMover);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newMover.name);
        expect(response.body.weightLimit).toBe(newMover.weightLimit);
    }));
    it('should load items into a Magic Mover', () => __awaiter(void 0, void 0, void 0, function* () {
        const itemNames = ['item1', 'item2'];
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/magicmovers/load/6735cfe3f47561c60dd8ea47')
            .send({ itemNames });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Items loaded successfully');
        expect(response.body.mover.state).toBe('loading');
    }));
    it('should start a mission for a Magic Mover', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/magicmovers/start-mission/6735cfe3f47561c60dd8ea47');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Mission started');
        expect(response.body.mover.state).toBe('on-mission');
    }));
    it('should end a mission for a Magic Mover', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/magicmovers/end-mission/6735cfe3f47561c60dd8ea47');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Mission ended and items unloaded');
        expect(response.body.mover.state).toBe('resting');
    }));
    it('should retrieve the leaderboard of top Magic Movers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/magicmovers/leaderboard');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('missionCount');
    }));
});
