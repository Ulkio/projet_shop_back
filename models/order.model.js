import pool from "../config/db/db.js";

class Order {
  static async getOrders(q) {
    const [query] = await pool.execute(q);
    return query;
  }
  static async getOrderById(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
  static async getOrderByUser(q, id) {
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
export default Order;
