# TanStack app

The frontend we build on.

## Adding a font

This app uses [fontaine](https://github.com/unjs/fontaine) to build fallback faces with
matching metrics, like `next/font` does for the Next.js app. Fontaine only adds a fallback for an
`@font-face` rule it can read in CSS that Vite processes. It reads `.woff2`, `.woff` and `.ttf`.

Whatever the source, every font needs these two steps:

- Add the family to `fallbacks` in `vite.config.ts` with `SANS_FALLBACKS` or `MONO_FALLBACKS`.
  Fontaine cannot tell mono from sans on its own.
- Add a `--font-<name>` variable in `src/styles/globals.css` that lists `'<Family> fallback'` right
  after the family. Fontaine cannot see into CSS variables, so it won't add it for you.

Then load the font in one of the ways below.

### Fontsource package

1. Add the `@fontsource-variable/<name>` (or `@fontsource/<name>`) package to `package.json`.
2. Import its CSS in `src/app/__root.tsx` as a module import. Fontaine cannot see through a CSS
   `@import`.

### Font files

1. Put the files in `public/fonts/`.
2. Write the `@font-face` rules in their own file per family, `src/styles/fonts/<name>.css`, with
   root paths like `src: url('/fonts/Inter.woff2') format('woff2')`. The `resolvePath` option in
   `vite.config.ts` points fontaine at `public/` for these.
3. Import `~/styles/fonts/<name>.css` in `src/app/__root.tsx` as a module import, next to the
   Fontsource imports.

Files in `public/` keep their names, so browsers can't cache them as hard as hashed assets. If you
replace a font file, give it a new name so returning visitors get the new one.

### Google Fonts or Bunny Fonts

A `<link>` to `fonts.googleapis.com` or `fonts.bunny.net`, or a CSS `@import url(https://...)`,
never passes through Vite, so fontaine skips it and the font gets no fallback.

Self-host instead. Check Fontsource first: it has almost every Google font. If it isn't there,
download the files (Bunny has a download button, [google-webfonts-helper](https://gwfh.mranftl.com/fonts)
does it for Google) and follow the font files steps above. This also keeps visitors' IPs away from
Google, which matters under GDPR.

If a font has to stay remote, copy the `@font-face` rules from the provider's CSS into
`src/styles/fonts/<name>.css` and import it the same way. Fontaine downloads the `https://` sources
at build time to read metrics.
