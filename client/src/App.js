import React, { Component } from 'react';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import './App.css';

class App extends Component {
  state = { records: [] }

  async componentDidMount() {
    const response = await fetch('/records');

    const json = await response.json();
    this.setState({ records: json });
  }

  render() {
    console.log(this.state.records);

    const columns = [{
      Header: 'id',
      accessor: 'id'
    },
    {
      Header: 'First Name',
      accessor: 'first_name'
    }, {
      Header: 'Last Name',
      accessor: 'last_name',
    }, {
      Header: 'Company',
      accessor: 'company',
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      Header: 'Address 1',
      accessor: 'address1',
    }, {
      Header: 'Address 2',
      accessor: 'address2',
    }, {
      Header: 'Zip',
      accessor: 'zip',
    }, {
      Header: 'City',
      accessor: 'city',
    }, {
      Header: 'State (long)',
      accessor: 'state_long',
    }, {
      Header: 'State',
      accessor: 'state',
    }, {
      Header: 'Phone',
      accessor: 'phone',
    }]

    return (
      <div>
        <h1>Validity Take-home</h1>
        <h2>Duplicates</h2>
        <ReactTable // table of duplicates
          data={this.state.records.duplicates}
          columns={columns}
        />
        <h2>Originals</h2>
        <ReactTable // table of originals
          data={this.state.records.originals}
          columns={columns}
        />
      </div>
    );
  }
}
 


export default App;
