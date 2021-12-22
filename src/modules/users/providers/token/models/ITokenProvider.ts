import { sign } from 'jsonwebtoken';

type Options = {
  subject: string;
  expiresIn: string;
};

export interface ITokenProvider {
  generateToken(secret: string, options: Options): string;
}
