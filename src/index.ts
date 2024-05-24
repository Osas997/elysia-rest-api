import { Elysia, error , t} from "elysia";
import route from "./routes";

const app = new Elysia();

app.use(route);

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const data = [
  {
    id: 1,
    name: "BRoook",
    age: 20
  },
  {
    id: 2,
    name: "YHOHOHO",
    age: 20
  }
]