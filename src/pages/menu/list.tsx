import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, useDataGrid } from '@refinedev/mui'
import React from 'react'
import { MenuResponse } from '../../models/responses/menuResponse'

export const MenuList = () => {
  const { dataGridProps } = useDataGrid<MenuResponse>({
    resource: 'menus',
  })

  const columns = React.useMemo<GridColDef<MenuResponse>[]>(
    () => [
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 250,
        disableColumnMenu: true,
      },
      {
        field: 'merchantName',
        flex: 1,
        headerName: 'Merchant',
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
