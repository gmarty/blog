# A blog by G.C. Marty

The source from my blog located at:
[gu.illau.me](https://gu.illau.me)

Adapted from [tailwind-astro-starting-blog](https://github.com/wanoo21/tailwind-astro-starting-blog).

## Todo

- Review the social media sharing feature.
- Review the sizes of generated cover images.
- Stretched links on post cards in lists.
- Change the titles font.
- Refactor apps and talks pages to use the same code.
- For post titles, try to use the cover image as a dimmed background for the title.
- Restore the estimated reading time feature.
- Implement a service worker strategy.
- Use local avatar instead of gravatar.

## Internationalization

This template has support for i18n, it's set up for English as default. You can add more languages in the `src/i18n/ui.ts` file. It doesn't have support for dynamic language change, but it's easy to implement.

## Extend / Customize

`src/consts.ts` contains a list of constants that you can customize to your liking, including the blog title, description, author, social media links, etc.

`src/functions.ts` contains a list of functions that changes the default behavior of the template, including default post sorting and exclude draft posts.

`src/content/authors/default.mdx` contains the default author information. You can add more authors by adding more `.mdx` files in the `src/content/authors` folder.

`src/content/tags/default.mdx` contains the default tag information. You can add more tags by adding more `.mdx` files in the `src/content/tags` folder.

`src/content/config.ts` contains all fields for author, blog and tags pages. Check what's required and what's not. You can also add more fields if you want to.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### 🐳 Docker Commands

All Docker commands are run from the root of the project, from a terminal:

| Command                           | Action                                                   |
| :-------------------------------- | :------------------------------------------------------- |
| `docker build -t app:1.0.0 .`     | Build the Docker image for the Astro application.        |
| `docker run -p 80:4321 app:1.0.0` | Run a Docker container with the built Astro application. |
| `docker pull edwardb11/app:2.0.0` | Download the Docker image from Docker Hub.               |
