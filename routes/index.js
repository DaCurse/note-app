import createDebug from 'debug';
import { readdir } from 'fs/promises';

const debug = createDebug('note-app:routes');

const currentDirectory = new URL('.', import.meta.url);

async function loadRoutes(app) {
  const entries = await readdir(currentDirectory);
  const routes = entries
    .map((entry) => new URL(entry, currentDirectory))
    .filter((url) => url.toString() !== import.meta.url)
    .map((url) => import(url));
  const loadedRoutes = await Promise.all(routes);

  loadedRoutes.forEach((route) => {
    app.use(route.prefix, route.router);
    debug(`Registered route ${route.prefix}`);
  });
}

export default loadRoutes;
