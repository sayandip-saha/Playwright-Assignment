// @ts-check

class CheckoutCompletePage {
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
    this.pageTitle = page.getByText("Checkout: Complete!", { exact: true });
    // Order confirmation
    this.successIcon = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.getByRole("heading", {
      name: "Thank you for your order!",
    });
    this.completeText = page.locator('[data-test="complete-text"]');
    // Button
    this.backToProductsButton = page.getByRole("link", { name: "Back Home" });
    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
    this.footerText = page.locator('[data-test="footer-copy"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/checkout-complete",
    );
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

export default CheckoutCompletePage;
