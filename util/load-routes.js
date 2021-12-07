import createDebug from 'debug';
import { readdir } from 'fs/promises';
import { pathToFileURL } from 'url';
import AsyncRouter from './async-router.js';

const debug = createDebug('note-app:routes');

async function loadRoutes(directory, app) {
  const baseURL = pathToFileURL(directory + '/');
  const entries = await readdir(baseURL);
  const routes = entries
    .map((entry) => new URL(entry, baseURL))
    .filter((url) => url.pathname.endsWith('.js'))
    .map((url) => import(url));

  for await (const route of routes) {
    app.use(
      route.prefix,
      route.router instanceof AsyncRouter
        ? route.router.expressRouter
        : route.router
    );
    debug(`Registered route ${route.prefix}`);
  }
}

export default loadRoutes;
