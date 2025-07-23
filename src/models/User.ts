import pool from '../utils/db';

interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
}

class UserModel {
  static async getAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as User[];
  }

  static async getById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as User[])[0] || null;
  }

  static async create(user: User): Promise<number> {
    const [result] = await pool.query('INSERT INTO users SET ?', user);
    return (result as any).insertId;
  }

  static async update(id: number, user: User): Promise<boolean> {
    const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [user, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}

export default UserModel;