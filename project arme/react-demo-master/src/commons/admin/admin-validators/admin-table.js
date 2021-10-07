import React from "react";
import Table from "../../tables/table";
import {Button} from "reactstrap";



const filters = [
    {
        accessor: 'name',
    }
];

class AdminTable extends React.Component {

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
                Header: 'Address',
                accessor: 'address',
            },

            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Delete',
                Cell: row => (<Button color = "danger" onClick = {() => this.props.delete(row.original)}> Delete </Button>),
            }
        ];
    }

    render() {
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

export default AdminTable;