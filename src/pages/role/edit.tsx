import { Autocomplete, Box, TextField } from '@mui/material'
import { Edit, useAutocomplete } from '@refinedev/mui'
import { Controller } from 'react-hook-form'
import { RoleResponse } from '../../models/responses/roleResponse'
import { PositionResponse } from '../../models/responses/positionResponse'
import { useForm } from '@refinedev/react-hook-form'

export const RoleUpdate: React.FC = () => {
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
