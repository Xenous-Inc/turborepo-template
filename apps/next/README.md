# Next app

Here so the template covers Next. `apps/tanstack` is what we actually use.

## No i18n here

Next is shit and we'll almost never touch this app, so it doesn't get `@xenous/i18n`.

Wiring paraglide into TanStack takes three small pieces. Next wants a middleware to smuggle the
locale through request headers, a cached per-request store, module-scope runtime overwrites,
`metadata` rewritten as `generateMetadata`, and `setupZodLocale()` twice. Paraglide's own Next
example ships a warning calling the setup "fragile" and tells you to use something else.

So we do. If this app ever needs translations: [next-intl](https://next-intl.dev/).
