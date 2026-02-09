const { expect } = require('@playwright/test');

const abrirPagina = async (page) => {
    await page.goto('/register');
}

const digitarEmail = async (page, email) => {
    await page.fill('#email_create', email);
}

const clicarBotaoCadastrar = async (page) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
}

const validarCadastroRealizado = async (page, email) => {
    await expect(page.getByRole('heading', { name: 'Cadastro realizado' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(`Bem-vindo, ${email}`)).toBeVisible();
}

const validarCadastroNegado = async (page, mensagemErro) => {
    await expect(page.getByText(mensagemErro)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cadastro realizado' })).not.toBeVisible();
}

const digitarSenha = async (page, senha) => {
    await page.fill('#password', senha);
}

module.exports = {
    abrirPagina,
    digitarEmail,
    clicarBotaoCadastrar,
    validarCadastroRealizado,
    validarCadastroNegado,
    digitarSenha,
};