import { test, expect } from '@playwright/test';

test.describe('Favicon e ícones - Mobile', () => {
  test('favicon PNG presente no head', async ({ page }) => {
    await page.goto('/');
    const ok = await page.evaluate(() => !!document.querySelector('link[rel="icon"][href*="LOGO%20POINT.png"]'));
    expect(ok).toBe(true);
  });
});