// update Handlers
import prisma from "../db";

// ---------------------------- CREATE ----------------------------
export const createUpdate = async (req, res) => {
  // first - check user's access on product

  const product = await prisma.product.findUnique({
    where: { id: req.body.productId },
  });

  if (!product) {
    // doesn't belong to user
    res.status(401);
    res.json({ message: "Invalid Request" });

    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  // return the created update
  res.json({ data: update });
};

// ---------------------------- READ ----------------------------
// GET ALL
export const getAllUpdates = async (req, res) => {
  // first - get all products for the current user
  // second - get updates for each product

  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  // IMP - not so great approach - tell-tell of areas to improve schema
  // if updates are 10 or 20k - not an ideal thing to store in server's mem per request
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

// GET ALL - By Product Id
export const getAllUpdatesByProduct = async (req, res) => {
  // first - get one products for the current user
  // second - get updates for each product

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    include: { updates: true },
  });

  res.json({ data: product.updates });
};

// GET ONE - By Update Id
export const getOneUpdate = async (req, res) => {
  // have a update id first
  // query it on update table/collection
  // make sure it's scoped to the sign-in user - check missing???

  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });

  res.json({ data: update });
};

// ---------------------------- UPDATE ----------------------------

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  // TODO: Research - substitute this in-memory approach with in-db prisma approach
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(401);
    res.json({ message: "Invalid update request!" });
  }

  const updatedUpdate = await prisma.update.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

// ---------------------------- DELETE ----------------------------

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  // TODO: Research - substitute this in-memory approach with in-db prisma approach
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(401);
    res.json({ message: "Invalid delete request!" });
  }

  const deleted = await prisma.update.delete({
    where: { id: req.params.id },
  });

  res.json({ data: deleted });
};
