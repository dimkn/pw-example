import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './../../tests',
    reporter: 'dot',
    workers: 2,
    fullyParallel: true,
})
