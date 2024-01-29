const { chromium } = require("playwright");
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CategoryPage } from "../pages/category.page";

test("Challenge 2", async () => {
  // Launch a browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const categoryPage = new CategoryPage(page);

  // Step 1: Create a new user.
  // Create a new user data
  const signUpRequest = {
    email: "msanmartin2306@gmail.com",
    password: "string123!",
    roles: ["ROLE_ADMIN"],
  };

  // Make a POST request to the API endpoint to register a new user
  try {
    const response = await axios.post(
      "https://api.club-administration.qa.qubika.com/api/auth/register",
      signUpRequest
    );

  // Log the response from the API
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("Error registering a new user:", error);
  }

  // Step 2: Go to Qubika Sports Club Management System.
  await page.goto("#/auth/login");
  console.log(page.url());

  // Step 3: Validate that the login page is displayed correctly.
  const expectedUrl = "https://club-administration.qa.qubika.com/#/auth/login";
  expect(page.url()).toBe(expectedUrl);

  await page.waitForSelector(loginPage.emailField);
  const element = await loginPage.emailField;
  expect(element).not.toBeNull();

  // Step 4: Log in with the created user.
  await page.fill(loginPage.emailField, signUpRequest.email);
  await page.fill(loginPage.passwordField, signUpRequest.password);
  await page.click(loginPage.submitButton);
  await page.waitForNavigation();

  // Step 5: Validate that the user is logged in.
  const expectedText = "Total de contribuciones";
  const pageTextContent = await page.textContent("body");
  expect(pageTextContent).toContain(expectedText);

  // Step 6a: Go to the Category page
  const linkText = "Tipos de Categorias";
  await page.click(`text=${linkText}`);

  // Step 6b: Create a new category and validate that the category was created successfully
  await page.click(categoryPage.aditionButton);
  const textToType = "The great category 22";
  await page.type(categoryPage.categoryNameField, textToType);
  await page.click(categoryPage.submitButton);

  // Step 6c: Validate category creation
  let found = false;

  // Loop through pages until the element is found
  while (!found) {
    // Check if the target element is present on the current page
    const isElementPresent = await page.evaluate((text) => {
      const elements = Array.from(document.querySelectorAll(text));
      return elements.some((element) => element.textContent.includes(text));
    }, categoryPage.bodyTable);

    if (isElementPresent) {
      console.log("Element found on the current page!");
      found = true;
    } else {
      // Click the "Next Page" button
      // Locate the next button element, then scroll into view
      const nextButton = await page.$(categoryPage.nextButton);

      if (nextButton) {
        // Scroll into view
        await nextButton.scrollIntoView();

        // Click the next button
        await nextButton.click();
      } else {
        console.log("Next page button not found. Exiting loop.");
        break; // Break out of the loop if the "Next Page" button is not found
      }
    }
  }

  // Step 6d: Create a subcategory and validate it is displayed in the Categories list.
  await page.click(categoryPage.aditionButton);
  const textForSub = "The great sub category 23";
  await page.type(categoryPage.categoryNameField, textForSub);
  await page.click(categoryPage.checkBox);
  await page.click(categoryPage.dropdownContainer);
  const optionToSelect = categoryPage.optionToSelect;
  await page.click(`${optionToSelect}:has-text('The great category 22')`);
  await page.click(categoryPage.submitButton);

  // Loop through pages until the element is found
  while (!found) {
    // Check if the target element is present on the current page
    const isElementPresent = await page.evaluate((text) => {
      const elements = Array.from(document.querySelectorAll(text));
      return elements.some((element) => element.textContent.includes(text));
    }, categoryPage.bodyTable);

    if (isElementPresent) {
      console.log("Element found on the current page!");
      found = true;
    } else {
      // Click the "Next Page" button
      // Locate the next button element, then scroll into view
      const nextButton = await page.$(categoryPage.nextButton);

      if (nextButton) {
        // Scroll into view
        await nextButton.scrollIntoView();

        // Click the next button
        await nextButton.click();
      } else {
        console.log("Next page button not found. Exiting loop.");
        break; // Break out of the loop if the "Next Page" button is not found
      }
    }
  }

  // Close the browser
  await browser.close();
});
