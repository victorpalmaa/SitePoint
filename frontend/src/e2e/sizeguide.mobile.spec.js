import { test, expect } from '@playwright/test';

test.describe('Provador virtual - Mobile UX', () => {
  test('produto vestível abre provador com imagem', async ({ page }) => {
    await page.goto('/product/1');
    await page.getByRole('button', { name: 'Provador virtual' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Provador virtual' })).toBeVisible();
    await expect(page.getByText('Tabela de tamanhos da peça')).toBeVisible();
  });

  test('anel não possui botão de provador', async ({ page }) => {
    await page.goto('/product/4');
    await expect(page.getByRole('button', { name: 'Provador virtual' })).toHaveCount(0);
  });
});