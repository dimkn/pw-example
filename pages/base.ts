import { Page } from '@playwright/test'

export abstract class BasePage {
    private readonly _page: Page
    private readonly url: string

    constructor(page: Page, url: string) {
        this._page = page
        this.url = url
    }

    get page(): Page {
        return this._page
    }

    async open() {
        await this.page.goto(this.url)
    }
}
