import { test, expect } from '@playwright/test';

test.describe('Navegação do Site', () => {
  test('Deve carregar a página inicial e exibir o logo', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/APOC Tecnologia/);
    await expect(page.locator('.nav-brand .logo-img')).toBeVisible();
  });

  test('Deve navegar para todas as seções pelo menu', async ({ page }) => {
    await page.goto('/');
    
    const links = [
      { text: 'Início', id: 'home' },
      { text: 'Serviços', id: 'services' },
      { text: 'Sobre', id: 'about' },
      { text: 'Contato', id: 'contact' },
    ];

    for (const link of links) {
      await page.click(`.nav-link:text("${link.text}")`);
      await page.waitForTimeout(500);
      const element = await page.locator(`#${link.id}`);
      await expect(element).toBeVisible();
    }
  });

  test('Deve exibir o botão "Fale Conosco" na seção hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-buttons .btn-primary')).toBeVisible();
    await expect(page.locator('.hero-buttons .btn-secondary')).toBeVisible();
  });

  test('Deve navegar ao clicar em "Fale Conosco"', async ({ page }) => {
    await page.goto('/');
    await page.click('.hero-buttons .btn-primary');
    await page.waitForTimeout(500);
    await expect(page.locator('#contact')).toBeVisible();
  });
});
