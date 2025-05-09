import { Request, Response } from 'express';
import Contact from '../models/Contact';

// POST /api/contacts
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании контакта', error });
  }
};

// GET /api/contacts
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении контактов', error });
  }
};

// GET /api/contacts/:id
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Контакт не найден' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении контакта', error });
  }
};

// DELETE /api/contacts/:id
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Контакт не найден' });
    res.json({ message: 'Контакт удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении контакта', error });
  }
}; 