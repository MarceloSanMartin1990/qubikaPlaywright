export class CategoryPage {
    constructor(page) {
      this.page = page;
      this.aditionButton = "text=Adicionar";
      this.categoryNameField = "#input-username";
      this.submitButton = '[type="submit"]';
      this.bodyTable = "tbody";
      // I need to dig in a bit to see if I can refine more the next button selector
      // the one that I got so far is awful, i havent seen locators like this in a long time.
      this.nextButton = "li.page-item > a > i:nth-child(2)";
      this.dropdownContainer = "div.ng-select-container";
      this.optionToSelect = "div.ng-option";
      this.checkBox = 'div>label:nth-child(2)';
    }
  }
