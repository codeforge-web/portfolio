import express from 'express';
import { createContact, getContacts, getContactById, deleteContact } from '../controllers/contact.controller';

const router = express.Router();

// Public routes
router.post('/', createContact);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router; 