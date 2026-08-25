// @ts-check

class CheckoutCompletePage {
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

    // Order confirmation
    this.successIcon = page.locator(".tick");

    this.completeHeader = page.locator('[data-test="complete-header"]');

    this.completeText = page.locator('[data-test="complete-text"]');

    // Button
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');

    // Footer
    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator('[data-test="social-twitter"]');

    this.facebookIcon = page.locator('[data-test="social-facebook"]');

    this.linkedinIcon = page.locator('[data-test="social-linkedin"]');

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
