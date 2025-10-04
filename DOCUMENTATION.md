## Assumptions

* The application will be run in a modern browser that supports ES6 JavaScript and `localStorage`.
* The user understands common UI elements like forms and tables.
* The currency is intended to be Indian Rupees (₹), as indicated by the UI.
* Data does not need to be accessed across different devices, as `localStorage` is specific to a single browser.

## Design Choices

* **Technology Stack:** I chose to use vanilla HTML, CSS, and JavaScript without any external libraries or frameworks (like React, Vue, or Bootstrap). This was a deliberate choice to demonstrate strong foundational front-end skills.
* **Data Persistence:** I used the browser's `localStorage` to save data. This provides a simple and effective way to persist data without the complexity of setting up a backend server or database, making the project self-contained and easy to run.
* **State Management:** The application state (the list of all expenses) is managed in a single JavaScript array. A central `updateDisplay()` function is used to re-render the entire view whenever the data changes. This is a simple and robust pattern for small-scale applications.

## Sample Inputs and Outputs

### Sample Input 1: Adding an Expense

**Action:** The user enters the following into the form:
* **Amount:** `1250`
* **Date:** `2025-10-04`
* **Category:** `Bills`
* **Note:** `Monthly internet bill`

**Output:**
* A new row appears in the "My Expenses" table with the provided data.
* The "Total Spent" summary at the top updates to include this new amount.
* The data is automatically saved to `localStorage`.

### Sample Input 2: Filtering Expenses

**Action:** The user selects "Food" from the category filter dropdown.

**Output:**
* The table instantly updates to show only the expenses that have the "Food" category.
* The "Total Spent" summary recalculates to show the total for only the visible "Food" expenses.
