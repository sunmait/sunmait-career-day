export interface ICryptoService {
  encrtyptAES(data: string): string;
  decryptAES(data: string): string;
  passwordHashing(password: string): string;
  passwordsVerification(password: string, hashedPassword: string): boolean;
}
