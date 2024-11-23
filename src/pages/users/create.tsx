import {
  Autocomplete,
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Create, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { Controller } from 'react-hook-form'
import { RoleResponse } from '../../models/responses/roleResponse'
import { PositionResponse } from '../../models/responses/positionResponse'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'

export const UserCreate: React.FC = () => {
  const [base64, setBase64] = useState<string | undefined>()

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    formState: { errors },
    setError,
  } = useForm({})

  const { autocompleteProps: roleProps } = useAutocomplete<RoleResponse>({
    resource: 'roles',
  })

  const { autocompleteProps: positionProps } =
    useAutocomplete<PositionResponse>({
      resource: 'positions',
    })

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const target = event.target
      const file: File = (target.files as FileList)[0]

      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const base64String = e.target?.result as string
          setValue('file', base64String)
          setBase64(base64String)
        }

        reader.readAsDataURL(file)
      }
    } catch (error) {
      setError('images', { message: 'Upload failed. Please try again.' })
    }
  }

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
        <TextField
          {...register('username', {
            required: 'This field is required',
            maxLength: {
              value: 100,
              message: 'Max 100 characters',
            },
            setValueAs: (value: string) => value.trim(),
          })}
          error={!!(errors as any)?.username}
          helperText={(errors as any)?.username?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={'Username'}
          name="username"
        />
        <TextField
          {...register('email', {
            required: 'This field is required',
            maxLength: {
              value: 100,
              message: 'Max 100 characters',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email',
            },
            setValueAs: (value: string) => value.trim(),
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={'Email'}
          name="email"
        />
        <TextField
          {...register('phoneNumber', {
            required: 'This field is required',
            maxLength: {
              value: 20,
              message: 'Max 20 characters',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Enter a valid phone number',
            },
            setValueAs: (value: string) => value.trim(),
          })}
          error={!!(errors as any)?.phoneNumber}
          helperText={(errors as any)?.phoneNumber?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={'Phone Number'}
          name="phoneNumber"
        />
        <TextField
          {...register('password', {
            required: 'This field is required',
            setValueAs: (value: string) => value.trim(),
          })}
          error={!!(errors as any)?.password}
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
          defaultValue={null as any}
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
                      typeof item == 'object'
                        ? item?.id?.toString()
                        : (item as string)
                    const pId = p?.id?.toString()
                    return itemId == pId
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
                  error={!!(errors as any)?.roleId}
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
          defaultValue={null as any}
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
                      typeof item == 'object'
                        ? item?.id?.toString()
                        : (item as string)
                    const pId = p?.id?.toString()
                    return itemId == pId
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
                  error={!!(errors as any)?.position?.id}
                  helperText={(errors as any)?.position?.id?.message}
                />
              )}
            />
          )}
        />
        <Stack
          direction="row"
          gap={4}
          flexWrap="wrap"
          sx={{ marginTop: '16px' }}
        >
          <label htmlFor="images-input">
            <Input
              id="images-input"
              type="file"
              sx={{ display: 'none' }}
              onChange={onChangeHandler}
            />
            <input id="file" {...register('file')} type="hidden" />
            <Button
              endIcon={<FileUploadIcon />}
              variant="contained"
              component="span"
            >
              Select Picture
            </Button>
            <br />
            {errors.file && (
              <Typography variant="caption" color="#fa541c">
                {errors.file?.message?.toString()}
              </Typography>
            )}
          </label>
          {base64 && (
            <Box
              component="img"
              sx={{
                maxWidth: 250,
                maxHeight: 250,
              }}
              src={base64}
              alt="Post image"
            />
          )}
        </Stack>
      </Box>
    </Create>
  )
}
