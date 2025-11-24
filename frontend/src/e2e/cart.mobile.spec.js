import { test, expect } from '@playwright/test';

test.describe('Carrinho - Mobile UX', () => {
  test('adiciona ao carrinho, abre, verifica item e checkout', async ({ page }) => {
    await page.goto('/product/1');
    await page.getByRole('button', { name: /Adicionar ao carrinho/i }).click();
    const sidebar = page.locator('div[class*="max-w-md"][class*="right-0"][class*="top-0"]');
    await expect(sidebar.getByRole('button', { name: 'Finalizar Compra' })).toBeVisible();
    await expect(sidebar.getByText('Camping Boxy Tee', { exact: true })).toBeVisible();
    await expect(sidebar.getByText(/Subtotal/)).toBeVisible();

    await page.getByRole('button', { name: 'Finalizar Compra' }).click();
    await expect(page).toHaveURL(/https:\/\/(wa\.me|api\.whatsapp\.com)\/send/);
  });
});