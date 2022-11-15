import cn from 'classnames'
import React, { FC } from 'react'

type Props = {
    className?: string
    children?: any
    el?: HTMLElement
    clean?: boolean
}

const Container: FC<Props> = ({className, children, el= 'div', clean}) => {
    const rootClassName = cn(className, {
        'mx-auto max-w-7xl': !clean,
    })
    let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> = el as any
  return (
    <Component className={rootClassName}>{children}</Component>
  )
}

export default Container