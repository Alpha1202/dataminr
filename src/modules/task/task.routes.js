import { Router } from 'express';

import { CreateNewTask, FetchSingleTask, FetchAlltasks, UpdateTask, DeleteTask } from './task.controller';
import { formatCreateNewTaskPayload, validatetaskTitleInput, validateTaskIdInputs } from './task.middleware';

const routes = Router();

routes.post('/create', validatetaskTitleInput, formatCreateNewTaskPayload, CreateNewTask);

routes.get('/task/:task_id', FetchSingleTask);

routes.put('/task', validatetaskTitleInput, validateTaskIdInputs, UpdateTask);

routes.delete('/task/:task_id', DeleteTask);

routes.get('/all', FetchAlltasks);

export default routes;
