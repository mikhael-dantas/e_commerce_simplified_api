// import { Redis } from 'ioredis';
import { Router } from 'express';
// import { Queue } from 'bullmq';
// import { container } from 'tsyringe';
// import mongoose from 'mongoose';
// import { AuthUserController } from './modules/users/services/AuthController';

const router = Router();

const mikhaelRouter = Router();

// redirect any request to /mikhael/** to the personal website same path
mikhaelRouter.get('*', (req, res) => {
    let path = req.originalUrl.replace('/mikhael', '');
    res.redirect(`https://personal-site-gules-five.vercel.app${path}`);
});

router.use('/mikhael', mikhaelRouter);


// const resourseRouter = Router();
// 
// resourseRouter.get('/redis', async (req, res) => {
//     // try {
//     //     const queue = new Queue('Paint', {
//     //         connection: {
//     //             host: 'redis',
//     //         }
//     //     });
//     //     queue.add('cars', { color: 'blue' });
    
//     //     res.send('ok');
//     // } catch (error) {
//     //     console.log(error);
//     //     res.status(500).send('error');
//     // }
//     const redis = container.resolve<Redis>("Redis");
//     await redis.set('foo', 'bar');
//     res.send((await redis.get('foo')));
// });

// const kittySchema = new mongoose.Schema({
//     name: String
// });
// resourseRouter.get('/mongo', async (req, res) => {
//     // const mongo = container.resolve<mongoose.Mongoose>("MongoDB");
//     // const kitty = new (mongo.model('Kitten', kittySchema))
//     // kitty.name = 'Zildjian';
//     // kitty.save().then(() => console.log('meow'));
//     // res.send('ok');
// });

// resourseRouter.get('/getcat', async (req, res) => {
//     // const mongo = container.resolve<mongoose.Mongoose>("MongoDB");
//     // const Kitten = mongo.model('Kitten', kittySchema);
//     // const kittens = await Kitten.find();
//     // res.send(kittens);
// });
// router.use('/batata', resourseRouter);


export { router };