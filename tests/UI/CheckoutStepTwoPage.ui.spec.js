// @ts-check

import { test, expect } from "@playwright/test";
import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";

test.describe("Checkout Step Two UI", () => {
  test("Show burger menu", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.brandTitle).toHaveText(/TTACart/);
  });

  test("Show Checkout Title", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.pageTitle).toContainText("Checkout: Overview");
  });

  test("Show Your Cart", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.cartLink).toBeVisible();
  });

  test("Show QTY and Description", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.cartHeader).toContainText("QTY");
    await expect(checkoutPage.cartHeader).toContainText("Description");
  });

  test("Show Product Summary", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.summaryBlock).toContainText(
      "Payment Information:",
    );
    await expect(checkoutPage.summaryBlock).toContainText(
      "Shipping Information:",
    );
    await expect(checkoutPage.summaryBlock).toContainText("Price Total");
    await expect(checkoutPage.summaryBlock).toContainText("Total:");
  });

  test("Show Cancel Button", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.cancelButton).toContainText("Cancel");
  });

  test("Show Finish Button", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.finishButton).toContainText("Finish");
  });

  test("Show Footer", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.twitterIcon).toBeVisible();
    await expect(checkoutPage.facebookIcon).toBeVisible();
    await expect(checkoutPage.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
