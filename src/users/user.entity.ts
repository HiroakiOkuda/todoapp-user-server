export class User {
  constructor(
    public userId: number,
    public username: string,
    public password: string,
    public email: string,
    public createdAt: Date | undefined = undefined,
    public updatedAt: Date | undefined = undefined,
    public deletedAt: Date | undefined = undefined,
    public hashedRefreshToken: string | undefined = undefined,
  ) {}
}
