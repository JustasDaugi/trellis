import { test, expect } from '@playwright/test'
import { asUser } from './utils/api'
import { fakeUser } from './utils/fakeData'

test('user can share a board via email', async ({ page }) => {
  const user = fakeUser()

  await asUser(page, user, async () => {
    const boardId = 4120
    await page.goto(`/board/${boardId}`)
    await expect(page).toHaveURL(new RegExp(`/board/${boardId}$`))

    const menuButton = page
      .locator('button')
      .filter({
        has: page.locator('svg').filter({
          has: page.locator('path[d="M12 6v.01M12 12v.01M12 18v.01"]'),
        }),
      })
      .first()
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    const shareButton = page.getByRole('button', { name: 'Share' })
    await expect(shareButton).toBeVisible()
    await shareButton.click()

    const shareDialog = page.locator('div[class*="rounded-lg"][class*="bg-white"]')
    await expect(shareDialog).toBeVisible()

    const emailInput = shareDialog.locator('input#email-address')
    await expect(emailInput).toBeVisible()
    await emailInput.fill('john.doe@example.com')

    const shareDialogButton = shareDialog.locator('button:has-text("Share")')
    await expect(shareDialogButton).toBeVisible()
    await shareDialogButton.click()

    const successMessage = shareDialog.locator('p:has-text("Message sent successfully")')
    await successMessage.waitFor({ state: 'visible', timeout: 10000 })
  })
})
