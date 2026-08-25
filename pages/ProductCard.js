// @ts-check

class ProductCard {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    // Header
    this.burgerMenu = page.getByRole('button', { name: 'Open menu' });
    this.brandTitle = page.getByText("TTACart", { exact: true });
    this.cartLink = page.getByRole('link', { name: 'Shopping cart' });
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    // Product details
    this.pageTitle = page.getByText("Product Details", { exact: true });
    this.backButton = page.getByRole("button", { name: "Back" });
    this.productImage = page.locator("svg[viewBox='0 0 120 120']");
    this.productName = page.getByRole("heading");
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    // Cart buttons
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
    this.footerText = page.locator('[data-test="footer-copy"]');
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
