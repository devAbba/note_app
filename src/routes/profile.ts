import express from 'express';
import profileController from '../controllers/profile.controller';


const profileRouter = express.Router();

profileRouter.get('/', profileController.renderProfile);

profileRouter.patch('/update', profileController.updateProfile);


export default profileRouter;