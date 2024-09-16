import { DataGrid, GridSortItem, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, ShowButton } from '@refinedev/mui'
import React from 'react'
import { UserResponse } from '../../models/responses/userResponse'
import { useList } from '@refinedev/core'

export const UserList = () => {
  const [sort, setSort] = React.useState<GridSortItem>()
  const { data, isLoading } = useList<UserResponse>({
    resource: 'users',
    sorters: [
      {
        field: sort?.field ?? 'id',
        order: sort?.sort ?? 'asc',
      },
    ],
  })

  const columns = React.useMemo<GridColDef<UserResponse>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        minWidth: 50,
        sortable: false,
      },
      {
        field: 'username',
        flex: 1,
        headerName: 'Username',
        minWidth: 200,
        disableColumnMenu: true,
      },
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 250,
        disableColumnMenu: true,
      },
      {
        field: 'roleName',
        flex: 1,
        headerName: 'Role',
        disableColumnMenu: true,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          )
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80,
      },
    ],
    []
  )

  return (
    <List>
      <DataGrid
        loading={isLoading}
        onSortModelChange={(model) => {
          if (model[0]) {
            setSort(model[0])
          }
        }}
        sortingMode="server"
        rows={data?.data ?? []}
        columns={columns}
        filterMode="client"
        autoHeight
      />
    </List>
  )
}
