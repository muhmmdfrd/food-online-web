import { Autocomplete, Box, TextField } from '@mui/material'
import { Create, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'

export const MerchantCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({})

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
        <TextField
          {...register('name', {
            required: 'This field is required',
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
    </Create>
  )
}
