// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',

  // Execute globalSetup script before starting tests
  globalSetup: path.resolve(__dirname, './tests/global-setup.js'),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 5,
  reporter: 'html',

  use: {
    baseURL: 'https://app.thetestingacademy.com/playwright/ttacart/',
    // Apply saved state across tests
    storageState: 'storageState.json',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});