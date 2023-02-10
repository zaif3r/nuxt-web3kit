<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt Web3 Kit

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Web3 composables for Nuxt

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🚀 Composables for working with wallets, ENS, contracts, transactions, signing, etc.
- 💼 Built-in wallet connectors for MetaMask, WalletConnect, Coinbase Wallet, and Injected
- 🌀 Auto-refresh data on wallet, block, and network changes
- 💾 Store files to IPFS
- 🖳 Server-side authentication with EIP712 signatures
- 🦄 TypeScript ready
- 🖧 SSR friendly

## Quick Setup

1. Add `@zaifer/nuxt-web3kit` dependency to your project

```bash
# Using pnpm
pnpm add -D @zaifer/nuxt-web3kit

# Using yarn
yarn add --dev @zaifer/nuxt-web3kit

# Using npm
npm install --save-dev @zaifer/nuxt-web3kit
```

2. Add `@zaifer/nuxt-web3kit` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@zaifer/nuxt-web3kit'
  ]
})
```

That's it! You can now use Nuxt Web3 Kit in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module
