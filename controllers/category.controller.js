import Category from "../models/category.model.js";

export const getCategories = async (req, res, next) => {
  const query = `SELECT * FROM category`;
  try {
    const results = await Category.getCategories(query);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const postCategory = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }

  const query = `INSERT INTO category
  (category_name)
  VALUES
  (?)`;

  try {
    const result = await Category.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  data.id = req.params.id;

  const query = `UPDATE category
  SET category_name = ?
  WHERE id = ?`;

  try {
    const result = await Category.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM category WHERE id = ?`;

  try {
    const result = await Category.delete(query, id);
    return res.json({
      result: result,
      message: `Deleted category ${id}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
