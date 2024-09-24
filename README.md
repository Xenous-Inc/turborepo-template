# Xenous Turborepo Template

## Quick Start

To get it running, follow the steps below:

### 0. Requirements

-   Node.js, version `20.17.0` or higher
-   PNPM, version `9.11.0`

The best option is to use NVM and Corepack via `corepack enable`, so required versions will be installed automatically

### 1. Bootstrap project

```bash
# Rename project
pnpm rename <name_instead_of_xenous>

# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env
```

### 2. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## FAQ

## Deployment

### Next.js

#### Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.
