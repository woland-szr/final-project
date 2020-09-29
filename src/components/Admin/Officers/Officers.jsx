import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { AdminHeader } from '../AdminHeader';
import './Officers.css';

export class Officers extends Component {
  state = {
    officers: [],
  };

  componentDidMount() {
    this.getOfficers();
  }

  getOfficers = async () => {
    const activeUser = localStorage.getItem('token');

    const response = await fetch('http://84.201.129.203:8888/api/officers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${activeUser}`,
      },
    });
    const officers = await response.json();
    this.setState({ officers });
  };

  render() {
    if (localStorage.getItem('token')) {
      const { officers } = this.state;

      return (
        <div>
          <AdminHeader />
          <div>
            <MaterialTable
              columns={[
                { title: 'Email', field: 'email' },
                { title: 'Firstname', field: 'firstName' },
                { title: 'Lastname', field: 'lastName' },
                { title: 'Approved', field: 'approved', lookup: { true: 'Yes', false: 'No' } },
              ]}
              data={officers}
              title="Officers"
              options={{
                headerStyle: {
                  backgroundColor: '#0D9488',
                  color: '#FFF',
                },
              }}
              editable={{
                isEditable: (rowData) => rowData.email !== 'test@test.ru',
                isDeletable: (rowData) => rowData.email !== 'test@test.ru',

                onRowAdd: (newData) =>
                  new Promise(async (resolve) => {
                    await fetch('http://84.201.129.203:8888/api/officers', {
                      method: 'POST',
                      body: JSON.stringify({
                        email: newData.email,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        password: newData.password,
                        clientId: localStorage.getItem('clientId'),
                      }),
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    });
                    resolve();
                    this.getOfficers();
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise(async (resolve) => {
                    await fetch(`http://84.201.129.203:8888/api/officers/${oldData._id}`, {
                      method: 'PUT',
                      body: JSON.stringify({
                        email: newData.email,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        approved: newData.approved,
                      }),
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    });
                    resolve();
                    this.getOfficers();
                  }),

                onRowDelete: (oldData) =>
                  new Promise(async (resolve) => {
                    await fetch(`http://84.201.129.203:8888/api/officers/${oldData._id}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    });
                    resolve();
                    this.getOfficers();
                  }),
              }}
            />
          </div>
        </div>
      );
    }
    return <div>This page is only for authorised officers!</div>;
  }
}
