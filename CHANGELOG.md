# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/mineejo/hipe/compare/v2.0.0...v3.0.0) (2023-07-11)


### ⚠ BREAKING CHANGES

* use Prettier API for HTML formatting
* add unwrapping to preserve the original html look
* add a document wrapper to fix the conversion of multiple HTML strings
* position ignoring by redirect mod
* refactor and write a reset of custom tags to normal HTML tags

### Features

* add a document wrapper to fix the conversion of multiple HTML strings ([7227908](https://github.com/mineejo/hipe/commits/72279082440a42716072ac2633d32a9ed7228e16))
* add a hint to the method of adding modifications ([3d71ecf](https://github.com/mineejo/hipe/commits/3d71ecf9cb6cdae3c45b5957b6a1ebd3a3f88eca))
* add a method to get element Hipe by attribute value ([85e209c](https://github.com/mineejo/hipe/commits/85e209c92aeecc3ae0ff7d55f77f479dc4fa9682))
* add and correct comments ([d12d0dc](https://github.com/mineejo/hipe/commits/d12d0dc0bb7ce09c3a1601babd7f54df8f9614b7))
* add and update comments ([243003d](https://github.com/mineejo/hipe/commits/243003d7975a356e39608b0ef24c504c1888710a))
* add clarity to the name of the method for getting an item ([104f008](https://github.com/mineejo/hipe/commits/104f0080819d66f433c1ad5ea82327fe44756793))
* add type hint to Readme.md ([a4ada25](https://github.com/mineejo/hipe/commits/a4ada25e68d58957bd325941f85a45cf05f9b747))
* add unwrapping to preserve the original html look ([f7539fc](https://github.com/mineejo/hipe/commits/f7539fca59507333dceb791a8294f69a38a7ebbb))
* give the mods their proper names ([0137bc5](https://github.com/mineejo/hipe/commits/0137bc5c696b1e419a4b804663fd2b1d37d4af50))
* refactor and write a reset of custom tags to normal HTML tags ([bcd5f97](https://github.com/mineejo/hipe/commits/bcd5f972c69c1880e84777ddd1efd9b184373c3a))
* replace "meta" tag with "noscript" to return content to the element ([94acb86](https://github.com/mineejo/hipe/commits/94acb8638c8db28611c9a2681b7668fa38882776))
* rewrite the modifier functions and refactor a bit ([1193c88](https://github.com/mineejo/hipe/commits/1193c88e64f8b958417a145bc69b66c32060fb31))
* the document wrapper has been split into two classes ([04d3fa9](https://github.com/mineejo/hipe/commits/04d3fa998861989f5505e27de09bcdcacfbaa11a))
* update and add modification tests ([449d445](https://github.com/mineejo/hipe/commits/449d44507a4841855510542b8e8e9b87b0c827b4))
* update modifications for the new parsing ([4d49b9c](https://github.com/mineejo/hipe/commits/4d49b9cb3d18048de38322c0eecf011ccb44c109))
* use Prettier API for HTML formatting ([a0dfb2c](https://github.com/mineejo/hipe/commits/a0dfb2cc295868198d2fef271d134d98cdd8cae7))


### Bug Fixes

* a promise for Prettier. ([7072b1e](https://github.com/mineejo/hipe/commits/7072b1ed400ca6b0dde7849e36f7b301194a464a))
* appearance of the tooltip, so the plain text is more noticeable ([478087e](https://github.com/mineejo/hipe/commits/478087e2aef08e01f6c64a985304baee4fc64f33))
* command to run tests in workflow ([42e5306](https://github.com/mineejo/hipe/commits/42e53069848304293e31c8da3a3a730689bdbcab))
* description of the modification class of the Container ([817ec52](https://github.com/mineejo/hipe/commits/817ec5293cce2b97c8ebeafe1984773c0964748a))
* empty npm tab ([4db66a4](https://github.com/mineejo/hipe/commits/4db66a484f6007b7b9fbc204facb2cf33a101101))
* position ignoring by redirect mod ([f18a8c8](https://github.com/mineejo/hipe/commits/f18a8c8b81fc201cdfdcdd8c4ebd6174f6986921))
* the method name is htmlToString, but convert document ([1c1d1a7](https://github.com/mineejo/hipe/commits/1c1d1a78e281ad34fd41979fb5e711d7ee2bf7d9))
* unnecessary body tag in tests ([8290d0d](https://github.com/mineejo/hipe/commits/8290d0d0ab5ff70409cd451322b972ae830bfd3c))

## [2.0.0](https://github.com/mineejo/hipe/compare/v1.2.0...v2.0.0) (2023-06-14)


### ⚠ BREAKING CHANGES

* implement redirect modification

### Features

* add parser functions and comments ([0458e08](https://github.com/mineejo/hipe/commits/0458e0819b0442f9769ef241cf100e2604cd0de6))
* complete the package for convenient error handling ([1784872](https://github.com/mineejo/hipe/commits/178487201590e207d2a367a844ffa76b704ce5d8))
* handle type error on function call ([a5ca74b](https://github.com/mineejo/hipe/commits/a5ca74bafc5348199e56bb1de077e257e7c66a6a))
* implement redirect modification ([d5b8fca](https://github.com/mineejo/hipe/commits/d5b8fca90e3c5199fc5e784e4afebaa58e7c3f58))
* make running modification methods using a prototype ([b72a9c8](https://github.com/mineejo/hipe/commits/b72a9c815e75a335ec51bf93623b8ec3712c5da8))
* replace jest with ava, for more appropriate tests with ES6 ([2cd3727](https://github.com/mineejo/hipe/commits/2cd37275eb96084f450a4bc1f47a87eb1f6db93b))
* rewrite HTML parser ([51d25e6](https://github.com/mineejo/hipe/commits/51d25e6ca1636cea758a442b69347c36f660f519))
* rewrite index - cli ([c604121](https://github.com/mineejo/hipe/commits/c6041219ef356a7586bc7101c076e734ac59a1d4))
* rewrite test description for Avajs ([ce96854](https://github.com/mineejo/hipe/commits/ce968544850edcd9230bdaff21ed34f398ad2137))
* rewrite the file search code to a more readable ([dc23afd](https://github.com/mineejo/hipe/commits/dc23afd7ecba1c61c2df3af1b728e213d4c7e62a))
* simplify html to string conversion ([5691222](https://github.com/mineejo/hipe/commits/5691222fa5cdb3064c023c95dcc9a8a66e017f5c))
* update parser information ([bcf6a8e](https://github.com/mineejo/hipe/commits/bcf6a8e460a715f170a9920ede97c34304f3a345))


### Bug Fixes

* "return this" because of type contradiction with "return void" ([587bafd](https://github.com/mineejo/hipe/commits/587bafd0e46d645925cade53e36b7d2c1ddb2dcc))
* comment doc ([28e749a](https://github.com/mineejo/hipe/commits/28e749a1b539960dc2de2c0c43411ca386733271))
* eslint in yarn.lock ([357e359](https://github.com/mineejo/hipe/commits/357e359bbdbc8b1e8102ff85adf6e34d3b70f5e8))
* export parser ([90a146a](https://github.com/mineejo/hipe/commits/90a146ac4e19d582a1ff359d4cb73c8c2e7818a9))
* nullable checks ([9311283](https://github.com/mineejo/hipe/commits/9311283050133636772e30204792b0efd143285c))

## [1.2.0](https://github.com/mineejo/hipe/compare/v1.1.0...v1.2.0) (2023-06-05)

### Features

* limit description of methods in API documentation to basic
  implementation ([8d7f1e9](https://github.com/mineejo/hipe/commits/8d7f1e98609dcc7207233b2545868bfb29a850db))
* write the tags in more detail in
  README.md ([dc6f384](https://github.com/mineejo/hipe/commits/dc6f384410f28a50693a374a032996e3fade427a))

### Bug Fixes

* the references in the
  documentation ([b4f7cf9](https://github.com/mineejo/hipe/commits/b4f7cf93b89d3f47c56fb98bc19d6b4378a7d553))

## [1.1.0](https://github.com/mineejo/hipe/compare/v1.0.3...v1.1.0) (2023-06-05)

### Features

* add a hint about the Parser file extension to the
  README.md ([a284b6b](https://github.com/mineejo/hipe/commits/a284b6b4ecc3bb63a0340e9e20267cc3083cf1af))

### [1.0.3](https://github.com/mineejo/hipe/compare/v1.0.2...v1.0.3) (2023-06-05)

### Bug Fixes

* the old naming is peach ([0de64bb](https://github.com/mineejo/hipe/commits/0de64bb59a3c94fbf819614bc73384219824fb32))
* the unworkable link to the npm in the
  README.md ([302f270](https://github.com/mineejo/hipe/commits/302f27000b868aac12d29891a45f8575631b8f17))

### 1.0.2 (2023-06-05)
