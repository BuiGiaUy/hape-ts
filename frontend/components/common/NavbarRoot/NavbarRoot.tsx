import React, { FC } from 'react'
interface Props {
    children?: any
}
const NavbarRoot :FC<Props> = ({ children }) => {
    const [ hasScrolled, setHasScrolled] = React.useState(false)
    const staticNavbar = true
    React.useEffect(() => {
        const handleScroll = throttle(() => {
            
        })
    })
    return (
    <div>NavbarRoot</div>
  )
}

export default NavbarRoot