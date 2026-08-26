// @ts-check

import { test, expect } from "@playwright/test";

import ProductCard from "../../pages/ProductCard.js";

test.describe("Product Details Page UI", () => {
  /** @type {ProductCard} */
  let productCard;
  test.beforeEach(async ({ page }) => {
    productCard = new ProductCard(page);

    await productCard.goto();
  });

  test("Show product details page header", async () => {
    // Burger menu
    await expect(productCard.burgerMenu).toBeVisible();
    // Brand title
    await expect(productCard.brandTitle).toHaveText(/TTACart/);
    // Cart link
    await expect(productCard.cartLink).toBeVisible();

    // Page title
    await expect(productCard.pageTitle).toHaveText("Product Details");
    // Back button
    await expect(productCard.backButton).toBeVisible();
  });

  test("Show product details", async () => {
    // Product image
    await expect(productCard.productImage).toBeVisible();
    // Product title
    await expect(productCard.productName).toBeVisible();

    // Product description
    await expect(productCard.productDescription).toBeVisible();

    // Product price
    await expect(productCard.productPrice).toBeVisible();
  });

  test("Show Add to Cart or Remove button", async () => {
    const isAddToCartVisible = await productCard.addToCartButton.isVisible();
    if (isAddToCartVisible) {
      await expect(productCard.addToCartButton).toContainText("Add to cart");
    } else {
      await expect(productCard.removeButton).toBeVisible();
      await expect(productCard.removeButton).toContainText("Remove");
    }
  });

  test("Show Footer", async () => {
    // Footer
    await expect(productCard.footer).toBeVisible();
    // Footer icons
    await expect(productCard.twitterIcon).toBeVisible();
    await expect(productCard.facebookIcon).toBeVisible();
    await expect(productCard.linkedinIcon).toBeVisible();
    // Footer text
    await expect(productCard.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
