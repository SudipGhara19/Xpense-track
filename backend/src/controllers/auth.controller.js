
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import Transaction from '../models/transaction.model.js';


//--------------------------------------------- SIGNUP CONTROLLER -------------------------------------------
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists, go to sign in."));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create a default Transaction document for the user
    const newTransaction = new Transaction({ user: savedUser._id });
    const savedTransaction = await newTransaction.save();

    // Update the user with the transaction ID
    savedUser.transactionId = savedTransaction._id;
    await savedUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


//--------------------------------------------- SIGNIN CONTROLLER -------------------------------------------
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(400, 'User not found, please sign up.'));
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(401, 'Invalid credentials.'));
    }

    const { password: pass, ...rest } = user._doc;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user: rest });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};