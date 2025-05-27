import { Row } from '@/app/page';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

interface GridProps {
    rowData: Row[];
}

const Grid = ({rowData}: GridProps) => {
    // TODO: mostely AI generated code, needs to be checked an properly typed/filtered
    const colDefs: ColDef[] = [
        { field: "date", headerName: "Date", type: 'DateString', filter: 'agDateColumnFilter', sortable: true },
        { field: "Usage_kWh", headerName: "Usage (kWh)", filter: 'agNumberColumnFilter', sortable: true },
        { field: "Lagging_Current_Reactive.Power_kVarh", headerName: "Lagging Reactive Power (kVarh)", filter: 'agNumberColumnFilter', sortable: true },
        { field: "Leading_Current_Reactive_Power_kVarh", headerName: "Leading Reactive Power (kVarh)", filter: 'agNumberColumnFilter', sortable: true },
        { field: "CO2(tCO2)", headerName: "CO2 Emissions (tCO2)", filter: 'agNumberColumnFilter', sortable: true },
        { field: "Lagging_Current_Power_Factor", headerName: "Lagging Power Factor", filter: 'agNumberColumnFilter', sortable: true },
        { field: "Leading_Current_Power_Factor", headerName: "Leading Power Factor", filter: 'agNumberColumnFilter', sortable: true },
        { field: "NSM", headerName: "NSM", filter: 'agNumberColumnFilter', sortable: true },
        { field: "WeekStatus", headerName: "Week Status", filter: 'agTextColumnFilter', sortable: true },
        { field: "Day_of_week", headerName: "Day of Week", filter: 'agTextColumnFilter', sortable: true },
        { field: "Load_Type", headerName: "Load Type", filter: 'agTextColumnFilter', sortable: true }
    ];

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
            />
        </div>
    )
}

export default Grid;
