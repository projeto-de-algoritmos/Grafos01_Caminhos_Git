import { Router } from 'express';
import BuscaGit from './BuscaGit';

const routes = new Router();
routes.get('/', BuscaGit.index);

export default routes;
