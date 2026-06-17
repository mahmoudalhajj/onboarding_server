export type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};
