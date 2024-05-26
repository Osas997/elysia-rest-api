import prisma from "../../prisma/client";

interface Response {
  success: boolean;
  message?: string | unknown;
  data?: any;
}

interface ProductBody {
  name: string;
  price: number;
  id_category: number;
}

export const getProducts = async (search?: string): Promise<Response> => {
  try {
    const products = search
      ? await prisma.product.findMany({
          where: {
            name: {
              contains: search,
            },
          },
          include: { category: true },
        })
      : await prisma.product.findMany({
          include: { category: true },
        });

    if (products.length === 0) {
      return { success: true, message: "No products found" };
    }

    return { success: true, data: products };
  } catch (e: unknown) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const getProductById = async (id: string): Promise<Response> => {
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return { success: false, message: "Invalid product ID" };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, data: product };
  } catch (e: unknown) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const createProduct = async (body: ProductBody): Promise<Response> => {
  const { name, price, id_category } = body;

  try {
    const product = await prisma.product.create({
      data: { name, price, id_category },
    });

    return { success: true, data: product };
  } catch (e: unknown) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const updateProduct = async (
  id: string,
  body: ProductBody
): Promise<Response> => {
  const productId = parseInt(id);
  const { name, price, id_category } = body;

  if (isNaN(productId)) {
    return { success: false, message: "Invalid product ID" };
  }

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { name, price, id_category },
    });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, data: product };
  } catch (e: unknown) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const deleteProduct = async (id: string): Promise<Response> => {
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return { success: false, message: "Invalid product ID" };
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
    return { success: true, message: "Product deleted successfully" };
  } catch (e: unknown) {
    console.log(e);
    return { success: false, message: e };
  }
};
