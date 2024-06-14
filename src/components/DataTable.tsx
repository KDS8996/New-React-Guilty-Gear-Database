import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90 },
    { field: 'name', headerName: 'Fighter Name', flex: 1 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'special_move', headerName: 'Special Move', flex: 1 }
]   

function DataTable() {
    const [ open, setOpen ] = useState(false);
    const { fighterData, getData  } = useGetData(); // Corrected to use fighterData
    const [ selectionModel, setSelectionModel ] = useState<string[]>([]);
    const [columnVisibilityModel] = useState({
        id: false,
        name: true,
        origin: true,
        special_move: true
    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0]);
        getData();
        console.log(`Selection model: ${selectionModel}`);
        setTimeout( () => { window.location.reload() }, 500);
    }

    return (
    <>
        <Modal 
            id={ selectionModel }
            open={open}
            onClose={handleClose}
        />
        <div className='flex flex-row'>
            <div>
                <Button onClick={handleOpen} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>
                    Create New Fighter
                </Button>
            </div>
            <Button onClick={handleOpen} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>Update</Button>
            <Button onClick={deleteData} className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'>Delete</Button>
        </div>
        <div style={{ height: 400, width: '100%' }} className={open ? "hidden" : "container mx-auto my-5"}>
    <h2 className="p-3 bg-slate-300 my-2 rounded">Fighters Overview</h2>
    <DataGrid
        rows={fighterData}
        columns={columns}
        checkboxSelection={true}
        onRowSelectionModelChange={(item: any) => {
            setSelectionModel(item);
        }}
        columnVisibilityModel={columnVisibilityModel}
    />
</div>



    </>
  )
}

export default DataTable;
