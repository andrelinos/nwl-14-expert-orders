import { useLocalSearchParams } from 'expo-router'
import { Image, Text, View } from 'react-native'

import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'

export default function Product() {
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)

  return (
    <View className="flex-1">
      <Image
        source={product?.cover}
        alt={product?.title}
        className="h-64 w-full"
        resizeMode="cover"
      />
      <View className="mt-8 flex-1 p-5">
        <Text className="my-2 font-heading text-2xl text-lime-400">
          {formatCurrency(product?.price)}
        </Text>

        <Text className="pb-6 font-body text-base leading-6 text-slate-400">
          {product?.description}
        </Text>

        {product?.ingredients.map((ingredient, index) => (
          <Text
            key={ingredient + index}
            className="font-body text-base leading-6 text-slate-400"
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>
    </View>
  )
}
