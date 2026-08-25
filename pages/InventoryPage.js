// @ts-check

class InventoryPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    // Header
    this.burgerMenu = page.getByRole("button", { name: "Open menu" });
    this.brandTitle = page.getByText("TTACart", { exact: true });
    this.cartIcon = page.locator("a[id='shopping_cart_container'] svg");
    this.cartLink = page.getByRole("link", { name: "Shopping cart" });
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    // Page
    this.pageTitle = page.getByText("Products", { exact: true });
    this.sortDropdown = page.getByRole("combobox", {
      name: "Sort products",
    });
    // Products
    this.products = page.locator('[data-test="inventory-item"]');
    this.productButtons = page.locator(".item-btn");
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productDescriptions = page.locator(
      '[data-test="inventory-item-desc"]',
    );
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productImages = page.locator('[data-test="item-img-link"]');
    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
    this.footerText = page.locator('[data-test="footer-copy"]');
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/inventory",
    );
  }

  /**
   * Add product by index.
   *
   * @param {number} index
   */
  async addProduct(index = 0) {
    await this.productButtons.nth(index).click();
  }

  /**
   * Remove product by index.
   *
   * @param {number} index
   */
  async removeProduct(index = 0) {
    await this.productButtons.nth(index).click();
  }

  /**
   * Get a product locator by index.
   *
   * @param {number} index
   */
  getProduct(index = 0) {
    return this.products.nth(index);
  }

  /**
   * Get product name by index.
   *
   * @param {number} index
   */
  async getProductName(index = 0) {
    return await this.productNames.nth(index).textContent();
  }

  /**
   * Get product price by index.
   *
   * @param {number} index
   */
  async getProductPrice(index = 0) {
    return await this.productPrices.nth(index).textContent();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartBadgeText() {
    return await this.cartBadge.textContent();
  }

  async openSortDropdown() {
    await this.sortDropdown.click();
  }
}

export default InventoryPage;
