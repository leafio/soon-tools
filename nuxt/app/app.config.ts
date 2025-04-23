export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      slots:{
        base:'cursor-pointer'
      },
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    },
    table:{
      slots:{
        th:'whitespace-nowrap'
      }
    }
  },
  icon:{
    provider:'iconify'
  }
})
