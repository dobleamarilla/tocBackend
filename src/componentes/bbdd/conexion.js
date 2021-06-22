"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
mongoose_1.default.connect('mongodb://localhost/tocgame', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});
