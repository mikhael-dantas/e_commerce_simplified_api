import { Router } from 'express';
// import { AuthUserController } from './modules/users/services/AuthController';

const router = Router();

const mikhaelRouter = Router();

// redirect any request to /mikhael/** to the personal website same path
mikhaelRouter.get('*', (req, res) => {
    let path = req.originalUrl.replace('/mikhael', '');
    res.redirect(`https://personal-site-gules-five.vercel.app${path}`);
});

router.use('/mikhael', mikhaelRouter);

export { router };