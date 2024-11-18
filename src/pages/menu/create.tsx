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
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { MerchantResponse } from '../../models/responses/merchantResponse'
import { useState } from 'react'

export const MenuCreate: React.FC = () => {
  const [base64, setBase64] = useState<string | undefined>()

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    setValue,
    formState: { errors },
    setError,
    getValues,
  } = useForm({})

  const { autocompleteProps: merchantProps } =
    useAutocomplete<MerchantResponse>({
      resource: 'merchants',
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
        <Controller
          control={control}
          name={'merchantId'}
          rules={{ required: 'This field is required' }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...merchantProps}
              {...field}
              onChange={(_, value) => {
                if (value) {
                  field.onChange(value.id)
                }
              }}
              getOptionLabel={(item) => {
                return (
                  merchantProps?.options?.find((p) => {
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
                  label={'Merchant'}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.merchantId}
                  helperText={(errors as any)?.merchantId?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register('price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Min Rp1',
            },
            max: {
              value: 10000000,
              message: 'Max Rp10.000.000',
            },
          })}
          error={!!errors?.price}
          helperText={(errors as any)?.price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={'Price'}
          name="price"
        />
        <TextField
          {...register('description', {
            maxLength: {
              value: 1000,
              message: 'Max 1000 characters',
            },
          })}
          error={!!errors?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={'Description'}
          name="description"
          rows={2}
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
