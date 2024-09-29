import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, useDataGrid } from '@refinedev/mui'
import React from 'react'
import { RoleResponse } from '../../models/responses/roleResponse'

export const RoleList = () => {
  const { dataGridProps } = useDataGrid<RoleResponse>({
    resource: 'roles',
  })

  const columns = React.useMemo<GridColDef<RoleResponse>[]>(
    () => [
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 250,
        disableColumnMenu: true,
      },
      {
        field : 'dataStatusName',
        flex : 1,
        headerName : 'status',
        minWidth: 250,
        disableColumnMenu: true,
      }
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
