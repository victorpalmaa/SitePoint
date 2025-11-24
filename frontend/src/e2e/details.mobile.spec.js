import { test, expect } from '@playwright/test';

test.describe('Detalhes do produto - Mobile UX', () => {
  test('conteúdo específico para moletom', async ({ page }) => {
    await page.goto('/product/3');
    await page.getByRole('button', { name: 'Detalhes do produto' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const dialog1 = page.getByRole('dialog');
    await expect(dialog1.getByText('Oversized Boxy com Capuz')).toBeVisible();
    await expect(dialog1.getByText('400g/m²')).toBeVisible();
  });

  test('conteúdo específico para anel', async ({ page }) => {
    await page.goto('/product/4');
    await page.getByRole('button', { name: 'Detalhes do produto' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const dialog2 = page.getByRole('dialog');
    await expect(dialog2.getByText('Prata 925', { exact: true })).toBeVisible();
    await expect(dialog2.getByText('Artesanal', { exact: true })).toBeVisible();
  });
});