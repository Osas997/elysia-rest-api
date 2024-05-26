import { Elysia, t } from "elysia";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controller/ProductController";
import { itRoute } from "../Interface";

const Route: itRoute = new Elysia()
  .get("/products", ({ query: { search } }) => getProducts(search))
  .get("/products/:id", ({ params: { id } }) => getProductById(id))
  .post("/products", ({ body }) => createProduct(body), {
    body: t.Object({
      name: t.String(),
      price: t.Numeric({
        error: {
          message: "price harus berupa angka",
        },
      }),
      id_category: t.Numeric(),
      image: t.File({
        type: "image",
        maxSize: 1024 * 1024 * 5,
      }),
    }),
  })
  .put("/products/:id", ({ params: { id }, body }) => updateProduct(id, body), {
    body: t.Object({
      name: t.String(),
      price: t.Numeric({
        error: {
          message: "price harus berupa angka",
        },
      }),
      id_category: t.Number(),
    }),
  })
  .delete("/products/:id", ({ params: { id } }) => deleteProduct(id));

export default Route;
