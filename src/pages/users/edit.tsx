import { Autocomplete, Box, TextField } from '@mui/material'
import { Edit, useAutocomplete } from '@refinedev/mui'
import { Controller } from 'react-hook-form'
import { RoleResponse } from '../../models/responses/roleResponse'
import { PositionResponse } from '../../models/responses/positionResponse'
import { useForm } from '@refinedev/react-hook-form'

export const UserUpdate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm()

  const { autocompleteProps: roleProps } = useAutocomplete<RoleResponse>({
    resource: 'roles',
  })

  const { autocompleteProps: positionProps } =
    useAutocomplete<PositionResponse>({
      resource: 'positions',
    })

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
        <TextField
          {...register('username', {
            required: 'This field is required',
          })}
          error={!!errors?.username}
          helperText={(errors as any)?.username?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={'Username'}
          name="username"
        />
        <TextField
          {...register('password')}
          error={!!errors?.password}
          helperText={(errors as any)?.password?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={'Password'}
          type="password"
          placeholder="●●●●●●●●"
        />
        <Controller
          control={control}
          name={'roleId'}
          rules={{ required: 'This field is required' }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...roleProps}
              {...field}
              onChange={(_, value) => {
                if (value) {
                  field.onChange(value.id)
                }
              }}
              getOptionLabel={(item) => {
                return (
                  roleProps?.options?.find((p) => {
                    const itemId =
                      typeof item === 'object'
                        ? item?.id?.toString()
                        : (item as string)
                    const pId = p?.id?.toString()
                    return itemId === pId
                  })?.name ?? ''
                )
              }}
              isOptionEqualToValue={(option, value) => {
                return option.id.toString() == value.toString()
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={'Role'}
                  margin="normal"
                  variant="outlined"
                  error={!!errors?.roleId}
                  helperText={(errors as any)?.roleId?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={'positionId'}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...positionProps}
              {...field}
              onChange={(_, value) => {
                if (value) {
                  field.onChange(value.id)
                }
              }}
              getOptionLabel={(item) => {
                return (
                  positionProps?.options?.find((p) => {
                    const itemId =
                      typeof item === 'object'
                        ? item?.id?.toString()
                        : (item as string)
                    const pId = p?.id?.toString()
                    return itemId === pId
                  })?.name ?? ''
                )
              }}
              isOptionEqualToValue={(option, value) => {
                return option.id.toString() == value.toString()
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={'Position'}
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          )}
        />
      </Box>
    </Edit>
  )
}
