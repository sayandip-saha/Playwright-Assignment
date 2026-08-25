// @ts-check

class CartPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    // Header
    this.burgerMenu = page.locator(
      "//button[@id='react-burger-menu-btn']//*[name()='svg']",
    );
    this.brandTitle = page.getByText("TTACart", { exact: true });
    this.cartTitle = page.getByText("Your Cart", { exact: true });
    // Page
    this.pageTitle = page.getByText("Your Cart", { exact: true });
    // Cart
    this.cartHeader = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.emptyCartMessage = page.getByText("Your cart is empty.", {
      exact: true,
    });
    this.quantity = page.locator("div.qty");
    this.cartProductNames = page.locator(".inventory-item-name");
    this.cartPrices = page.locator('[data-test="inventory-item-price"]');
    this.removeButtons = page.getByRole("button", { name: "Remove" });

    // Navigation buttons
    this.continueShoppingButton = page.getByRole("link", {
      name: "Continue Shopping",
    });
    this.checkoutButton = page.getByRole("link", { name: /Checkout/i });

    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
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
