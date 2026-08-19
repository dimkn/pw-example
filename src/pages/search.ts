import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './base'

export class SearchEnginePage extends BasePage {
    private readonly _requestInputField: Locator
    private readonly _searchResults: Locator

    constructor(page: Page) {
        // Could've used a proper configuration instead of hard-coding,
        // but this page object works with a specific locators, which defeats the
        // whole idea of relying on a flexible configuration at this point.
        super(page, 'https://search.brave.com')

        this._requestInputField = this.page.locator(
            "//textarea[@id='searchbox']"
        )
        this._searchResults = this.page.locator(
            "//article[@data-testid='result']/div[2]//div/a"
        )
    }

    public async searchFor(query: string) {
        await this._requestInputField.fill(query)
        await this._requestInputField.press('Enter')
    }

    public async navigateToFirstResult() {
        const results = await this._searchResults.all()

        await results.at(0)?.click()
    }

    public async shouldHaveSearchResults(amount: number) {
        const results = await this._searchResults.all()

        expect(
            results,
            `Search with the given user input resulted with ${amount} links`
        ).toHaveLength(amount)
    }

    /**
     * Asserts how many found results are related to the original requst (for the sake of a mere
     * demonstration we only check if the searched name is presented in the result url)
     *
     * @param original Search request made by the user
     * @param amount   Minimum amount of results that we expect to see
     */
    public async shouldHaveRelatedResults(original: string, amount: number) {
        const results = await this._searchResults.all()

        let count = 0

        results?.forEach(async (result) => {
            const url = await result.getAttribute('href')
            if (url?.includes(original)) count++
        })

        expect(
            count,
            `Only ${count} related results were found for the following request: ${original}`
        ).toBeGreaterThanOrEqual(amount)
    }
}
