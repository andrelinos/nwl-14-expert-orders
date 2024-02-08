import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

export default function Home() {
  const cartStore = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  function handleCategorySelect(item: string) {
    setSelectedCategory(item)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Cardápio" cardQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handleCategorySelect(item)}
            isSelected={item === selectedCategory}
          />
        )}
        className="my-5 max-h-10"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        horizontal
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mb-3 mt-8 font-heading text-xl text-white">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
