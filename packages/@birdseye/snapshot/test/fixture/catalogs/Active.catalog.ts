import { catalogFor } from '@birdseye/vue'
import Active from '../components/Active.vue'

export default catalogFor(Active, 'Active').add('active', {
  plugins: {
    snapshot: {
      capture: async (page, capture) => {
        await capture()

        const rect = document.querySelector('button')!.getBoundingClientRect()
        const pos = {
          x: window.scrollX + rect.left,
          y: window.scrollY + rect.top,
        }

        // Mouse
        await page.mouse.move(pos.x, pos.y)
        await page.mouse.down()
        await capture()
        await page.mouse.up()

        // Keyboard
        await page.focus('input')
        await page.keyboard.down('x')
        await page.keyboard.down('y')
        await page.keyboard.down('z')
        await capture()
        await page.keyboard.up('z')
      },
    },
  },
})
