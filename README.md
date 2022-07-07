# Pokedex app

## Description

An application to find information about Pokemons. You can filter Pokemons by name and by type and add them to your favorite list and you can also view each of them in detail.

## Prerrequisites

You will need to have Node installed on your system in order to start the application.

Check the version you have installed by running:

```bash
node -v
```

We recommend you to use a node version manager like [nvm](https://github.com/nvm-sh/nvm) to be able to install and choose different versions of node according to the project.

We are using node version 14.16.0 in this project.

## Get started

### Clone the repository

```bash
git clone git@github.com:Alienah/pokedex-app.git
```

### Install

Move into the new folder and install the dependencies by running:

```bash
npm install
```

### Start the application

You can start the application with the following command and it will automatically open in your browser a tab with the application running on http://localhost:8080/.

```bash
npm start
```

### Testing

We believe that tests help us to debug our application and to see possible human errors that we could be making when developing, that's why this application is tested using [React testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/). To run the tests execute the following command:

```bash
npm run test
```

Or you can do it in watch mode to automatically run the tests when it detects changes.

```bash
npm run test:watch
```

### Build

To build the application for production just run:

```bash
npm run build
```

## Other information

In this app we are using the folowing techonolgies:

- [React](https://reactjs.org/). It's the library I feel most comfortable with, as I have previous experience working with it.
- [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) to manage the routing of the application and to allow the navigation typical of a SPA.
- [Typescript](https://www.typescriptlang.org/).
- [Webpack](https://webpack.js.org/) configured to use Scss.
- We have used scss because it allows us to develop the styles in a simple way and I think that for this project it is enough. It lets us structure the selectors in a more orderly and easy-to-follow way, as well as providing many more functionalities.
- [React testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing react components.
- [Jest](https://jestjs.io/) for basic testing and [jest-dom](https://github.com/testing-library/jest-dom) for a more declarative and clear asserts.
- [Graphql](https://graphql.org/) API query language and [Apollo Client](https://www.apollographql.com/docs/react/) for the API frontend management.
- [Material UI Components](https://mui.com/material-ui/getting-started/overview/) for basic components. However, some of them we have used them inside a wrapper component created by us, so that, in case of changing the library, we only have to change in one place.

## Next steps

Future improvements for the project could be the following:

- Adding context to not lose the scroll position or previous search when moving between the list and the Pokemon detail.
- We would have to add more tests
- Add i18n to support more languages
- Move all components that do not have a wrapper component in our project to the common components folder, for better maintainability.
