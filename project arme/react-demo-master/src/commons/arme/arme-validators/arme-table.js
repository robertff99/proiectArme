import React from "react";
import Table from "../../tables/table";
import {Button} from "reactstrap";




const filters = [
    {
        accessor: 'calibre',

    }
];

class ArmeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
        this.columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Calibre',
                accessor: 'calibre',
            },

            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Delete',
                Cell: row => (<Button color = "danger" onClick = {() => this.props.delete(row.original)}> Delete </Button>)
            }



        ];
    }

    render() {
        console.log(this.state.tableData);
        return (
            <Table
                data={this.state.tableData}
                columns={this.columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default ArmeTable;