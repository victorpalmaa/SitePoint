import { test, expect } from '@playwright/test';

const products = [
  { id: 1, name: 'Camping Boxy Tee' },
  { id: 2, name: 'Hiking Over Tee' },
  { id: 3, name: 'Sailing Hoodie' },
  { id: 4, name: 'Mineral Ring' },
];

test.describe('Lista de Produtos - Mobile UX', () => {
  test('abre cada produto e volta', async ({ page }) => {
    await page.goto('/products');
    for (const p of products) {
      await page.getByRole('img', { name: p.name }).click();
      await expect(page).toHaveURL(new RegExp(`/product/${p.id}$`));
      await expect(page.getByRole('heading', { name: p.name })).toBeVisible();
      await page.getByRole('button', { name: 'Voltar' }).click();
      await expect(page).toHaveURL(/\/products$/);
    }
  });
});