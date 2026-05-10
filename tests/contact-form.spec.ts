import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato', () => {
  test('Deve exibir o formulário de contato', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.contact-form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#service')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('Deve exibir erro ao tentar enviar formulário vazio', async ({ page }) => {
    await page.goto('/');
    await page.click('.contact-form button[type="submit"]');
    await expect(page.locator('.notification-error')).toBeVisible();
  });

  test('Deve preencher o formulário corretamente', async ({ page }) => {
    await page.goto('/');
    
    await page.fill('#name', 'Teste de Usuário');
    await page.fill('#email', 'teste@exemplo.com');
    await page.selectOption('#service', 'software');
    await page.fill('#message', 'Esta é uma mensagem de teste com mais de 10 caracteres para validação.');
    
    await expect(page.locator('#name')).toHaveValue('Teste de Usuário');
    await expect(page.locator('#email')).toHaveValue('teste@exemplo.com');
    await expect(page.locator('#service')).toHaveValue('software');
    await expect(page.locator('#message')).toHaveValue('Esta é uma mensagem de teste com mais de 10 caracteres para validação.');
  });

  test('Deve exibir todas as opções de serviço', async ({ page }) => {
    await page.goto('/');
    
    const services = [
      'Desenvolvimento Sob Medida',
      'Dados & Analytics',
      'Infraestrutura Cloud',
      'Segurança da Informação',
      'Inteligência Artificial',
      'Consultoria Estratégica',
      'Suporte Técnico',
    ];
    
    for (const service of services) {
      await expect(page.locator(`.contact-form option:text("${service}")`)).toBeVisible();
    }
  });
});
