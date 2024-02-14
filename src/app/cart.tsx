import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'

const PHONE_NUMBER = 'PHONE_NUMBER'

export default function Cart() {
  const [address, setAddress] = useState('')
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Desejar remover ${product.title} do carrinho?`, [
      {
        text: 'Canelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega.')
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity}x ${product.title}`)
      .join('')

    const message = `
    🍔 NOVO PEDIDO
    \n *Entregar em*: ${address}

    ${products}

    \n *Valor total*: ${total}
    `

    console.log(message)

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <>
                <View className="border-b border-slate-700">
                  <View className="my-4 flex-row justify-between border-b border-b-slate-700 pb-1 pt-4">
                    <Text className="font-subtitle text-slate-400">
                      Descrição
                    </Text>
                    <Text className="font-subtitle text-slate-400">Qtd.</Text>
                  </View>
                  {cartStore.products.map((product) => (
                    <Product
                      key={product.id}
                      data={product}
                      onPress={() => handleProductRemove(product)}
                    />
                  ))}
                </View>
                <View className="mb-4 flex-row items-center gap-2 pt-5">
                  <Text className="font-subtitle text-xl text-white">
                    Total:
                  </Text>
                  <Text className="font-heading text-2xl text-lime-400">
                    {total}
                  </Text>
                </View>

                <Input
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                  onChangeText={setAddress}
                  blurOnSubmit={true}
                  onSubmitEditing={handleOrder}
                  returnKeyType="next"
                />
              </>
            ) : (
              <Text className="my-8 text-center font-body text-slate-400">
                Seu carrinho está vazio.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5">
        {cartStore.products.length > 0 && (
          <Button onPress={handleOrder}>
            <Button.Text>Enviar pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
        )}
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
