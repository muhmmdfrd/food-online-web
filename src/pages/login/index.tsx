import { useForm } from '@refinedev/react-hook-form'
import * as React from 'react'
import { FormProvider } from 'react-hook-form'
import {
  type BaseRecord,
  type HttpError,
  useApiUrl,
  useLogin,
  useTranslate,
} from '@refinedev/core'
import { ThemedTitleV2 } from '@refinedev/mui'
import {
  boxContainerStyles,
  formContainerStyles,
  layoutStyles,
  pageTitleStyles,
  titleStyles,
} from './_styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AuthRequest } from '../../models/requests/authRequest'

export const Login: React.FC = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const methods = useForm<BaseRecord, HttpError, AuthRequest>()
  const translate = useTranslate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  type LoginRequest = AuthRequest & { url: string }

  const { mutate } = useLogin<LoginRequest>()
  const url = useApiUrl()

  const onSubmit = (request: AuthRequest) => {
    const req: LoginRequest = { ...request, url: `${url}/auth` }

    setLoading(true)
    mutate(req, {
      onSuccess: () => setLoading(false),
      onError: () => {
        setLoading(false)
      },
    })
  }

  const PageTitle = (
    <div style={pageTitleStyles}>
      <ThemedTitleV2
        collapsed={false}
        wrapperStyles={{
          gap: '8px',
        }}
      />
    </div>
  )

  const Content = (
    <Card>
      <CardContent sx={{ p: '32px', '&:last-child': { pb: '32px' } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate('pages.login.title', 'Sign in to your account')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <TextField
            {...register('username', {
              required: translate(
                'pages.login.errors.requiredUsername',
                'Username is required'
              ),
            })}
            id="username"
            margin="normal"
            fullWidth
            autoComplete="off"
            label={translate('pages.login.fields.username', 'Username')}
            error={!!errors.username}
            name="username"
            type="username"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register('password', {
              required: translate(
                'pages.login.errors.requiredPassword',
                'Password is required'
              ),
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate('pages.login.fields.password', 'Password')}
            helperText={errors?.password?.message}
            error={!!errors.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="off"
            sx={{
              mb: 0,
            }}
          />
          <Box
            component="div"
            sx={{
              mt: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          ></Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: '24px' }}
          >
            {translate('pages.login.signin', 'Sign in')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <FormProvider {...methods}>
      <Box component="div" style={layoutStyles}>
        <Container component="main" sx={formContainerStyles}>
          <Box sx={boxContainerStyles}>
            {PageTitle}
            {Content}
          </Box>
        </Container>
      </Box>
    </FormProvider>
  )
}
