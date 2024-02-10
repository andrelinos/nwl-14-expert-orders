import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'

export default function Cart() {
  const cartStore = useCartStore()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />
      <KeyboardAvoidingView>
        <View className="flex-1">
          {cartStore && cartStore?.products?.length > 0 ? (
            <View className="flex-1">
              <View className="mx-5 my-4 flex-row justify-between border-b border-b-slate-700 pb-1 pt-4">
                <Text className="font-subtitle text-slate-400">Descrição</Text>
                <Text className="font-subtitle text-slate-400">Qtd.</Text>
              </View>
              <ScrollView>
                <View className="flex-1 px-5">
                  <View className="flex-1">
                    {cartStore.products.map((product) => (
                      <Product key={product.id} data={product} />
                    ))}
                  </View>
                  <View className="mb-4 mt-8 flex-row items-center gap-2">
                    <Text className="font-subtitle text-xl text-white">
                      Total:
                    </Text>
                    <Text className="font-heading text-2xl text-lime-400">
                      {total}
                    </Text>
                  </View>
                  <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." />
                </View>
              </ScrollView>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="my-8 text-center font-body text-slate-400">
                Seu Carrinho está vazio
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      {/* <View className="mt-auto gap-5 p-5 pb-8">
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View> */}
    </View>
  )
}
