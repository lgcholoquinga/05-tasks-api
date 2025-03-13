import { Request, Response, Router } from 'express';

const router = Router();

export default () => {

   router.get('/health', (req: Request, res: Response) => {
      res.send("Api is OK")
   });

   return router;
}