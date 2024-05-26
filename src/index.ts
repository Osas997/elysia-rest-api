import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import Route from "./routes";
import staticPlugin from "@elysiajs/static";

const app = new Elysia();

app.use(cors());

app.onBeforeHandle(({ set, headers: { authorization } }) => {
  if (authorization && authorization !== "kemem") {
    return (set.status = "Forbidden");
  }
});

app.use(staticPlugin());

app.group("/api", (app) => app.use(Route));

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
