import { Page, expect } from '@playwright/test'

export abstract class BasePage {
    private readonly _page: Page
    protected readonly _url: string

    constructor(page: Page, url: string) {
        this._page = page
        this._url = url
    }

    get page(): Page {
        return this._page
    }

    async open() {
        await this.page.goto(this._url, { timeout: 5000 })
    }

    async shouldBeOpen() {
        expect(
            this.page,
            `A page with different url was opened instead: ${this.page.url()}`
        ).toHaveURL(this._url)
    }
}
