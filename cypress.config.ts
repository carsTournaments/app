import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "9jwmn3",
    baseUrl: 'http://localhost:8100',
    env: {
    //   url: 'https://carstournaments.com'
    url: 'http://localhost:8100'

    }
  },
});
