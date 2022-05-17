import pool from "../config/db/db.js";

class Product {
  static async getProducts(q) {
    const [query] = await pool.execute(q);
    return query;
  }
  static async getProductById(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
  static async getProductByCategory(q, id) {
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
export default Product;
