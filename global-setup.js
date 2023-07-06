import { chromium, expect, FullConfig } from '@playwright/test';
import { url, username, password } from './local.config';

async function globalSetup(config) {

  console.log("Interactive mode: " + (process.env.HEADLESS ? "No" : "Yes") + "\n");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);
  
  await page.getByLabel('Email').fill(username);
  
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  //await expect(page).toHaveTitle('Kalkio Space - East Side'); 
  let el = await page.locator('.euiBreadcrumb >> nth=1 >> a');
  await expect(el).toHaveText('Dashboard');
  console.log("Logged in");
  
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;

