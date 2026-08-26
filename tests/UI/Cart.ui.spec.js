// @ts-check

import { test, expect } from "@playwright/test";
import CartPage from "../../pages/CartPage.js";

test.describe("Cart Page UI", () => {
  /** @type {CartPage} */
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
  });

  test("Show cart page header", async () => {
    // Burger menu
    await expect(cartPage.burgerMenu).toBeVisible();
    // Brand title
    await expect(cartPage.brandTitle).toHaveText(/TTACart/);
    // Cart icon/title
    await expect(cartPage.cartTitle).toBeVisible();
    // Page title
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
    // Cart headers
    await expect(cartPage.cartHeader).toContainText("QTY");
    await expect(cartPage.cartHeader).toContainText("Description");
  });

  test("Show Cart Contents or Empty Message", async () => {
    const hasItems = await cartPage.cartItems.first().isVisible();
    if (hasItems) {
      await expect(cartPage.cartItems.first()).toBeVisible();
      await expect(cartPage.quantity.first()).toBeVisible();
      await expect(cartPage.cartProductNames.first()).toContainText(
        "Test.allTheThings() T-Shirt (Red)",
      );
      await expect(cartPage.cartPrices.first()).toBeVisible();
      await expect(cartPage.removeButtons.first()).toBeVisible();
    } else {
      await expect(cartPage.emptyCartMessage).toBeVisible();
      await expect(cartPage.emptyCartMessage).toHaveText("Your cart is empty.");
    }
  });

  test("Show Cart action buttons", async () => {
    // Continue Shopping
    await expect(cartPage.continueShoppingButton).toHaveText(
      "Continue Shopping",
    );
    await expect(cartPage.continueShoppingButton).toHaveClass(/btn-continue/);
    // Checkout
    await expect(cartPage.checkoutButton).toContainText("Checkout");
    await expect(cartPage.checkoutButton).toHaveClass(/btn-primary/);
  });

  test("Show Footer", async () => {
    // Footer
    await expect(cartPage.footer).toBeVisible();
    // Footer icons
    await expect(cartPage.twitterIcon).toBeVisible();
    await expect(cartPage.facebookIcon).toBeVisible();
    await expect(cartPage.linkedinIcon).toBeVisible();

    // Footer text
    await expect(cartPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
