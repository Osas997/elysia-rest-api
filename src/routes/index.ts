import { Elysia , t} from "elysia";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/ProductController";

const route = new Elysia({prefix: "/api"})
    .get("/products", getProducts)
    .get("/products/:id", ({ params: { id }}) => getProductById(id))
    .post("/products",({ body }) => createProduct(body) , {
        body: t.Object({
            name: t.String(),
            price: t.Numeric({
                error: {
                    "message" : "price harus berupa angka"
                }
            }),
            id_category: t.Number()
        })
    })
    .put("/products/:id", ({ params: { id } , body}) => updateProduct(id, body) , {
        body: t.Object({
            name: t.String(),
            price: t.Numeric({
                error: {
                    "message" : "price harus berupa angka"
                }
            }),
            id_category: t.Number()
        })
    })
    .delete("/products/:id", ({ params: { id }}) => deleteProduct(id))

export default route