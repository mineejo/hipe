## Commit

The [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) `v1.0.0` specification is a lightweight
convention on top of commit messages.

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Optionally, install hooks for commits. For regular developers, this is a must.

```shell
husky install # && chmod ug+x .husky/* && chmod ug+x .git/hooks/*"
```