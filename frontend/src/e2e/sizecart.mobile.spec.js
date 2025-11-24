import { test, expect } from '@playwright/test';

test.describe('Seleção de tamanho e carrinho - Mobile UX', () => {
  test('seleciona tamanho G, adiciona ao carrinho e verifica', async ({ page }) => {
    await page.goto('/product/1');
    await page.getByRole('button', { name: 'G', exact: true }).click();
    await page.getByRole('button', { name: /Adicionar ao carrinho/i }).click();

    const sidebar = page.locator('div[class*="max-w-md"][class*="right-0"][class*="top-0"]');
    await expect(sidebar.getByText('Camping Boxy Tee', { exact: true })).toBeVisible();
    await expect(sidebar.getByText('Tamanho: G')).toBeVisible();
  });

  test('decrementa quantidade e remove item do carrinho', async ({ page }) => {
    await page.goto('/product/2');
    await page.getByRole('button', { name: 'M', exact: true }).click();
    await page.locator('button[class*="w-8"][class*="h-8"][class*="p-0"]').last().click();
    await page.getByRole('button', { name: /Adicionar ao carrinho/i }).click();

    const sidebar = page.locator('div[class*="max-w-md"][class*="right-0"][class*="top-0"]');
    await expect(sidebar.getByText('Hiking Over Tee', { exact: true })).toBeVisible();
    await expect(sidebar.getByText('Qtd: 2')).toBeVisible();

    await sidebar.getByRole('button', { name: 'Diminuir' }).click();
    await expect(sidebar.getByText('Qtd: 1')).toBeVisible();

    await sidebar.getByRole('button', { name: 'Remover' }).click();
    await expect(sidebar.getByText('Seu carrinho está vazio.')).toBeVisible();
  });
});