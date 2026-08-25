// @ts-check

import { test, expect } from "@playwright/test";
import CheckoutCompletePage from "../../pages/CheckoutCompletePage.js";

test.describe("Checkout Complete UI", () => {
  test("Show burger menu", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.brandTitle).toHaveText(/TTACart/);
  });

  test("Show Your Cart", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.cartLink).toBeVisible();
  });

  test("Show Checkout Complete Title", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.pageTitle).toContainText(
      "Checkout: Complete!",
    );
  });

  test("Show Product Summary", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.successIcon).toBeVisible();
    await expect(checkoutComplete.completeHeader).toContainText(
      "Thank you for your order!",
    );
    await expect(checkoutComplete.completeText).toContainText(
      "Your order has been dispatched",
    );
  });

  test("Show Back to Home Button", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.backToProductsButton).toContainText(
      "Back Home",
    );
  });

  test("Show Footer", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.twitterIcon).toBeVisible();
    await expect(checkoutComplete.facebookIcon).toBeVisible();
    await expect(checkoutComplete.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
    await expect(checkoutComplete.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
