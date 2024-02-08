import { Feather } from '@expo/vector-icons'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Image, ScrollView, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/stores/cart-store'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'

export default function Product() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
    }
    navigation.goBack()
  }

  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1">
      <Image
        source={product?.cover}
        alt={product?.title}
        className="h-64 w-full"
        resizeMode="cover"
      />
      <View className="flex-row justify-between">
        <View className="flex-col p-4">
          <Text className="font-heading text-xl text-white">
            {product.title}
          </Text>
          <View className="flex-row items-center gap-1 ">
            <Text className="text-yellow-300 opacity-60">
              <Feather name="star" size={12} />
            </Text>
            <Text className="text-xs font-thin text-slate-200">
              4.5 (220 avaliações)
            </Text>
          </View>
        </View>
        <Button className="mr-6 mt-6 h-8 w-8 bg-transparent  opacity-50">
          <Feather name="heart" size={32} className="text-red-400" />
        </Button>
      </View>
      <View className="flex-1 p-5">
        <Text className="my-2 font-heading text-2xl text-lime-400">
          {formatCurrency(product?.price)}
        </Text>

        <Text className="pb-6 font-body text-base leading-6 text-slate-400">
          {product?.description}
        </Text>

        <ScrollView className="flex-1">
          {product?.ingredients.map((ingredient, index) => (
            <Text
              key={ingredient + index}
              className="font-body text-base leading-6 text-slate-400"
            >
              {'\u2022'} {ingredient}
            </Text>
          ))}
        </ScrollView>
      </View>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
