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

    public async shouldHaveLocation(city: string) {
        await expect(async () => {
            await expect(
                this._locationInput,
                'Weather forecast was shown to a different location'
            ).toHaveValue(city)
        }).toPass()
    }

    public async shouldPredictWeather(days: number) {
        await expect(async () => {
            const forecast = await this._forecastedDays.all()

            expect(
                forecast,
                'A forecast should exist for a limited amount of days'
            ).toHaveLength(days)
        }).toPass()
    }
}
