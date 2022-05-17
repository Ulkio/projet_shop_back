import pool from "../config/db/db.js";

class Category {
  static async getCategories(q) {
    const [query] = await pool.execute(q);
    return query;
  }
  static async getCategoryById(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }

  static async save(q, data) {
    const [query] = await pool.execute(q, [...Object.values(data)]);
    return query;
  }
  static async delete(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
}
export default Category;
