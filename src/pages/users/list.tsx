import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, useDataGrid } from '@refinedev/mui'
import React from 'react'
import { UserResponse } from '../../models/responses/userResponse'

export const UserList = () => {
  const { dataGridProps } = useDataGrid<UserResponse>({
    resource: 'users',
  })

  const columns = React.useMemo<GridColDef<UserResponse>[]>(
    () => [
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
        {...dataGridProps}
        columns={columns}
        filterMode="client"
        autoHeight
      />
    </List>
  )
}
