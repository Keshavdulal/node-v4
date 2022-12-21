// Product Handlers
import prisma from "../db";

// GET ALL
export const getProducts = async (req, res) => {
  // get full user info from db based on user id
  // get products owned by user

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      // making sure products are joined (SQL) or populated (mongo)
      products: true,

      // advance customization
      // products: {
      //   foo:true,
      //   bar:false,
      // },
    },
  });

  // putting user is convention
  res.json({ data: user.products });
};

// GET ONE
export const getOneProduct = async (req, res) => {
  // have a product id first
  // query it on Product table/collection
  // make sure it's scoped to the sign-in user so that others cannot access it

  const id = req.params.id; // extracted from url-params via urlencoded MW

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  // findfirst - goes through like an array lookup
  // findUnique - goes like object or hashtable lookup - much faster but needs to be indexed first

  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,

      // alternative way - rarely used
      // belongsTo: {
      // matchOrAssociateOrSomething: req.user.id
      // }
    },
  });

  // return the created product
  res.json({ data: product });
};

export const updateProduct = async (req, res) => {
  // look for product with req.params.id
  // update it with data

  const updated = await prisma.product.update({
    where: {
      // id: req.params.id,
      // id_belongsToId: req.user.id,
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  // send back the updated product
  res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      // id: req.params.id,

      // this doesn't work without index as delete operation is like findUnique i.e. indexed lookup
      // id_belongsToId: req.user.id,
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: deleted });
};
