import { sign } from 'jsonwebtoken';
import { ITokenProvider } from '../models/ITokenProvider';

export class JsonWebTokenProvider implements ITokenProvider {
  generateToken(secret: string, options: { subject: string; expiresIn: string }): string {
    return sign({}, secret, options);
  }
}
