import { setup, startRecording, stopRecording, saveRecording } from 'bugreplay-automation'

declare var Cypress: any;
declare var cy: any;
function setupBugReplayPlugin(on: any, config:any) {
  on('before:browser:launch', (browser:any, launchOptions:any) => {
    // supply the absolute path to an unpacked extension's folder
    // NOTE: extensions cannot be loaded in headless Chrome
    launchOptions.extensions.push('./node_modules/cypress-bugreplay/node_modules/bugreplay-automation/extension/')
    launchOptions.args.push('--auto-select-desktop-capture-source=cypress-example')

    return launchOptions
  })
}

function setupBugReplaySupport(apiKey:string) {
  const testRunId = process.env.TEST_RUN_ID || new Date().toISOString()
  Cypress.on('test:before:run', async (test:any, instance:any) => {
    await setup(apiKey)
    await startRecording()
  })

  Cypress.on('test:after:run', async (test:any, instance:any) => {
    const time = (new Date()).toISOString() 
    const hierarchy = test.invocationDetails.relativeFile.replace("cypress/","").replace("/", " > ") + " > " + test.title
    await stopRecording()
    await saveRecording(`Cypress - ${test.invocationDetails.relativeFile} - ${test.title} - ${time}`, {
      test_hierarchy: hierarchy,
      test_passed: test.state === "passed",
      test_run_id: testRunId,
    })
  })
}

export default { setupBugReplaySupport, setupBugReplayPlugin }
module.exports = { setupBugReplaySupport, setupBugReplayPlugin } 
