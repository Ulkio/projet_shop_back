import Details from "../models/orderDetails.model.js";

export const getOrderDetails = async (req, res, next) => {
  const query = `SELECT * FROM order_details 
    INNER JOIN order ON order.id = order_details.id_order 
    INNER JOIN product ON product.id = order_details.id_product`;

  try {
    const results = await Details.getDetails(query);
    return res.json({
      results: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getOrderDetailsById = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM order_details 
    INNER JOIN order ON order.id = order_details.id_order 
    INNER JOIN product ON product.id = order_details.id_product
    WHERE id = ?`;

  try {
    const results = await Details.getDetailById(query, id);
    return res.json({
      results: results[0],
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getOrderDetailsByOrder = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM order_details 
    INNER JOIN order ON order.id = order_details.id_order 
    INNER JOIN product ON product.id = order_details.id_product
    WHERE id_order = ?`;

  try {
    const results = await Details.getDetailByOrder(query, id);
    return res.json({
      results: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getOrderDetailsByProduct = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM order_details 
    INNER JOIN order ON order.id = order_details.id_order 
    INNER JOIN product ON product.id = order_details.id_product
    WHERE id_product = ?`;

  try {
    const results = await Details.getDetailByProduct(query, id);
    return res.json({
      results: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const postOrderDetails = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  const query = `INSERT INTO order_details
  (quantity, price, id_order, id_product)
  VALUES
  (?,?,?,?)`;
  try {
    const result = await Details.save(query, data);
    return res.json({
      results: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const updateOrderDetails = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  data.id = req.params.id;

  const query = `UPDATE order_details
  SET quantity = ?, price = ?, id_order = ?, id_product = ?)
  WHERE id = ?`;

  try {
    const result = await Details.save(query, data);
    return res.json({
      results: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const deleteOrderDetails = async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM order_details WHERE id = ?`;
  try {
    const result = await Details.delete(query, id);
    return res.json({
      results: result,
      message: `Deleted details ${id}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
