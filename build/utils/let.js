"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentBpm = void 0;
const Tempo_1 = __importDefault(require("../Tempo"));
exports.currentBpm = new Tempo_1.default(120);
