# amroflix

Web application that shows a list of TV shows based on different genres

## Table of contents

  - [Demo](#demo)
  - [Setup](#setup)
  - [Scripts](#scripts)
  - [Features](#features)
  - [TODO](#todo)
    - [Product fetaures](#product-fetaures)
    - [Technology](#technology)
    - [Styling](#styling)
    - [Dev tools](#dev-tools)
  - [Misc](#misc)
    - [Recommended IDE Setup](#recommended-ide-setup)
    - [Type Support for `.vue` Imports in TS](#type-support-for-vue-imports-in-ts)
    - [Customize configuration](#customize-configuration)

## Demo

Click [here](https://amroflix.herokuapp.com/) for a live preview of the web application

## Setup

```sh
git clone git@github.com:venuputcha/amroflix.git
cd amroflix
npm install
```

## Scripts

Compile and Hot-Reload for Development

```sh
npm run dev
```

Type-Check, Compile and Minify for Production

```sh
npm run build
```

Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

Generate Unit Test coverage with [Vitest](https://vitest.dev/)

```sh
npm run coverage
```

Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Start (production) app using [serve](https://www.npmjs.com/package/serve)

```sh
npm run build
npm run start
```

## Features

- [x] Vue 3
- [x] Vuetify component library 
- [x] Material design icons
- [x] Typescript
- [x] Responsive styles for desktop & mobile (v1)
- [x] Unit tests with `vitest`
- [x] Routing with `vue-router`

## TODO

### Product fetaures

- [ ] Search by [show](https://www.tvmaze.com/api#show-search) & [people](https://www.tvmaze.com/api#people-search) 
- [ ] Filter shows by rating 
- [ ] Similar shows  
- [ ] i18n  
- [ ] AuthN  
- [ ] AuthZ  
- [ ] Eror handling with toast messages  

### Technology

- [ ] Tanstack query - with support for request caching & more  
- [ ] State management   
- [ ] Storybook  
- [ ] E2E tests  
- [ ] Web worker 
- [ ] Service worker  
- [ ] Performance optimization
- [ ] Instrumentation 

### Styling

- [ ] Styled components  
- [ ] Skeleton loaders / pages  
- [ ] Theming - dark, light, system, custom   
- [ ] Font systems   

### Dev tools
- [ ] Environment specific builds using npm scripts  
- [ ] Commit linting with conventional commits
- [ ] Releases & changelog with `sematic-version`   
- [ ] Commit & pre push hooks with `husky`
- [ ] TS Doc

## Misc

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
