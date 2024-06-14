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
exports.logoutController = exports.loginController = exports.registerController = exports.sendToken = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};
exports.sendToken = sendToken;
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingEmail = yield userModel_1.default.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse_1.default('Email is already registered', 500));
        }
        const user = yield userModel_1.default.create({ username, email, password });
        (0, exports.sendToken)(user, 201, res);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.registerController = registerController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorResponse_1.default('Please provide email or password', 400));
        }
        const user = yield userModel_1.default.findOne({ email }).select('+password');
        if (!user) {
            return next(new errorResponse_1.default('Invalid Credentials', 401));
        }
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse_1.default('Invalid Credentials', 401));
        }
        (0, exports.sendToken)(user, 200, res);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logged out Successfully',
    });
});
exports.logoutController = logoutController;
