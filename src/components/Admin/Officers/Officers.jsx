import React, { Component } from 'react';
import { AdminHeader } from '../AdminHeader';
import MaterialTable from 'material-table';
import './Officers.css';

export class Officers extends Component {
    state = {
        officers: []
    }

    getOfficers = () => {

        const activeUser = localStorage.getItem('token');

        fetch('http://84.201.129.203:8888/api/officers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${activeUser}`
            }
        })
            .then(response => response.json())
            .then(officers => {
               this.setState({ officers });
            });
    }

    componentDidMount() {
        this.getOfficers();
    }
   
    render() {
        
        if (localStorage.getItem('token')) {
            const { officers } = this.state;

            return (
                <div>
                    <AdminHeader />
                    <div>
                        <MaterialTable
                            columns={[
                                {title: "Email", field: "email"},
                                {title: "Firstname", field: "firstName"},                                
                                {title: "Lastname", field: "lastName"},
                                {title: "Approved", field: "approved",
                                lookup: {'true' : 'Yes', 'false' : 'No'}
                                }
                            ]}
                            data={officers}

                            title='Officers'

                            options={{
                                headerStyle: {
                                  backgroundColor: '#0D9488',
                                  color: '#FFF'
                                }
                              }}

                            editable={{

                            onRowAdd: newData => 
//                                new Promise(resolve => {
                                async () => {
//                                    fetch('http://84.201.129.203:8888/api/officers', { 
                                    await fetch('http://84.201.129.203:8888/api/officers', { 
                                        method: 'POST', 
                                        body: JSON.stringify({
                                            "email": newData.email,
                                            "firstName": newData.firstName,
                                            "lastName": newData.lastName,
                                            "password": newData.password,
                                            "clientId": localStorage.getItem('clientId')
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    this.getOfficers()
                                },

//                                    .then(() => resolve()).then(() => this.getOfficers())
//                                }),

                            onRowUpdate: (newData, oldData) => 
                                new Promise(resolve => {
                                    fetch(`http://84.201.129.203:8888/api/officers/${oldData._id}`, {
                                        method: 'PUT',
                                        body: JSON.stringify({
                                                "email": newData.email,
                                                "firstName": newData.firstName,
                                                "lastName": newData.lastName,
                                                "approved": newData.approved,
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    .then(() => resolve()).then(() => this.getOfficers())
                                }),


                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    fetch(`http://84.201.129.203:8888/api/officers/${oldData._id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    .then(() => resolve()).then(() => this.getOfficers())
                                }),
                        }}
                        />
                    </div>    
                </div>
            )
        } else {
            return (
                <div>
                       This page is only for authorised officers!
                </div>
            )
        }
    }
}