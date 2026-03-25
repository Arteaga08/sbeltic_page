import { Router } from 'express';
import {
  getTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from '../controllers/treatmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getTreatments);
router.get('/:id', getTreatmentById);
router.post('/', protect, createTreatment);
router.put('/:id', protect, updateTreatment);
router.delete('/:id', protect, deleteTreatment);

export default router;
