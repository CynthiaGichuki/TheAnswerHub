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
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getUserById = exports.loginUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, username, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = {
            userID: (0, uuid_1.v4)(),
            fullname: fullname,
            email: email,
            username: username,
            password: hashedPassword
        };
        if (dbConnection_1.default.checkConnection()) {
            const userCreated = yield dbConnection_1.default.exec('addUser', { userID: user.userID, fullname: user.fullname, email: user.email, username: user.username, password: user.password, is_admin: '0', is_deleted: '0', is_sent: '0' });
            if (userCreated) {
                const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
                console.log(token);
                res.status(200).json({ message: 'User Registered Successfully', token, fullname });
            }
            else {
                res.status(500).json({ message: 'Error creating user' });
            }
        }
        else {
            // console.log("test")
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.createUser = createUser;
// login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, is_admin } = req.body;
        if (dbConnection_1.default.checkConnection()) {
            const user = yield dbConnection_1.default.exec('getUserbyEmail', { email: email });
            if (user.length > 0) {
                const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
                if (validPassword) {
                    const token = jsonwebtoken_1.default.sign(user[0], process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.status(200).json({ message: 'User Logged in Successfully', "token": token, 'is_admin': user[0].is_admin, 'fullname': user[0].fullname });
                }
                else {
                    res.status(500).json({ message: 'Invalid password' });
                }
            }
            else {
                res.status(500).json({ message: 'Invalid email' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.loginUser = loginUser;
// get a user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userID;
        if (!id) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const user = yield dbConnection_1.default.exec('getUserById', { userID: id });
            console.log(user);
            if (user && user.length > 0) {
                res.status(200).json(user[0]);
            }
            else {
                res.status(404).json({ message: 'User Not found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getUserById = getUserById;
// update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.userID;
        // get user from database
        if (dbConnection_1.default.checkConnection()) {
            const userFound = yield dbConnection_1.default.exec('getUserById', { userID: userID });
            if (userFound.length > 0) {
                const user = {
                    userID: userFound[0].userID,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    is_admin: req.body.is_admin = '0',
                    is_deleted: req.body.is_deleted = '0',
                    is_sent: req.body.is_sent = '0'
                };
                const userUpdated = yield dbConnection_1.default.exec('updateUser', user);
                if (userUpdated && userUpdated.length > 0) {
                    res.status(200).json({ message: 'User updated successfully', userUpdated });
                }
            }
            else {
                res.status(500).json({ message: 'User not found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
// delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.userID;
        if (dbConnection_1.default.checkConnection()) {
            const userFound = yield dbConnection_1.default.exec('getUserById', { userID: userID });
            if (userFound.length > 0) {
                yield dbConnection_1.default.exec('deleteUser', { userID: userFound[0].userID });
                res.status(200).json({ message: 'User deleted successfully' });
            }
            else {
                res.status(500).json({ message: 'User not found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteUser = deleteUser;
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dbConnection_1.default.checkConnection()) {
            const users = yield dbConnection_1.default.exec('getAllUsers');
            if (users[0].email) {
                res.status(200).json(users);
            }
            else {
                res.status(200).json({ message: 'No users found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
