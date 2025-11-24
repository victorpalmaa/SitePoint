import { test, expect } from '@playwright/test';

test.describe('Anel sem seleção de tamanho - Mobile', () => {
  test('produto 4 não exibe seção de Tamanho', async ({ page }) => {
    await page.goto('/product/4');
    await expect(page.getByRole('heading', { name: 'Tamanho' })).toHaveCount(0);
  });
});