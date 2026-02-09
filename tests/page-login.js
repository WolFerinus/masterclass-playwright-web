const { expect } = require('@playwright/test');

const abrirPagina = async (page) => {
  await page.goto('/login');
}

const digitarEmail = async (page, email) => {
  await page.locator('#user').fill(email);
}

const digitarSenha = async (page, senha) => {
  await page.locator('#password').fill(senha);
}

const clicarBotaoLogin = async (page) => {
  await page.getByRole('button', { name: 'Login' }).click();
}

const validarLoginRealizado = async (page, email) => {
  await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(`Olá, ${email}`)).toBeVisible();
}

const validarLoginNegado = async (page, mensagemErro) => {
  await expect(page.getByText(mensagemErro)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Login realizado' })).not.toBeVisible();
}

module.exports = {
  abrirPagina,
  digitarEmail,
  digitarSenha,
  clicarBotaoLogin,
  validarLoginRealizado,
  validarLoginNegado,
};
