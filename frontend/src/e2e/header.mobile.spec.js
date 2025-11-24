import { test, expect } from '@playwright/test';

test.describe('Header e Carrinho - Mobile', () => {
  test('abre e fecha carrinho pelo ícone do header', async ({ page }) => {
    await page.goto('/product/1');

    await page.getByRole('button', { name: /Itens/i }).click();
    const sidebar = page.locator('div[class*="max-w-md"][class*="right-0"][class*="top-0"]');
    await expect(sidebar).toBeVisible();

    await page.locator('div[class*="bg-black/40"]').click({ force: true });
    await expect(sidebar).toHaveClass(/translate-x-full/);
  });

  test('logo do header leva para a Home', async ({ page }) => {
    await page.goto('/product/2');
    await page.locator('button:has(img[alt="POINT"])').click();
    await expect(page).toHaveURL(/\/$/);
  });
});