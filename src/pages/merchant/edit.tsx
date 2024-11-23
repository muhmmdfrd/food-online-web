import { Autocomplete, Box, TextField } from '@mui/material'
import { Edit, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'

export const MerchantUpdate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm()

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
        <TextField
          {...register('name', {
            required: 'This field is required',
            maxLength: {
              value: 100,
              message: 'Max 100 characters',
            },
            setValueAs: (value: string) => value.trim(),
          })}
          error={!!errors?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={'Name'}
          name="name"
        />
      </Box>
    </Edit>
  )
}
