import { Feather } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

interface HeaderProps {
  title: string
  cardQuantityItems?: number
}

export function Header({ title, cardQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="mx-5 flex-row items-center border-b border-slate-700 pb-5">
      <View className="flex flex-1 flex-col gap-4">
        <Image
          className="h-6 w-32"
          source={require('@/assets/logo.png')}
          alt="Logo app"
        />
        <Text className="font-heading text-xl text-white">{title}</Text>
      </View>
      {cardQuantityItems > 0 && (
        <>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="absolute -right-2 -top-2 z-10 h-4 w-4 items-center justify-center rounded-full bg-lime-300">
              <Text className="text-xs font-bold text-slate-900">
                {cardQuantityItems}
              </Text>
            </View>

            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
