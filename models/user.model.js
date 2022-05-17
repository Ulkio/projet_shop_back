import pool from "../config/db/db.js";

class User {
  static async getUsers(q) {
    const [query] = await pool.execute(q);
    return query;
  }
  static async getUserById(q, id) {
    const [query] = await pool.execute(q, [id]);
    return query;
  }
  static async findUser(q, value) {
    const [query] = await pool.execute(q, [value]);
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
  static async validateUser(q, uuid) {
    const [query] = await pool.execute(q, [uuid]);
    return query;
  }
}
export default User;
