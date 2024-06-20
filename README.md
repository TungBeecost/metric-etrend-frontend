# How to run

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

<br />
<br />
<br />

# Folder structuring description

Please follow [documentation of Nuxt v3](https://nuxt.com/docs/getting-started/introduction) for more details.

Besides, we included more 2 folders

- `tests/` contains test case
- `validator` for common validation

> Last one, every main folder can re-created inside specific module (page) for more specific. For example, you can re-create `validator/` folder inside `my-page` for validate functions just only supply for `my-page`

<br />
<br />
<br />

# Convention

> Please follow this convention when you action anything

### Commit convention

- Stucture: [type] your-commit-content

- List of type
  - [feat] for new feature
  - [change] for change by request/business anything
  - [fix] for fix anything existed
  - [refactor] for change something or just clean code
  - [impv] for improve anything
  - [vendor] for update dependencies
  - [docs] for update docs
  - [chore] for other

For example: `[feat] center div in another div`

### Branch convention

- Stucture: `type`-`your-main-activity`

- List of type
  - `feat` for new feature
  - `change` for change by request/business anything
  - `fix` for fix anything existed
  - `refactor` for change something or just clean code
  - `impv` for improve anything
  - `vendor` for update dependencies
  - `docs` for update docs
  - `chore` for other

For example: `feat-homepage`

### ESLint setup

We used Eslint/Eslint-plugin-prettier module for Nuxt version, everything is worked.
if you not familiar with ESLint, just follow below steps:

- Install extension `ESLint` v3.0.10 or higher
- Run these commands to use
  ```
  // for lint check
  npm run lint
  // for lint fix
  npm run lint:fix
  ```
