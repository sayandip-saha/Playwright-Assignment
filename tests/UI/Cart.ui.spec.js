// @ts-check

import { test, expect } from "@playwright/test";
import CartPage from "../../pages/CartPage.js";

test.describe("Cart Page UI", () => {
  test("Show burger menu", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.brandTitle).toHaveText(/TTACart/);
  });

  test("Show Cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.cartTitle).toBeVisible();
  });

  test("Show Your Cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
  });

  test("Show QTY and Description", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.cartHeader).toContainText("QTY");
    await expect(cartPage.cartHeader).toContainText("Description");
  });

  test("Show Cart Contents or Empty Message", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
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

  test("Show Continue Shopping Button", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.continueShoppingButton).toHaveText(
      "Continue Shopping",
    );
    await expect(cartPage.continueShoppingButton).toHaveClass(/btn-continue/);
  });

  test("Show Checkout Button", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.checkoutButton).toContainText("Checkout");
    await expect(cartPage.checkoutButton).toHaveClass(/btn-primary/);
  });

  test("Show Footer", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.twitterIcon).toBeVisible();
    await expect(cartPage.facebookIcon).toBeVisible();
    await expect(cartPage.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
