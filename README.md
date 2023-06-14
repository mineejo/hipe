# Hipe

[![Documentation](https://img.shields.io/badge/Documentation-3178C6.svg?logo=typescript&logoColor=ffffff)][DOCS_URL]
[![NPM](https://img.shields.io/npm/v/hipe.svg?style=&labelColor=cb0000&color=000000&label=NPM&logo=npm)][NPM_URL]

[DOCS_URL]: https://mineejo.github.io/hipe/

[NPM_URL]: https://npmjs.org/package/hipe

Hipe is a minimalistic HTML5 preprocessor that complements the necessary practices.
Hipe will help when you just need to use HTML and frameworks or more complex preprocessors are unnecessary.

Install with `npm install hipe --save-dev`.

## Usage and API

To specify that the HTML file is a modification of Hipe, use the `.hipe.html` extension, e.g. `index.hipe.html` will be
generated in `index.html`. Additional extensions can be specified before - `index.test.hipe.html`.

```shell
hipe <dir>

Generate HTML files from Hipe HTML

Positionals:
  dir  Path to directory with `.hipe.html` files or path to file
                                                         [string] [default: "."]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -C, --comment  Leave comments in the output                          [boolean]
      --output   The output directory of the generated HTML files, without this
                 parameter, the files will be located next to the source files
                                                                        [string]

Examples:
  hipe <dir> [<options>]
  hipe ./src --output ./dist            generates files from `src` directory to
                                          `dist`
  hipe ./src --output ./dist --comment  generates files from `src` directory to
                                          `dist` and leaves comments
```

### Store

Store for data that changes frequently but is a constant.
For example, the config store can be listed above
all other elements in `<body>`, so you don't have to search for it
amongst the many elements and be aware of the information used.

[//]: # (@formatter:off)

>```html
><store name="...">...values...</store>
>```
> **Tag:** store `(common type)` \
> **Contains:** values `(optional)` \
> **Attributes:** name `(required)`

[//]: # (@formatter:on )

[//]: # (@formatter:off)

>```html
><value name="...">...value...</value>
>```
> **Tag:** value `(common type)` \
> **Contains:** value `(optional)` \
> **Attributes:** name `(required)`

[//]: # (@formatter:on )

[//]: # (@formatter:off)

>```html
><insert value="..." store="..."></insert>
>```
> **Tag:** insert `(functional type)` \
> **Contains:** nothing \
> **Attributes:** value `(name)` `(required)`, store `(name)` `(required)`

[//]: # (@formatter:on )

**Example:**

[//]: # (@formatter:off)
```html
<store name="config">
  <value name="version">1.0.0</value>
  <value name="name">Hello world!</value>
  <value name="link">https://www.example.com</value>
</store>

<div>
  A version of something:
  <insert value="version" store="config"></insert>, more at
  <insert value="link" store="config"></insert>
</div>
```
[//]: # (@formatter:on )

**Output:**

[//]: # (@formatter:off)
```html
<div>
  A version of something:
  1.0.0, more at
  https://www.example.com
</div>
```
[//]: # (@formatter:on )

**Important:** do not put <insert> in the attributes of other elements - it will not work.
Use [Container](#container) to create such a store.

### Container

The container is similar to a [store](#store), but contains HTML elements instead of values. It is useful when you can
avoid duplicate elements or nested constructions.

[//]: # (@formatter:off)

>```html
><container name="...">...elements...</container>
>```
> **Tag:** container `(common type)` \
> **Contains:** elements `(optional)` \
> **Attributes:** name `(required)`

[//]: # (@formatter:on )

[//]: # (@formatter:off)

>```html
><insert container="..."></insert>
>```
> **Tag:** insert `(functional type)` \
> **Contains:** nothing \
> **Attributes:** container `(name)` `(required)`

[//]: # (@formatter:on )

**Example:**

[//]: # (@formatter:off)
```html
<container name="firstLink">
  <a href="https://example.org/">first</a>
</container>

<container name="secondLink">
  <a href="https://www.example.org/">second</a>
</container>

<container name="list">
  <div> Fruits
    <ul>
      <li>Apple</li>
        <li>Orange</li>
    </ul>
  </div>
</container>

<div>
  <insert container="firstLink"></insert>
  <div>
    <insert container="firstLink"></insert>
  </div>
</div>
```
[//]: # (@formatter:on )

**Output:**

[//]: # (@formatter:off)
```html
<div>
  <a href="https://example.org/">first</a>
  <div>
    <a href="https://example.org/">first</a>
  </div>
</div>
```
[//]: # (@formatter:on )

To use the Hipe parser, use the `Parser` class.

```javascript
const newStr = new Parser(str).htmlToString();
```

[Read more about API...][DOCS_URL]