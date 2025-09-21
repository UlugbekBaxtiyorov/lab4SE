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
exports.remoteDelete = exports.remotePost = exports.remoteGet = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'http://localhost:8080';
const remoteGet = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${BASE_URL}${url}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`GET request to ${url} failed: ${error}`);
    }
});
exports.remoteGet = remoteGet;
const remotePost = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${BASE_URL}${url}`, data);
        return response.data;
    }
    catch (error) {
        throw new Error(`POST request to ${url} failed: ${error}`);
    }
});
exports.remotePost = remotePost;
const remoteDelete = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.delete(`${BASE_URL}${url}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`DELETE request to ${url} failed: ${error}`);
    }
});
exports.remoteDelete = remoteDelete;
