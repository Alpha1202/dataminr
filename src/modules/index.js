
import express from 'express';
import { TaskRoutes } from './task'
import { TaskListRoutes } from './taskList'

const router = express.Router();

router.use('/api/v1/tasks', TaskRoutes);
router.use('/api/v1/taskLists', TaskListRoutes);

export default router;