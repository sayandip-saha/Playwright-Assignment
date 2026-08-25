// @ts-check

class CheckoutStepTwoPage {
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
    this.cartLink = page.locator(
      "//a[@id='shopping_cart_container']//*[name()='svg']",
    );
    // Page
    this.pageTitle = page.getByText("Checkout: Overview", { exact: true });
    // Cart / Order summary
    this.cartHeader = page.locator('[data-test="cart-list"]');
    this.summaryBlock = page.locator("div.summary-block");
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    // Buttons
    this.cancelButton = page.getByRole("link", { name: "Cancel" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    // Footer
    this.footer = page.locator('[data-test="footer"]');
    this.twitterIcon = page.getByRole("link", { name: "Twitter" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.linkedinIcon = page.getByRole("link", { name: "LinkedIn" });
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
