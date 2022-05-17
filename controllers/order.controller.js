import Order from "../models/order.model.js";
/* -------------------------------------------------------------------------- */
/*               SYNTAXE SQL DIFFÉRENTE À CAUSE DU MOT CLÉ SQL order          */
/* -------------------------------------------------------------------------- */
export const getOrders = async (req, res, next) => {
  const query = "SELECT * FROM `order`";

  try {
    const results = await Order.getOrders(query);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getOrderById = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM `order` WHERE id = ?";

  try {
    const results = await Order.getOrderById(query, id);
    return res.json({
      result: results[0],
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getOrdersByUser = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM `order` WHERE id_user = ?";

  try {
    const results = await Order.getOrderByUser(query, id);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const postOrder = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  const query = "INSERT INTO `order` (order_date,order_status,order_address,order_amount,id_user) VALUES (NOW(),'pending',?,?,?)";

  try {
    const result = await Order.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  data.id = req.params.id;
  const query = "UPDATE `order` SET order_status = ?, order_address = ?, order_amount = ?, id_user = ? WHERE id = ?";

  try {
    const result = await Order.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM `order` WHERE id = ?";

  try {
    const result = await Order.delete(query, id);
    return res.json({
      result: result,
      message: `Deleted order ${id}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
