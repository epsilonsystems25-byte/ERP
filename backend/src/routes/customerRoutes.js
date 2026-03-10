import { Router } from 'express';
import {
  listCustomers,
  addCustomer,
  editCustomer,
  removeCustomer,
} from '../controllers/customerController.js';
import { authenticateToken, requireSuperAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, requireSuperAdmin, listCustomers);
router.post('/', authenticateToken, requireSuperAdmin, addCustomer);
router.put('/:id', authenticateToken, requireSuperAdmin, editCustomer);
router.delete('/:id', authenticateToken, requireSuperAdmin, removeCustomer);

export default router;

