import express from 'express';
import profileController from '../controllers/profile.controller';
import userValidationMW from '../validators/user.validator';


const profileRouter = express.Router();

profileRouter.get('/', profileController.renderProfile);

profileRouter.patch('/update', userValidationMW.UpdateUserValidation, profileController.updateProfile);


export default profileRouter;