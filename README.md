This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

> [!NOTE]
> This readme assumes you have Cloudflare account  and have basic knowledge of [`Cloudflare pages`](https://developers.cloudflare.com/pages/get-started/).

## Getting Started

1. Install required dependencies using npm:
 ```bash
npm i
```
2. Login to Cloudflare account using wrangler:
 ```bash
npx wrangler login
```
3.  Create D1 database for your pages application:
 ```bash
npx wrangler d1 create <DB_name>
```
Put your database name in place of <DB_name> and replace "[[d1_databases]]" section in wrangler.toml with the command output. Keep "migrations_dir"  key in the "[[d1_databases]]" as is.   

4. Run DB migrations to create necessary tables in you D1 DB:
```bash
npx wrangler d1 migrations apply --local <DB_name>
````
Put your database name in place of <DB_name>

5. Run local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  

## Features

- Search Restaurants using restaurant name.  Input in search box  is debounced; search query is sent one second after user finish typing into search box.
- Home page features infinite scroll; i.e auto loads Restaurants as user scrolls instead of requiring user input to go to next page.
- User can add/update/delete restaurants on the dashboard page.
- Add/update form modal supports input validation.
- All add/update/delete actions triggers  toast/notification to show if action succeeded or  error (if any).

  

