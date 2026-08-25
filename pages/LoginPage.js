// @ts-check

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");

    this.brandTitle = page.locator(".tta-brand-title");
    this.loginCard = page.locator(".login-card");
    this.loginHint = page.locator(".login-hint");

    this.errorMessage = page.getByRole("alert");

    this.pageTitle = page.locator(".page-title");
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/",
    );
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getUsernameValidationMessage() {
    return await this.usernameInput.evaluate(
      /** @param {HTMLInputElement} input */
      (input) => input.validationMessage,
    );
  }
}

export default LoginPage;