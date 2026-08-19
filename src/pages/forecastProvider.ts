import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base'

export class ForecastProviderPage extends BasePage {
    private readonly _locationInput: Locator
    private _forecastedDays: Locator

    constructor(page: Page) {
        super(page, 'https://www.windy.com')

        this._locationInput = this.page.locator("//input[@id='q']")
        this._forecastedDays = this.page.locator(
            "//span[contains(@class, 'temperatures')]"
        )
    }

    /**
     * The page we're loading is quite heavy with a lot of dynamic content,
     * thus override the standard nice implementation with a dirty trick
     */
    public override async open() {
        await this.page.goto(this._url, {
            waitUntil: 'networkidle',
            timeout: 10_000,
        })
    }

    public async shouldHaveLocation(city: string) {
        await expect(
            this._locationInput,
            'Weather forecast was shown to a different location'
        ).toHaveValue(city)
    }

    public async shouldPredictWeather(days: number) {
        const forecast = await this._forecastedDays.all()

        expect(
            forecast,
            'A forecast should exist for a limited amount of days'
        ).toHaveLength(days)
    }
}
