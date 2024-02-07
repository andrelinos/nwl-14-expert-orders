import clsx from 'clsx'
import { Pressable, PressableProps, Text } from 'react-native'

interface CategoryProps extends PressableProps {
  title: string
  isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        'h-10 justify-center rounded-md border-2 border-transparent bg-slate-800 px-4',
        isSelected && 'border-lime-300',
      )}
      {...rest}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
