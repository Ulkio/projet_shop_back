import pool from "../config/db/db.js";

class Details {
  static async getDetails(q) {
    const [query] = await pool.execute(q);
    return query;
  }
  static async getDetailById(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
  static async getDetailByOrder(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
  static async getDetailByProduct(q, id) {
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

export default Details