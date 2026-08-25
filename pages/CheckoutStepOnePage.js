// @ts-check

class CheckoutStepOnePage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    // Header
    this.burgerMenu = page.getByRole('button', { name: 'Open menu' });
    this.brandTitle = page.getByText("TTACart", { exact: true });
    this.cartLink = page.getByRole('link', { name: 'Shopping cart' });
    // Page
    this.pageTitle = page.locator('[data-test="title"]');
    // Form fields
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    // Buttons
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.cancelButton = page.getByText('Cancel', { exact: true });
    // Error
    this.errorMessage = page.getByRole("alert");
    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
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
