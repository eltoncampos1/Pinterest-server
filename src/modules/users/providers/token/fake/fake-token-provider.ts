import { ITokenProvider } from '../models/ITokenProvider';

export class FakeTokenProvider implements ITokenProvider {
  generateToken(secret: string, options: { subject: string; expiresIn: string }): string {
    return `new-token${secret}`;
  }
}
