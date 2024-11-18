import { Box, TextField } from '@mui/material'
import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'

export const RoleCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
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
            maxLength: {
              value: 100,
              message: 'Max 100 characters',
            },
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
