# note-app

An API for a note taking app.

I made this little project because I find writing pure express apps, without any sophisticated frameworks (Like [Nest.js](https://nestjs.com/)) fun, and also because I wanted to create a project structure I am happy with, and I think I got close here.

This project structure seperates responsibilities to different components (Routes, services, etc.), and has nifty utilities like clean declarative validation which automatically throws descriptive errors:

```js
router.get('/', validate(getNotesSchema, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);
```

If `req.query` doesn't match the schema, I get an error:

```json
{
  "status": 400,
  "message": "\"id\" must be a number"
}
```

## Running the project

Rename [.env.example](./.env.example) to `.env` and change `DATABASE_URL` to a proper postgres connection string.

Install dependencies using your preferred package manager (I use [pnpm](https://pnpm.io/)):

```sh
pnpm i
```

Run in watch mode (for development):

```sh
pnpm start:dev
```

Or for production:

```sh
DEBUG=note-app:* pnpm start
```

_The `DEBUG` environment variable doesn't work with `.env` files._

### With Docker

Build an image from the repo:

```sh
sudo docker image build https://github.com/DaCurse/note-app.git -t note-app:latest
```

And create a container:
```sh
docker run -d \
  -it \
  --restart unless-stopped \
  --name note-app -p 80:80 \
  -e "DATABASE_URL=<postgres connection string>" \
  --mount type=bind,source=/var/lib/note-app/data,target=/var/lib/postgresql/data/pgdata \
  note-app:latest
```

### With docker-compose

With `docker-compose`, a `postgres` server is started alongisde the app.

Clone the repo:

```sh
git clone https://github.com/DaCurse/note-app.git
cd note-app
```

Start the app:

```sh
sudo docker-compose up -d
```

## License

See [LICENSE](./LICENSE).
