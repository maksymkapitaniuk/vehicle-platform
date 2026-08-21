export type User = {
  id: number;
  name: string;
  email: string;
  birthDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  password: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;
