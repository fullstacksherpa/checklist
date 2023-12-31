# ⚙️ Project Configuration

This application is proudly developed using the Next.js framework `(version 14.0.4)`, chosen for its robust features and advantages. Benefit from optimal performance, server-side rendering, and a seamless developer experience. Thanks to its powerful capabilities, this application seamlessly integrates with backend APIs, providing a versatile solution for dynamic data handling. Leveraging the latest Next.js 14.0.4 app router, navigation is swift and intuitive, offering an enhanced user experience. Experience the perfect synergy of frontend excellence and backend support, all made possible by Next.js.

#### ESLint

ESLint is a linting tool for JavaScript. By providing specific configuration defined in the`.eslintrc.json` file it prevents developers from making silly mistakes in their code and enforces consistency in the codebase. The good thing is that, it automatically comes installed and pre-configured with Next.js projects.
We are just going to add a little bit of extra configuration and make it a bit stricter than it is by default. If you disagree with any of the rules it sets, no need to worry, it's very easy to disable any of them manually. We configure everything in .eslintrc.json which should already exist in your root directory:

`.eslintrc.json`

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
}
```

In the above small code example we have added a few additional defaults, we have said that React will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore \_ if you have declared them but not used them in the code.

Rule Name (no-unused-vars): This rule is designed to flag variables that are declared but never used in the code. It helps catch potential issues with unused variables.

Severity Level ([1]): The severity level is a number that represents how severely ESLint should treat the rule violations. In ESLint, the levels are:

0: off
1: warning
2: error
In your case, [1] indicates a warning level.

Options ({ "args": "after-used", "argsIgnorePattern": "^\_" }):

"args": "after-used": This option configures the rule to only flag variables if they are used after they are declared.
"argsIgnorePattern": "^_": This option provides an exception to the rule, allowing variables whose names match the specified pattern (^_) to be ignored. In this case, variables starting with an underscore (\_) will not trigger the warning, even if they are declared and not used.

You can test out your config by running:

```
npm run lint
```

You should get a message like:

```
✔ No ESLint warnings or errors
Done in 1.47s.
```

If you get any errors then ESLint is quite good at explaining clearly what they are. If you encounter a rule you don't like you can disable it in "rules" by simply setting it to 1 (warning) or 0 (ignore) like so:

```json
  "rules": {
    "no-unused-vars": 0, // As example: Will never bug you about unused variables again
  }
```

Let's make a commit at this point with the message `build: configure eslint`

#### Prettier

This is a great tool for formatting code. It enforces a consistent code style across your entire codebase. By utilizing the "format on save" feature in your IDE you can automatically format the code based on the configuration provided in the `.prettierrc` file. It will also give you good feedback when something is wrong with the code. If the auto-format doesn't work, something is wrong with the code.

It's only needed during development, so I'll add it as a `devDependency` with `-D`

```
npm add -D prettier
```

We'll create two files in the root:

`.prettierrc`

```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Those values are entirely at your discretion as to what is best for your team and project.

`.prettierignore`

```
.npm
.next
dist
node_modules
```

In that file I've placed a list of directories that I don't want Prettier to waste any resources working on. You can also use patterns like \*.html to ignore groups of types of files if you choose.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

You can now run

```
npm prettier
```

to automatically format, fix and save all files in your project you haven't ignored. By default my formatter updated about 5 files. You can see them in your list of changed files in the source control tab on the left of VS Code.

Let's make another commit with `build: implement prettier`.

## Git Hooks

One more section on configuration before we start getting into component development. Remember you're going to want this project to be as rock solid as possible if you're going to be building on it in the long term, particularly with a team of other developers. It's worth the time to get it right at the start.

We are going to implement a tool called [Husky](https://typicode.github.io/husky/#/)

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc. We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

To install Husky run

```
npx husky-init && npm install
```

after running above command, husky will inject ‘prepare’: “husky install” in scripts in the package.json. When you run npm install or yarn install, the prepare script is triggered automatically, and it runs husky install.

after that we will add command in the pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint

```

The above says that in order for our commit to succeed, the `npm run lint` script must first run and succeed. "Succeed" in this context means no errors. It will allow you to have warnings (remember in the ESLint config a setting of 1 is a warning and 2 is an error in case you want to adjust settings).

`package.json`

```
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```

This will ensure Husky gets installed automatically when other developers run the project.

Let's create a new commit with the message `ci: implement husky`. If all has been setup properly your lint script should run before the commit is allowed to occur.

We're going to add another one:

```
npx husky add .husky/pre-push "npm run build"
```

The above ensures that we are not allowed to push to the remote repository unless our code can successfully build. That seems like a pretty reasonable condition doesn't it? Feel free to test it by committing this change and trying to push.

---

## commitlint

Lastly we are going to add one more tool. We have been following a standard convention for all our commit messages so far, let's ensure that everyone on the team is following them as well (including ourselves!). We can add a linter for our commit messages:

```
npm add -D @commitlint/config-conventional @commitlint/cli
```

To configure it we will be using a set of standard defaults, but I like to include that list explicitly in a `commitlint.config.js` file since I sometimes forget what prefixes are available:

`commitlint.config.js`

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

Then enable commitlint with Husky by using:

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# Sometimes above command doesn't work in some command interpreters
# You can try other commands below to write npx --no -- commitlint --edit $1
# in the commit-msg file.
npx husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"
# or
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

Feel free to try some commits that _don't_ follow the rules and see how they are not accepted, and you receive feedback that is designed to help you correct them.

I'm going to create a new commit now with the message `ci: implement commitlint`.

You can see the result of the complete culmination of this setup in the screenshot below, hopefully yours looks similar:

## VS Code Configuration

Now that we have implemented ESLint and Prettier we can take advantage of some convenient VS Code functionality to have them be run automatically.

Create a directory in the root of your project called `.vscode` and inside a file called `settings.json`. This will be a list of values that override the default settings of your installed VS Code.

The reason we want to place them in a folder for the project is that we can set specific settings that only apply to this project, and we can share them with the rest of our team by including them in the code repository.

Within `settings.json` we will add the following values:

`.vscode/settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

The above will tell VS Code to use your Prettier extension as the default formatter (you can override manually if you wish with another one) and to automatically format your files and organize your import statements every time you save.

Very handy stuff and just another thing you no longer need to think about so you can focus on the important things like solving business problems.

I'll now make a commit with message `build: implement vscode project settings`.

## Adding Storybook

One of the great modern tools available to us if you aren't already familiar with it is called [Storybook](https://storybook.js.org/).

Storybook gives us an environment to show off and test the React components we are building outside of the application we are using them in. It's great tool to connect developers with designers and be able to verify components we have developed look and function as per design requirements in an isolated environment without the overhead of the rest of the app.

Note that Storybook is meant as a visual testing tool, we will be implementing other tools later for functional unit testing and end-to-end testing.

The best way to learn how to use Storybook is installing it and trying it out!

```
npx storybook@latest init
```

When Storybook installs it automatically detects a lot of things about your project, like how it is a React app, and other tools you are using. It should take care fo all that configuration itself.

If you get a prompt about the eslintPlugin, you can say "yes". We are going to configure it manually though, so no worries if you get a message saying it didn't auto-configure.

Open up `.eslintrc.json` and update it to the following:

`.eslintrc.json`

```json
{
  "extends": [
    "plugin:storybook/recommended", // New
    "next",
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "globals": {
    "React": "readonly"
  },
  // New
  "overrides": [
    {
      "files": ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      "rules": {
        // example of overriding a rule
        "storybook/hierarchy-separator": "error"
      }
    }
  ],
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
}
```

I have added `// New` to mark the two new sections and lines that are Storybook specific.

You'll notice that Storybook has also added as `/stories` directory to the root of your project with a number of examples in. If you are new to Storybook I highly recommend you look through them and leave them there until you are comfortable creating your own without the templates.

Next we have to update the `.storybook/main.ts` file:

`storybook/main.js`

```ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
```

We have also exposed Next.js's "public" folder as a static directory so we can test things like images, media, etc in Storybook.

Lastly, before we run Storybook itself, let's add some helpful values in `storybook/preview.js`. This is the file where we can control the defaults for how our stories render.

`storybook/preview.ts`

```ts
import '../app/globals.css'; //to give storybook access to tailwindcss
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

I would encourage you to play around and get familiar with the examples if you've never used it before.

At this stage I'll be making a commit with message `build: implement storybook`.

---
