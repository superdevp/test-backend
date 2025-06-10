import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'helloworld!';

const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export {
    generateAccessToken
}