import { test, expect } from "@playwright/test";

test.describe("Checkout flow", () => {
  test("should complete checkout process successfully", async ({ page }) => {
    // Navigate to products page and add items to cart
    await page.goto("/products");

    const firstProduct = page.getByTestId("product-card").first();
    const addToCartButton = firstProduct.getByRole("button", { name: "Add to cart" });
    await addToCartButton.click();

    await expect(
      page.getByText("Product added to cart"),
      "Should show success message when product is added to cart"
    ).toBeVisible();

    // Open cart and go to checkout
    await page.getByTestId("cart-button").click();
    await page.getByText("Checkout").click();

    await expect(page, "Should navigate to checkout page").toHaveURL("/checkout");
    await expect(page.getByText("Checkout").first(), "Checkout page title should be visible").toBeVisible();

    // Fill shipping form
    await page
      .locator("div")
      .filter({ hasText: /^Full Name$/ })
      .getByRole("textbox")
      .fill("John Doe");

    await page
      .locator("div")
      .filter({ hasText: /^Email$/ })
      .getByRole("textbox")
      .fill("john@example.com");

    await page
      .locator("div")
      .filter({ hasText: /^Address$/ })
      .getByRole("textbox")
      .fill("123 Main St");

    await page
      .locator("div")
      .filter({ hasText: /^City$/ })
      .getByRole("textbox")
      .fill("New York");

    await page
      .locator("div")
      .filter({ hasText: /^Postal Code$/ })
      .getByRole("textbox")
      .fill("10001");

    // Fill payment form
    await page
      .locator("div")
      .filter({ hasText: /^Card Number$/ })
      .getByRole("textbox")
      .fill("4242424242424242");
    await page
      .locator("div")
      .filter({ hasText: /^Expiry Date$/ })
      .getByRole("textbox")
      .fill("12/25");
    await page.locator("div").filter({ hasText: /^CVV$/ }).getByRole("textbox").fill("123");

    // Submit order
    await page.getByRole("button", { name: /Place Order/ }).click();

    // Verify success page
    await expect(page, "Should navigate to success page").toHaveURL("/success");
    await expect(page.getByText("Order Successful!"), "Success message should be visible").toBeVisible();
    await expect(page.getByText("Thank you for your purchase"), "Thank you message should be visible").toBeVisible();
  });
});
