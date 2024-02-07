import { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}
