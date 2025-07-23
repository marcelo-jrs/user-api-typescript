import { Request, Response } from 'express';
import UserModel from '../models/User';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserModel.getById(id);
      
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      const newUserId = await UserModel.create({ name, email, age });
      res.status(201).json({ id: newUserId, name, email, age });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, age } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      const updated = await UserModel.update(id, { name, email, age });
      
      if (updated) {
        res.json({ id, name, email, age });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await UserModel.delete(id);
      
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UserController;