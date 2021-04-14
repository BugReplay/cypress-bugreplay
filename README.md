# BugReplay Cypress Plugin 
The BugReplay Cypress plugin records screencasts of your automated tests including timesynced JavaScript Console and Network logs

## Installation
Install the package

```sh
npm install cypress-bugreplay --save-dev
```

## Configuration
You will need to sign up for an account at https://bugreplay.com. After that you will need to login and get an API key by clicking the Hamburger Menu, click My Settings, and then Show API Key. You'll use this in the cypress/support/index.js file.

After you've initialized your project for Cypress you'll need to edit a few files to configure the plugin:

```js
// cypress/plugins/index.js
const { setupBugReplayPlugin } = require('cypress-bugreplay')
module.exports = (on, config) => {
  setupBugReplayPlugin(on, config)
}

// cypress/support/index.js
import { setupBugReplaySupport } from 'cypress-bugreplay'
setupBugReplaySupport("YOUR_API_KEY_GOES_HERE")
```

After this configuration your tests will automatically be recorded to video, uploaded to BugReplay, and ready for playback alongside the timesynced JS console and network traffic logs.

## Limitations
This currently only works for Chrome. We're looking to expand to other browsers in the future.
