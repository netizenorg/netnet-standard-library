class Bind {
  /*
     -- -- -- -- -- -- DATA BINDING METHODS -- -- -- -- --
  */
  static bindCSS () {
    // SETUP DATA-BIND-VAR
    // --------------------
    const elements = document.querySelectorAll('[data-bind-var]')
    elements.forEach(element => {
      const cssVarName = element.getAttribute('data-bind-var')

      // Retrieve and parse the current value of the CSS variable
      const initialStyle = window.getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim()
      const unitMatch = initialStyle.match(/[a-z%]+$/i)
      const initialUnit = unitMatch ? unitMatch[0] : ''

      const valueMatch = initialStyle.match(/^-?\d+(\.\d+)?/)
      const initialValue = valueMatch ? valueMatch[0] : ''

      // Initialize the element's value if a numeric value is present
      if (initialValue !== '') {
        element.value = initialValue
      }

      const updateCSSVar = () => {
        let value = element.value.trim()

        // Handle numeric and non-numeric values
        if (initialUnit) {
          if (!isNaN(value) && value !== '') {
            value = parseFloat(value) + ''
            value += initialUnit
          }
          // Non-numeric values are assumed to be valid CSS values provided by the user
        }

        // Update the CSS variable if the value is valid
        if (value !== '') {
          document.documentElement.style.setProperty(cssVarName, value)
        }
      }

      // Attach event listeners for real-time updates
      element.addEventListener('input', updateCSSVar)
      element.addEventListener('change', updateCSSVar)
    })

    // SETUP BIND-DATA-CLICK
    // ---------------------
    const buttons = document.querySelectorAll('[data-bind-click]')
    buttons.forEach(button => {
      const bindClickAttr = button.getAttribute('data-bind-click')
      if (!bindClickAttr) {
        console.error('Missing data-bind-click attribute on button:', button)
        return
      }

      const [cssVarName, action] = bindClickAttr.split(':')
      if (!action) {
        console.error('Invalid data-bind-click format on button:', button)
        return
      }

      // Parse the action to extract operation and arguments
      const actionMatch = action.match(/(\w+)\(([^)]+)\)/)
      if (!actionMatch) {
        console.error('Invalid action format in data-bind-click:', action)
        return
      }

      const [, op, args] = actionMatch
      const values = args.split(',').map(val => val.trim())

      const updateCSSVar = () => {
        const currentStyle = window.getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim()
        let newValue

        const operation = op.toLowerCase()

        if (operation === 'add' || operation === 'sub') {
          // Extract unit and numeric value
          const unitMatch = currentStyle.match(/[a-z%]+$/i)
          const unit = unitMatch ? unitMatch[0] : ''

          const valueMatch = currentStyle.match(/^-?\d+(\.\d+)?/)
          const currentValue = valueMatch ? parseFloat(valueMatch[0]) : NaN

          const modifier = parseFloat(values[0])

          if (isNaN(currentValue) || isNaN(modifier)) {
            console.error(`Invalid numeric values for operation '${op}' on CSS variable '${cssVarName}'.`)
            return
          }

          if (operation === 'add') {
            newValue = (currentValue + modifier) + unit
          } else { // 'sub'
            newValue = (currentValue - modifier) + unit
          }
        } else if (operation === 'toggle') {
          if (values.length < 2) {
            console.error(`Toggle operation requires at least two values. Provided: ${values.length}`)
            return
          }

          const normalizedCurrent = currentStyle.toLowerCase()
          const normalizedValues = values.map(val => val.toLowerCase())

          const currentIndex = normalizedValues.indexOf(normalizedCurrent)

          if (currentIndex === 0) {
            newValue = values[1]
          } else {
            newValue = values[0]
          }
        } else if (operation === 'cycle') {
          if (values.length === 0) {
            console.error('Cycle operation requires at least one value.')
            return
          }

          const currentIndex = values.findIndex(val => val === currentStyle)
          const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % values.length
          newValue = values[nextIndex]
        } else {
          console.error(`Unsupported operation in data-bind-click: ${op}`)
          return
        }

        // Update the CSS variable with the new value
        document.documentElement.style.setProperty(cssVarName, newValue)
      }

      // Attach click event listener
      button.addEventListener('click', updateCSSVar)
    })
  }
}

if (typeof module !== 'undefined') module.exports = Bind
else window.Bind = Bind
