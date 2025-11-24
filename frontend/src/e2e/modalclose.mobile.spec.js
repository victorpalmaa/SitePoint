import { test, expect } from '@playwright/test';

test.describe('Fechamento de Modais - Mobile', () => {
  test('fecha modal de detalhes pelo botão Close', async ({ page }) => {
    await page.goto('/product/3');
    await page.getByRole('button', { name: 'Detalhes do produto' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
  });

  test('fecha provador virtual pelo botão Close', async ({ page }) => {
    await page.goto('/product/1');
    await page.getByRole('button', { name: 'Provador virtual' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
  });
});