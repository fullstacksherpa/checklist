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

In the above small code example we have added a few additional defaults, we have said that React will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore _ if you have declared them but not used them in the code.

Rule Name (no-unused-vars): This rule is designed to flag variables that are declared but never used in the code. It helps catch potential issues with unused variables.

Severity Level ([1]): The severity level is a number that represents how severely ESLint should treat the rule violations. In ESLint, the levels are:

0: off
1: warning
2: error
In your case, [1] indicates a warning level.

Options ({ "args": "after-used", "argsIgnorePattern": "^_" }):

"args": "after-used": This option configures the rule to only flag variables if they are used after they are declared.
"argsIgnorePattern": "^_": This option provides an exception to the rule, allowing variables whose names match the specified pattern (^_) to be ignored. In this case, variables starting with an underscore (_) will not trigger the warning, even if they are declared and not used.


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
