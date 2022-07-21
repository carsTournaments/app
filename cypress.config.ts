import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    arch: 'arm64',
    browsers: [
      {
        name: 'chrome',
        family: 'chromium',
        channel: 'stable',
        displayName: 'Chrome',
        version: '103.0.5060.134',
        path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        minSupportedVersion: 64,
        majorVersion: 103,
      },
    ],
    downloadsFolder: 'cypress/downloads',
    videosFolder: 'cypress/videos',
  },
});
