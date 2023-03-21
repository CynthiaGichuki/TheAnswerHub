import { Request, Response } from 'express';
import UserModel from '../Models/UserModel';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import db from '../databaseHelpers/dbConnection';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: {
        fullname: string;
        email: string;
        username: string;
        password: string;
        is_admin: string
    },
    params: {
        userID: string;
    }
}


// create a user

export const createUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { fullname, email, username, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            userID: uuid() as string,
            fullname: fullname as string,
            email: email as string,
            username: username as string,
            password: hashedPassword
        }

        if (db.checkConnection() as unknown as boolean) {
            const userCreated = await db.exec('addUser', { userID: user.userID, fullname: user.fullname, email: user.email, username: user.username, password: user.password, is_admin: '0', is_deleted: '0', is_sent: '0' });

            if (userCreated) {
                const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1d' });
                console.log(token);

                res.status(200).json({ message: 'User Registered Successfully', token, fullname });
            } else {
                res.status(500).json({ message: 'Error creating user' });
            }
        } else {
            // console.log("test")
            res.status(500).json({ message: 'Error connecting to database' });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}


// login a user

export const loginUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { email, password, is_admin } = req.body;
        if (db.checkConnection() as unknown as boolean) {
            const user = await db.exec('getUserbyEmail', { email: email });
            if (user.length > 0) {
                const validPassword = await bcrypt.compare(password, user[0].password);

                if (validPassword) {

                    const token = jwt.sign(user[0], process.env.JWT_SECRET as string, { expiresIn: '1d' });

                    res.status(200).json({ message: 'User Logged in Successfully', "token": token, is_admin: user[0].is_admin, fullname: user[0].fullname });
                } else {
                    res.status(500).json({ message: 'Invalid password' });
                }
            } else {
                res.status(500).json({ message: 'Invalid email' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// get a user by ID

export const getUserById = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.userID

        if (!id) {
            return res.status(400).json({ message: 'User ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const user: UserModel[] = await db.exec('getUserById', { userID: id }) as unknown as UserModel[]
            console.log(user);

            if (user && user.length > 0) {
                res.status(200).json(user[0])
            } else {
                res.status(404).json({ message: 'User Not found' })
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// update a user

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        // get user from database
        if (db.checkConnection() as unknown as boolean) {
            const userFound: UserModel[] = await db.exec('getUserById', { userID: userID });
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
                }

                const userUpdated = await db.exec('updateUser', user);
                if (userUpdated && userUpdated.length > 0) {
                    res.status(200).json({ message: 'User updated successfully', userUpdated });
                }
            } else {
                res.status(500).json({ message: 'User not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// delete a user

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        if (db.checkConnection() as unknown as boolean) {
            const userFound: UserModel[] = await db.exec('getUserById', { userID: userID });

            if (userFound.length > 0) {

                await db.exec('deleteUser', { userID: userFound[0].userID });


                res.status(200).json({ message: 'User deleted successfully' });

            } else {
                res.status(500).json({ message: 'User not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// get all users

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        if (db.checkConnection() as unknown as boolean) {
            const users: UserModel[] = await db.exec('getAllUsers');
            if (users[0].email) {
                res.status(200).json(users);
            } else {
                res.status(200).json({ message: 'No users found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
