import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { server_calls } from '../api/server';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Fighter Name', flex: 1 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'special_move', headerName: 'Special Move', flex: 1 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const { fighterData, getData } = useGetData();
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const [columnVisibilityModel] = useState({
        id: false,
        name: true,
        origin: true,
        special_move: true
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteData = async () => {
        if (selectionModel.length > 0) {
            try {
                await server_calls.delete(selectionModel[0].toString());
                await getData();
            } catch (error) {
                console.error('Failed to delete item:', error);
            }
        } else {
            console.log('No item selected to delete.');
        }
    };

    const updateData = async () => {
        if (selectionModel.length > 0) {
            try {
                const newName = prompt("Enter new fighter name:", "");
                const newOrigin = prompt("Enter new origin:", "");
                const newSpecialMove = prompt("Enter new special move:", "");
    
                const updateData = {
                    name: newName,
                    origin: newOrigin,
                    special_move: newSpecialMove
                };
    
                // Filtering out empty updates to avoid overwriting data unintentionally
                Object.keys(updateData).forEach(key => {
                    const updateKey = key as keyof typeof updateData;
                    if (updateData[updateKey] === null || updateData[updateKey] === "") {
                        delete updateData[updateKey];
                    }
                });
    
                await server_calls.update(selectionModel[0].toString(), updateData);
                await getData();
            } catch (error) {
                console.error('Failed to update item:', error);
            }
        } else {
            console.log('No item selected to update.');
        }
    };
    
    

    return (
        <>
            <Modal 
                id={selectionModel.map(String)}
                open={open}
                onClose={handleClose}
            />
            <div className="flex flex-row">
                <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">
                    Create New Fighter
                </Button>
                <Button onClick={updateData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">
                    Update
                </Button>
                <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">
                    Delete
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }} className={open ? 'hidden' : 'container mx-auto my-5'}>
                <h2 className="p-3 bg-slate-300 my-2 rounded">Fighters Overview</h2>
                <DataGrid
                    rows={fighterData}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                    columnVisibilityModel={columnVisibilityModel}
                />
            </div>
        </>
    );
}

export default DataTable;
