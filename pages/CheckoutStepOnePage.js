// @ts-check

class CheckoutStepOnePage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;

    // Header
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.brandTitle = page.locator(".tta-brand-title");
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');

    // Page
    this.pageTitle = page.locator('[data-test="title"]');

    // Form fields
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");

    // Buttons
    this.continueButton = page.locator('[data-test="continue"]');

    this.cancelButton = page.locator('[data-test="cancel"]');

    // Error
    this.errorMessage = page.getByRole("alert");

    // Footer
    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator('[data-test="social-twitter"]');

    this.facebookIcon = page.locator('[data-test="social-facebook"]');

    this.linkedinIcon = page.locator('[data-test="social-linkedin"]');

    this.footerText = page.locator('[data-test="footer-copy"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/checkout-step-one",
    );
  }

  /**
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async checkoutWithCustomerInformation(firstName, lastName, postalCode) {
    await this.fillCustomerInformation(firstName, lastName, postalCode);

    await this.continue();
  }
}

export default CheckoutStepOnePage;
