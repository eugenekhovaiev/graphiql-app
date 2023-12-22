# GraphiQL App

Welcome to the GraphiQL App project developed by the team from [Rolling Scopes School](https://rs.school/). This app is
a GraphQL playground/IDE with additional features such as authentication, authorization, and the ability to work with
any user-specified open GraphQL endpoint.

## Team Members

- [Xeniya Gazizova](https://github.com/XeniyaMV)
- [Maria Bogdanova](https://github.com/MashaBogdanova)
- [Yevhenii Khovaiev](https://github.com/eugenekhovaiev)

## Project Structure

- Welcome page

  General information about the developers, project, and course, sign in and sign up buttons, ability to switch
  languages.

- Sign In / Sign Up pages

  Sign In / Sign Up forms.

- Main Page (Editor)

  Functional editor for query editing and prettifying, documentation, variables section, header section, response
  section with an editor in read-only mode, change Endpoint button.

## Technical Details

### The technology stack used on project

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Vitest](https://vitest.dev/) for tests

The project is managed using SCRUM methodology and [Jira](https://www.atlassian.com/software/jira) tools.

### GitHub repository

[link](https://github.com/XeniyaMV/graphiql-app)

### Deployment

[Website]() was deployed on Vercel.

### How to Run Locally

- Clone the repo: `$ git clone https://github.com/XeniyaMV/graphiql-app.git`
- Go to downloaded folder: `$ cd graphiql`
- Install dependencies: `$ npm install`
- Start server: `$ npm run dev`
- Now you can open in browser to the address: [http://localhost:3000](http://localhost:3000)

## Available Scripts

To run the scripts, use the npm run command followed by the desired script name. To work with the project, you can use
the following npm scripts.

`dev`

Command to start the local development server for Next.js.

`build`

Command to build the project using Next.js. This creates optimized files for deployment on a production server.

`start`

Command to start the project in production mode after it has been built using "build". Typically used for locally
testing how your application will perform in a production-like environment.

`lint`

Command to check code style using the built-in linting tool of Next.js. It verifies that the code adheres to certain
standards.

`lint:fix`

Command to automatically fix some style errors using the built-in Next.js linter.

`format`

Command to format code using Prettier. Prettier ensures a standardized and visually appealing code style. Here, it is
applied to files with extensions .ts, .tsx, and .css in the project, using the configuration from .prettierrc.json.

`prepare`

Command to run Husky check for tests and code formatting.

`test`

Command to run tests using Vitest.

`coverage`

Command to run tests with coverage reporting using Vitest.
