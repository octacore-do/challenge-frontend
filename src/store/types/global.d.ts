export {};
declare global {
  export type Nullable<T> = T | null;
  export interface Ok {
    ok: boolean;
  }
  export type Stat = {
    amount: string;
    title: string;
  };
}
