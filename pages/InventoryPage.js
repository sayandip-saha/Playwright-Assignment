// @ts-check

export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.productCards = page.locator(
      '[data-test="inventory-item"]'
    );

    this.addToCartButtons = page.locator(".item-btn");

    this.cartLink = page.locator(
      '[data-test="shopping-cart-link"]'
    );

    this.cartBadge = page.locator(
      '[data-test="shopping-cart-badge"]'
    );

    this.pageTitle = page.locator(".page-title");
  }

  async goto() {
    await this.page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/inventory"
    );
  }

  async addProduct(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getProductName(index = 0) {
    return await this.productCards
      .nth(index)
      .locator('[data-test="inventory-item-name"]')
      .textContent();
  }
}