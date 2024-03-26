export class Todo {
  constructor(
    public todoId: number,
    public title: string,
    public description: string,
    public status: number,
    public due: Date,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
  ) {}
}
