export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFilters extends Partial<Record<keyof IUser, string>> {}
