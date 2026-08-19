import { test as base } from '@playwright/test'
import { SearchEnginePage } from '../src/pages/search'
import { ForecastProviderPage } from '../src/pages/forecastProvider'

export const test = base.extend<{
    search: SearchEnginePage
    weather: ForecastProviderPage
}>({
    context: async ({ context }, use) => {
        await context.setGeolocation({
            latitude: 48.8583694,
            longitude: 2.2897187,
        })

        await use(context)
    },
    search: async ({ page }, use) => {
        await use(new SearchEnginePage(page))
    },
    weather: async ({ page }, use) => {
        await use(new ForecastProviderPage(page))
    },
})
