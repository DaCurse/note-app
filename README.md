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

Install dependencies using your preferred package manager (I use [pnpm](https://pnpm.io/)).

```
pnpm i
```

Run in watch mode (for development):

```
pnpm start:dev
```

Or for production:

```
pnpm start
```

## License

See [LICENSE](./LICENSE).
