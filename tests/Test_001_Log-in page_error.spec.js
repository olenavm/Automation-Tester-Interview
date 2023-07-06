// @ts-check
const { test, expect, chromium } = require('@playwright/test');

const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1200;


test("Trying to login with wrong credentials",async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext( { storageState: undefined, viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT}});
  let page = await context.newPage(); 

  await page.goto('https://dashboard.nexudus.com/');
  await expect(page).toHaveTitle('Sign in to Nexudus Platform');
  await page.getByLabel('Email').fill('bad@example.com');
  await page.getByLabel('Password').fill('badpassword');
  const clickButton = await page.locator ("button[type=submit]");
  await clickButton.click();
    
  const errorMessage = await page.getByText('The email or password is incorrect.');
  await expect(errorMessage !== undefined ).toBeTruthy();
}); 