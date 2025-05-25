import { test, expect } from "@playwright/test";

test.describe("Products page", () => {
  test("should display products by category", async ({ page }) => {
    await page.goto("/products/beauty");

    await expect(
      page.getByRole("navigation", { name: "breadcrumb" }),
      "Breadcrumb navigation should be visible"
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Featured Categories" }),
      "Featured Categories link should be visible"
    ).toBeVisible();
    await expect(page.getByText("Beauty").first(), "Current category should be visible").toBeVisible();

    const products = page.getByTestId("product-card").first();

    await expect(products.first(), "Product card should have Add to cart button").toContainText("Add to cart");
    await expect(products.first().getByRole("img"), "Product image should be visible").toBeVisible();
    await expect(products.first().getByRole("heading"), "Product title should be visible").toBeVisible();
    await expect(products.first().getByText("$"), "Product price should be visible").toBeVisible();
  });

  test("should add product to cart", async ({ page }) => {
    await page.goto("/products/beauty");

    const firstProduct = page.getByTestId("product-card").first();
    const productName = await firstProduct.getByRole("heading").textContent();
    const addToCartButton = firstProduct.getByRole("button", { name: "Add to cart" });

    await addToCartButton.click();

    await expect(
      page.getByText("Product added to cart"),
      "Should show success message when product is added to cart"
    ).toBeVisible();

    await expect(page.getByTestId("cart-button"), "Cart button should be visible").toBeVisible();

    await page.getByTestId("cart-button").click();

    await expect(page.getByText("Shopping Cart").first(), "Cart page should be visible").toBeVisible();

    await expect(page.getByText("Checkout"), "Checkout button should be visible").toBeVisible();

    await expect(
      page.getByLabel("Shopping Cart").getByText(productName!),
      "Product name should be visible"
    ).toBeVisible();
    await expect(page.getByTestId("cart-item").getByText("$"), "Product price should be visible").toBeVisible();
  });

  test("should navigate between categories", async ({ page }) => {
    await page.goto("/products/beauty");

    await expect(
      page.getByRole("button", { name: "Toggle navigation menu" }),
      "Navigation menu should be visible"
    ).toBeVisible();

    await page.getByRole("button", { name: "Toggle navigation menu" }).click();

    await expect(page.getByRole("link", { name: "Laptops" }), "Laptops link should be visible").toBeVisible();
    await page.getByRole("link", { name: "Laptops" }).click();

    await expect(page, "Should navigate to laptops page").toHaveURL("/products/laptops");

    await expect(page.getByRole("link", { name: "Laptops" }), "Laptops page should be visible").toBeVisible();
  });
});
