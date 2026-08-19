import { Locator, Page } from '@playwright/test'
import { BasePage } from './base'

export class BrowserPage extends BasePage {
    private readonly requestInputField: Locator
    private searchResults: Locator[] = new Array<Locator>()

    constructor(page: Page) {
        // Could've used configuration instead of hard-coding, but this page object works with a specific locators,
        // that defeats the whole idea of parametrization at this point.
        super(page, 'https://duckduckgo.com/')

        this.requestInputField = this.page.locator(
            "//input[@id='search_form_input']"
        )
    }

    public async searchFor(query: string) {
        await this.requestInputField.fill(query)

        this.searchResults = await this.page
            .locator("//article[@data-testid='result']/div[2]//div/a")
            .all()
    }

    public async navigateToFirstResult() {
        await this.searchResults[0].click()
    }

    public async shouldHaveSearchResults() {
        // TODO Implement
    }
}
