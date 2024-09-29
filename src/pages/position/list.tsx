import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, useDataGrid } from '@refinedev/mui'
import React from 'react'
import { PositionResponse } from '../../models/responses/positionResponse'

export const PositionList = () => {
  const { dataGridProps } = useDataGrid<PositionResponse>({
    resource: 'positions',
  })

  const columns = React.useMemo<GridColDef<PositionResponse>[]>(
    () => [
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 250,
        disableColumnMenu: true,
      },
      {
        field: 'dataStatusName',
        flex: 1,
        headerName: 'Status',
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
