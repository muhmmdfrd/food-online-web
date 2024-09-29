import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from '@refinedev/mui'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { authProvider } from './authProvider'
import { Header } from './components/header'
import { ColorModeContextProvider } from './contexts/color-mode'
import { Login } from './pages/login'
import { UserCreate, UserList, UserUpdate } from './pages/users'
import { dataProvider } from './dataProvider'
import { constants } from './constants'
import { MerchantCreate, MerchantList, MerchantUpdate } from './pages/merchant'
import { PositionCreate, PositionList, PositionUpdate } from './pages/position'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  default: dataProvider(constants.url),
                }}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'users',
                    list: '/users',
                    create: '/users/create',
                    edit: '/users/edit/:id',
                    show: '/users/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: 'merchants',
                    list: '/merchants',
                    create: '/merchants/create',
                    edit: '/merchants/edit/:id',
                    show: '/merchants/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: 'positions',
                    list: '/positions',
                    create: '/positions/create',
                    edit: '/positions/edit/:id',
                    show: '/positions/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: '9eFURG-LMp3ib-9TjBi7',
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="users" />}
                    />
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserUpdate />} />
                    </Route>
                    <Route path="/merchants">
                      <Route index element={<MerchantList />} />
                      <Route path="create" element={<MerchantCreate />} />
                      <Route path="edit/:id" element={<MerchantUpdate />} />
                    </Route>
                    <Route path="/positions">
                      <Route index element={<PositionList />} />
                      <Route path="create" element={<PositionCreate />} />
                      <Route path="edit/:id" element={<PositionUpdate />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
