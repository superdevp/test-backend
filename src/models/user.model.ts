import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => Promise<{ token: string; }>;
  generateApiKey: (name: string, permissions: string[]) => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateToken = function () {
  const token = crypto.randomBytes(16).toString('hex');
  // this.refreshTokens.push({ token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  return token;
};

UserSchema.methods.generateApiKey = function (name: string, permissions: string[] = ['read']) {
  const apiKey = `ak_${crypto.randomBytes(24).toString('hex')}`;

  this.apiKeys.push({
    key: apiKey,
    name,
    createdAt: new Date(),
    lastUsed: null,
    permissions,
  });

  return apiKey;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
