// @ts-check

import { test, expect } from "@playwright/test";
import CheckoutCompletePage from "../../pages/CheckoutCompletePage.js";

test.describe("Checkout Complete UI", () => {
  /** @type {CheckoutCompletePage} */
  let checkoutComplete;

  test.beforeEach(async ({ page }) => {
    checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.goto();
  });
  
  test("Show checkout complete header", async () => {
    // Burger menu
    await expect(checkoutComplete.burgerMenu).toBeVisible();
    // Brand title
    await expect(checkoutComplete.brandTitle).toHaveText(/TTACart/);
    // Cart link
    await expect(checkoutComplete.cartLink).toBeVisible();

    // Page title
    await expect(checkoutComplete.pageTitle).toContainText(
      "Checkout: Complete!",
    );
  });

  test("Show order completion details", async () => {
    // Success icon
    await expect(checkoutComplete.successIcon).toBeVisible();
    // Confirmation message
    await expect(checkoutComplete.completeHeader).toContainText(
      "Thank you for your order!",
    );
    // Order dispatch message
    await expect(checkoutComplete.completeText).toContainText(
      "Your order has been dispatched",
    );
  });

  test("Show Back Home button", async () => {
    await expect(checkoutComplete.backToProductsButton).toContainText(
      "Back Home",
    );
  });

  test("Show Footer", async () => {
    // Footer
    await expect(checkoutComplete.footer).toBeVisible();
    // Footer icons
    await expect(checkoutComplete.twitterIcon).toBeVisible();
    await expect(checkoutComplete.facebookIcon).toBeVisible();
    await expect(checkoutComplete.linkedinIcon).toBeVisible();

    // Footer text
    await expect(checkoutComplete.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
