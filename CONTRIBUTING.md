# Contributing to clickup-client

Thank you for considering contributing to **clickup-client!** We appreciate your time and effort to improve the project. Below are the guidelines to help you contribute effectively.

## Table of Contents

1. [How to Report a Bug](#how-to-report-a-bug)
2. [Requesting a Feature](#requesting-a-feature)
3. [Submitting a Pull Request](#submitting-a-pull-request)
4. [Code Standards](#code-standards)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Running Tests](#running-tests)

---

## How to Report a Bug

If you find a bug, please report it using the [Issues](https://github.com/lucashthiele/clickup-client/issues) section on GitHub.

Before submitting, please:

- Check if the issue has already been reported by searching [existing issues](https://github.com/lucashthiele/clickup-client/issues?q=is%3Aissue).
- Ensure you're running the latest version of the project.
- Provide a clear and concise description of the problem.
- Include relevant logs, screenshots, or steps to reproduce.

### Bug Report Format

```
**Describe the bug:**
A clear and concise description of what the bug is.

**To Reproduce:**
Steps to reproduce the behavior

**Expected behavior:**
A clear and concise description of what you expected to happen.

**Environment (please complete the following information):**
 - OS: [e.g. macOS, Windows]
 - Node version [e.g. 20.18.0]

**Additional context:**
Add any other context about the problem here.
```

## Requesting a Feature

We welcome suggestions to improve the project! To request a feature, open a new [Feature Request issue](https://github.com/lucashthiele/clickup-client/issues/new).

Please include:

- A detailed explanation of the proposed feature.
- Why you think it would be useful for others.
- Any potential alternatives or additional considerations.

## Submitting a Pull Request

Before submitting a pull request:

1. Ensure that the issue has been discussed and approved (create a new issue if necessary).
2. Fork the repository and create a new branch with a descriptive name (e.g., `feat-add-api-route-support`).
3. Write clear and concise code.
4. Test your changes locally to ensure everything works as expected.
5. Submit your pull request and link it to the related issue.

After submission, the maintainers will review your code. Feedback may be provided, so be prepared for some changes!

## Code Standards

To ensure consistency and maintainability, please follow these guidelines:

- **Code Style**: Follow [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) rules (if applicable).
- **Variable Naming**: Use clear, descriptive names in English. Avoid abbreviations unless they are widely accepted.
- **Comments**: Include comments for complex or non-obvious code sections.
- **Documentation**: Update relevant documentation (e.g., README.md) if your changes affect how the project is used.

## Commit Message Guidelines

Write descriptive commit messages to make the project's history easier to follow. Use the following structure:

```
<type>: <subject>

<body> (optional)
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style or formatting changes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or modifying tests

### Example

```
feat: add user authentication

- Added login and registration forms
- Implemented JWT-based authentication
```

## Running Tests

To ensure your changes don’t break existing functionality, run the project's tests:

```
yarn test
```

If the project uses other test commands or frameworks (e.g., Jest, Mocha), follow those as outlined in the documentation.

---

Thank you for contributing! Your support helps us make clickup-client better for everyone.

Good Luck!