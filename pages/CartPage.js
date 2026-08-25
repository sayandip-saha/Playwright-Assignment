// @ts-check

class CartPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;

    // Header
    this.burgerMenu = page.locator("#react-burger-menu-btn");

    this.brandTitle = page.locator(".tta-brand-title");

    this.cartTitle = page.locator('[data-test="title"]');

    // Page
    this.pageTitle = page.locator(".page-title");

    // Cart
    this.cartHeader = page.locator(".cart-row-head");

    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.emptyCartMessage = page.locator('[data-test="cart-empty"]');

    this.quantity = page.locator(".qty");

    this.cartProductNames = page.locator(".inventory-item-name");

    this.cartPrices = page.locator(".cart-price");

    this.removeButtons = page.locator(".btn-remove");

    // Navigation buttons
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );

    this.checkoutButton = page.locator('[data-test="checkout"]');

    // Footer
    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator('[data-test="social-twitter"]');

    this.facebookIcon = page.locator('[data-test="social-facebook"]');

    this.linkedinIcon = page.locator('[data-test="social-linkedin"]');

    this.footerText = page.locator('[data-test="footer-copy"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/cart",
    );
  }

  /**
   * @param {number} index
   */
  getCartItem(index = 0) {
    return this.cartItems.nth(index);
  }

  /**
   * @param {number} index
   */
  async removeProduct(index = 0) {
    await this.removeButtons.nth(index).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * @param {number} index
   */
  async getProductName(index = 0) {
    return await this.cartProductNames.nth(index).textContent();
  }

  /**
   * @param {number} index
   */
  async getQuantity(index = 0) {
    return await this.quantity.nth(index).textContent();
  }
}

export default CartPage;
