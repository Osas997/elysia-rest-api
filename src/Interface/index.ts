import Elysia from "elysia";

export interface Response {
  success: boolean;
  message?: string | unknown;
  data?: any;
}

export interface ProductBody {
  name: string;
  price: number;
  id_category: number;
  image?: any;
}

export type itRoute = Elysia<
  "",
  false,
  {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
  },
  {
    type: {};
    error: {};
  },
  {
    schema: {};
    macro: {};
  },
  {},
  {
    derive: {};
    resolve: {};
    schema: {};
  },
  {
    derive: {};
    resolve: {};
    schema: {};
  }
>;
