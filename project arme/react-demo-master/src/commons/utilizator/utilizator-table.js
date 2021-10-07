import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";

const columns = [
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Password',
        accessor: 'password',
    },
    {
        Header: 'Role',
        accessor: 'role',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class UtilizatorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default UtilizatorTable;