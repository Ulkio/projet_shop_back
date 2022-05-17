import Product from "../models/product.model.js";

export const getProducts = async (req, res, next) => {
  const query = `SELECT * FROM product INNER JOIN category ON category.id = product.id_category`;
  try {
    const results = await Product.getProducts(query);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM product INNER JOIN category ON category.id = product.id_category WHERE product.id = ?`;
  try {
    const results = await Product.getProductById(query, id);
    return res.json({
      result: results[0],
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getProductsByCategory = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM product INNER JOIN category ON category.id = product.id_category WHERE id_category = ?`;
  try {
    const results = await Product.getProductByCategory(query, id);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const postProduct = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }

  const query = `INSERT INTO product
  (product_title, product_description, product_price, product_image, product_stock, id_category)
  VALUES
  (?,?,?,?,?,?)`;

  try {
    const result = await Product.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const updateProduct = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  data.id = req.params.id;

  const query = `UPDATE product
  SET product_title = ?, product_description = ?, product_price = ?, product_image = ?, product_stock = ?, id_category = ?
  WHERE id = ?`;

  try {
    const result = await Product.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const deleteProduct = async (req, res, next) => {
  const data = {};
  const id = req.params.id;
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }

  const query = `DELETE FROM product WHERE id = ?`;

  try {
    const result = await Product.delete(query, id);
    return res.json({
      result: result,
      message: `Deleted product ${id}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
