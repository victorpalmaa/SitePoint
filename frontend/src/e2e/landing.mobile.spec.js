import { test, expect } from '@playwright/test';

test.describe('Landing - Mobile UX', () => {
  test('navega para produtos ao tocar na área central', async ({ page }) => {
    await page.goto('/');
    await page.click('div[style*="background-image"]');
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole('img', { name: 'POINTLISM' })).toBeVisible();
  });
});