import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '', textAlign: 'right', marginInline: '20px' }
  const showWhenVisible = { display: visible ? '' : 'none', textAlign: 'right', marginInline: '20px' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}> cancel</button>
        {props.children}
      </div>
    </div>
  )
})

export default Togglable