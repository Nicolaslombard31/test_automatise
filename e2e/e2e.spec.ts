import { test, expect } from '@playwright/test';

test('convert length', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.selectOption('#category', 'length');
  await page.fill('#fromValue', '1');
  await page.fill('#fromUnit', 'meter');
  await page.fill('#toUnit', 'foot');
  await page.click('button');
  await expect(page.locator('#result')).toContainText('3.28084');
});
