// @ts-check

import { test, expect } from "@playwright/test";
import ProductCard from "../../pages/ProductCard.js";

test.describe("Product Details Page UI", () => {
  test("Show burger menu", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.brandTitle).toHaveText(/TTACart/);
  });

  test("Show Cart", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.cartLink).toBeVisible();
  });

  test("Show Product Details", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.pageTitle).toHaveText("Product Details");
  });

  test("Show Back Button", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.backButton).toBeVisible();
  });

  test("Show Product Image", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.productImage).toBeVisible();
  });

  test("Show Product Title", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.productName).toBeVisible();
  });

  test("Show Product Description", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.productDescription).toBeVisible();
  });

  test("Show Product Price", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.productPrice).toBeVisible();
  });

  test("Show Add to Cart or Remove Button", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    const isAddToCartVisible = await productCard.addToCartButton.isVisible();

    if (isAddToCartVisible) {
      await expect(productCard.addToCartButton).toContainText("Add to cart");
    } else {
      await expect(productCard.removeButton).toBeVisible();
      await expect(productCard.removeButton).toContainText("Remove");
    }
  });

  test("Show Footer", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.twitterIcon).toBeVisible();
    await expect(productCard.facebookIcon).toBeVisible();
    await expect(productCard.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const productCard = new ProductCard(page);
    await productCard.goto();
    await expect(productCard.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
