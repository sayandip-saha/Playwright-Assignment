// @ts-check

class CheckoutStepTwoPage {
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

    // Cart / Order summary
    this.cartHeader = page.locator(".cart-row-head");

    this.summaryBlock = page.locator(".summary-block");

    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.productNames = page.locator('[data-test="inventory-item-name"]');

    // Buttons
    this.cancelButton = page.locator('[data-test="cancel"]');

    this.finishButton = page.locator('[data-test="finish"]');

    // Footer
    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator('[data-test="social-twitter"]');

    this.facebookIcon = page.locator('[data-test="social-facebook"]');

    this.linkedinIcon = page.locator('[data-test="social-linkedin"]');

    this.footerText = page.locator('[data-test="footer-copy"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/checkout-step-two",
    );
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  /**
   * @param {number} index
   */
  async getProductName(index = 0) {
    return await this.productNames.nth(index).textContent();
  }
}

export default CheckoutStepTwoPage;
