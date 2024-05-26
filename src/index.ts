import { Elysia } from "elysia";
import { cors }  from "@elysiajs/cors";
import route from "./routes";

const app = new Elysia();

app.use(cors());
app.use(route);

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);