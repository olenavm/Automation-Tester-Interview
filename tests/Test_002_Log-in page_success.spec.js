// @ts-check
const { test, expect, chromium } = require('@playwright/test');

const HEADLESS_MODE = process.env.HEADLESS ? true : false;
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1200;

async function check(el) {
    if (HEADLESS_MODE) { return }
    await el.evaluate(element => element.style.border = '3px solid blue');
}

test("Trying to login with correct credentials",async () => {
    const url = 'https://dashboard.nexudus.com';
    const delay = 5000;

    const browser = await chromium.launch({ headless: HEADLESS_MODE, slowMo: delay});
    const context = await browser.newContext( { viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT}});

    let page = await context.newPage();
    
    await page.goto(url);

    let el = await page.locator('.euiBreadcrumb >> nth=1 >> a');
    await expect(el).toHaveText('Dashboard');
  
}); 
