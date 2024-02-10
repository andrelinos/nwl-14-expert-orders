import { TextInput, TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'

type Props = TextInputProps

export function Input({ ...rest }: Props) {
  return (
    <TextInput
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="h-32 rounded-md bg-slate-800 p-4 font-body text-sm text-white"
      multiline
      {...rest}
    />
  )
}
