import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './../../tests',
    reporter: 'dot',
    use: {
        browserName: 'chromium',
        screenshot: 'only-on-failure',
    },
})
