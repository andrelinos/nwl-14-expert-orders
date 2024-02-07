export function formatCurrency(value: number | undefined) {
  try {
    if (value !== undefined) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }
  } catch (error) {
    return ''
  }
}
