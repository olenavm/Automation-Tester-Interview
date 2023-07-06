// @ts-check
const { test, expect, chromium } = require('@playwright/test');

const HEADLESS_MODE = process.env.HEADLESS ? true : false;
const VIEWPORT_WIDTH = 1600;
const VIEWPORT_HEIGHT = 1080;

test("Navigate to billing_products",async () => {
    const url = 'https://dashboard.nexudus.com/billing/products';
    const delay = 1000;

    const browser = await chromium.launch({ headless: HEADLESS_MODE, slowMo: delay});
    const context = await browser.newContext( { viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT}});

    let page = await context.newPage();
  
   
    await page.goto(url);
   
    
    // Fill the Product Name, Description and Price fields
    const timestamp = new Date().getTime();

    const productName = 'OM_Product ' + timestamp;
    const productDescription = 'OM_ProductDescription';
    const productPrice = 100;

    let el = page.getByRole('button', { name: 'Add product' })
    await el.click();

    el = page.getByRole('button', { name: 'Manual entry' });
    await el.click();

    el =  page.getByLabel('Product name');
    await el.click();
    await el.fill(productName);

    const productDescriptionLabel = await page.locator('label',{hasText:'Product description'});
    const productDescriptionDiv = productDescriptionLabel.locator('..').locator('..');
    const productDescriptionField = await productDescriptionDiv.locator('textarea');
    await productDescriptionField.fill(productDescription);    

    //ToDo: need to wait
    
    await page.getByLabel('Unit price').click();
    await page.getByLabel('Unit price').fill('10');
    await page.getByRole('button', { name: 'Save changes' }).click();

    await page.getByPlaceholder('Type to search by name').fill(productName);
    await page.getByRole('checkbox', { name: 'Select this row' }).first().check();
    await page.getByRole('button', { name: 'Delete 1 record' }).click();
    await page.getByRole('button', { name: 'Yes, do it' }).click();
   
    await page.waitForLoadState('networkidle');  

    await page.getByPlaceholder('Type to search by name').fill(productName);
    await page.waitForLoadState('networkidle'); 
    expect(await page.getByRole('checkbox', { name: 'Select this row' }).count()).toEqual(0);
    
});
