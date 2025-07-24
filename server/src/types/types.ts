export type RequiredBy<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  number: string;
  is_admin?: boolean;
};
