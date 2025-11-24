import { test, expect } from '@playwright/test';

test.describe('Produto - Mobile UX', () => {
  test('layout em uma coluna e modal de detalhes abre', async ({ page }) => {
    await page.goto('/product/1');

    const gridRoot = page.locator('main > div.grid.grid-cols-1');
    await expect(gridRoot).toBeVisible();
    // grid em mobile usa grid-cols-1; visibilidade garante presença do container correto

    await page.getByRole('button', { name: 'Detalhes do produto' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Detalhes do produto' })).toBeVisible();
  });

  test('troca de imagem ao tocar miniatura', async ({ page }) => {
    await page.goto('/product/1');
    const mainImg = page.locator('main img[alt="Camping Boxy Tee"]');
    await expect(mainImg).toBeVisible();

    await page.locator('img[alt="Camping Boxy Tee 3"]').click();
    await page.waitForTimeout(350);
    await expect(mainImg).toHaveAttribute('src', /IMG_3\.(jpg|JPG)$/);
  });
});