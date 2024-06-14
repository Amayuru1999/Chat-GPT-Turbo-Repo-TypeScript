import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import ErrorResponse from '../utils/errorResponse';


export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

   
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new ErrorResponse('Email is already registered', 500));
    }

    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email or password', 400));
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({
    success: true,
    message: 'Logged out Successfully',
  });
};
