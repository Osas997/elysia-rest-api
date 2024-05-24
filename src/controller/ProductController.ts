import prisma from "../../prisma/client";

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({orderBy: {created_at: 'desc'} , include: {category: true}});
        if(products.length === 0) {
            return {
                "success" : true,
                "message" : "No products found"
            }
        }

        return {
            "success" : true,
            "data" : products
        }

    } catch (e) {
        console.log(e);
        return {
            "success" : false,
            "message" : e
        }        
    }
}

export const getProductById = async (id: string) => {

    const productId = parseInt(id);

    if (isNaN(productId)) {
        return {
            success: false,
            message: "Invalid product ID"
        };
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                category: true
            }
        });

        if(!product) {
            return {
                "success" : false,
                "message" : "Product not found"
            }
        }

        return {
            "success" : true,
            "data" : product
        }
    } catch (e) {
        console.log(e);
        return {
            "success" : false,
            "message" : e
        }
    }
}

export const createProduct = async (body: { name: string, price: number, id_category: number}) => {
    const { name, price, id_category } = body;
    try {
        const product = await prisma.product.create({
            data: {
                name: name,
                price : price,
                id_category : id_category
            }
        })
        
        return {
            "success" : true,
            "data" : product
        }
    } catch (e) {
        console.log(e);
        return {
            "success" : false,
            "message" : e
        }
    }
}

export const updateProduct = async (id: string, body: { name: string, price: number, id_category: number} ) => {

    const productId = parseInt(id);
    const { name, price, id_category } = body;

    if (isNaN(productId)) {
        return {
            success: false,
            message: "Invalid product ID"
        };
    }

    try {
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: name,
                price : price,
                id_category : id_category
            }    
        });

        if(!product) {
            return {
                "success" : false,
                "message" : "Product not found"
            }
        }

        return {
            "success" : true,
            "data" : product
        }

    } catch (e) {
        console.log(e);
        return {
            "success" : false,
            "message" : e
        }
    }
}

export const deleteProduct = async (id: string) => {
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return {
            success: false,
            message: "Invalid product ID"
        };
    }

    try {
        await prisma.product.delete({
            where: {
                id: productId
            } 
        });
    
        return {
            "success" : true,
            "message" : "Product deleted successfully"
        }
    } catch (e) {
        console.log(e);
        return {
            "success" : false,
            "message" : e
        }
    }

    return productId; 

}