// @ts-check
import { chromium } from '@playwright/test';
import users from '../data/users.js';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to login URL
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');

  // Fill in login credentials
  await page.locator('#user-name').fill(users.standardUser.username);
  await page.locator('#password').fill(users.standardUser.password);
  await page.locator('#login-button').click();

  // Wait until redirected to inventory page
  await page.waitForURL(/.*inventory/);

  // Save authenticated cookies and local storage to JSON
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;