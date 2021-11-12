# EthOS core package

This package includes some core features used by the EtheranOS apps, like the plugin system and the integration with Ethereum.

## Features

### Plugin system

The plugin system is a set of React custom hooks and context providers to manage the plugins.

The whole source code is in the `src/hooks/userPlugin.js` file.

The plugin system manages two kinds of data: **plugins** and **placeholders**.

Placeholders hold an ordered list of items grouped by name. For example, you can have a set of "menu" items, a set of "router" items, etc.

The exported objects are:

- `PluginsContextProvider` context provider for the plugin system
- `usePlugins` hook that returns the installed plugins
- `usePlaceholder` hook that returns the installed placeholders

Look at the file `src/App.js` inside the `app` package and at the file `src/index.js` inside the `sampe-plugin` package for an example of use of the plugin system.

Basically, in the app you need to provide a PluginsContextProvider with the plugin definition:

```js
<PluginsContextProvider plugins={[samplePlugin]}>
```

The plugin definition is an object with an `init` method that initializes the plugin with the required placeholders, for example:

```js
const pluginDefinition = {
  name: 'sample-plugin',
  init: ({ addElement }) => {
    addElement('menu', {
      name: 'home',
      label: 'Home',
      link: '/',
      index: 10,
    })
    addElement('menu', {
      name: 'about',
      label: 'About',
      link: '/about',
      index: 20,
    })
  },
}
```

### Ethereum integration

The intergration with Ethereum is performed in the `src/hooks/useWeb3.js` file.

It provides:

- a `Web3ContextProvider` which initialize web3 with the provided context.
- a `useWeb3` React custom hook which returns the following information:
    - a `connect` function to start connecting to Ethereum
    - an `onEthereumUpdate` function to listen to changes
    - all the details of the current connection:
        - web3
        - chainId
        - web3ForLogs
        - allContracts
        - proxyChangedTopic
        - dfoHubENSResolver
        - uniswapV2Factory
        - uniswapV2Router
        - wethAddress
        - list
        - dfoHub
        - walletAddress
        - walletAvatar
        - connectionStatus
    - a `webs3States` array holding the available states (`NOT_CONNECTED`, `CONNECTED`, `CONNECTING`)
    

### Global Context Provider

The global context provider allows to inject providers from the plugins available globally.

Eg.

```js
<PluginsContextProvider plugins={[appPlugin, organizationPlugin]}>
  <GlobalContextsProvider>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </GlobalContextsProvider>
</PluginsContextProvider>
```

allows to have a context structure like:

```js
<PluginsContextProvider plugins={[appPlugin, organizationPlugin]}>
  <InjectedProvider1>
    <InjectedProvider2>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </InjectedProvider2>
  </InjectedProvider1>
</PluginsContextProvider>
```

The providers can be added from the `init` function usng the `addElement` method with the `globalContexts` keyword

Eg.

```js
addElement('globalContexts', {
  name: 'InjectedProvider1',
  Component: InjectedProvider1,
  index: 10,
})

addElement('globalContexts', {
  name: 'InjectedProvider2',
  Component: InjectedProvider2,
  index: 20,
})
```

### Other hooks

There is another hook in this package called `usePrevious`. It simply returns the previously stored value.

It's used in the `Connect` component inside the `app` package to check if the connection state passed from `CONNECTING` to `CONNECTED`.

## Build

This package uses [rollup](https://rollupjs.org/guide/en/) to create the bundle.

To build the package, you can use the `lerna` scripts in the root project (`build` and `build-dev`), as stated in the root project documentation.

If you prefer to build only this package, just run:

```shell script
npm run build
```

to simply build the package, or

```shell script
npm run build:dev
```

to build and keep watching for changes.

## Development with `Interfaces-Framework`

To use `interfaces-core` for development (so using a checked-out version instead of the `npm` dependencies) some steps must be followed.

Assuming that we have cloned [Interfaces-Framework](https://github.com/EthereansOS/Interfaces-Framework) in the same folder where we cloned this repo, we need to:

- `npm install`
- `npm link ../Interfaces-Framework/node_modules/react`
- `npm build`
- `npm link`

The first `npm link` links the `react` used by `Interfaces-Framework` to avoid [this problem](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).

Then, in `Interface-Framework`, for each packages/\*:

- `npm link @ethereansos/interfaces-core`
- Remove `package-lock.js`
- Execute `npm install` in `Interfaces-Framework`

PS: Remember to execute **just** the linkings everytime you install a new dependency in either of the two projects.

### Development in watch mode

To start build the core at each file change, after having followed the above instructions, just run `npm run build:dev` and if you've linked this package with the Interfaces-Framework package, you'll see live changes as soon as you edit the code.

## Known issues

Be sure that `Interfaces-Framework` uses the new dependencies @ethereansos/core and **not** `@dfohub/core`. If not, change the import.


### Commits

Commits are linted automatically using [Commitlint](https://commitlint.js.org/) which check if your commit messages meet the [conventional commit format)[https://www.conventionalcommits.org/en/v1.0.0/]
