// @ts-check

class ProductCard {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;

    // Header
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.brandTitle = page.locator(".tta-brand-title");
    this.cartLink = page.locator(
      '[data-test="shopping-cart-link"]',
    );
    this.cartBadge = page.locator(
      '[data-test="shopping-cart-badge"]',
    );

    // Product details
    this.pageTitle = page.locator(".page-title");
    this.backButton = page.locator(".back-btn");
    this.productImage = page.locator(".item-img");

    this.productName = page.locator(
      '[data-test="inventory-item-name"]',
    );

    this.productDescription = page.locator(
      '[data-test="inventory-item-desc"]',
    );

    this.productPrice = page.locator(
      '[data-test="inventory-item-price"]',
    );

    // Cart buttons
    this.addToCartButton = page.locator(
      '[data-test="add-to-cart"]',
    );

    this.removeButton = page.locator(
      '[data-test="remove"]',
    );

    // Footer
    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator(
      '[data-test="social-twitter"]',
    );

    this.facebookIcon = page.locator(
      '[data-test="social-facebook"]',
    );

    this.linkedinIcon = page.locator(
      '[data-test="social-linkedin"]',
    );

    this.footerText = page.locator(
      '[data-test="footer-copy"]',
    );
  }

  /**
   * @param {string} productId
   */
  async goto(productId = "test-allthethings-tshirt-red") {
    await this.page.goto(
      `https://app.thetestingacademy.com/playwright/ttacart/inventory-item?id=${productId}`,
    );
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async removeProductFromCart() {
    await this.removeButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }
}

export default ProductCard;