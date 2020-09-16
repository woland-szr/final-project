import React, { Component } from 'react';
import { AdminHeader } from './../AdminHeader';
import MaterialTable from 'material-table';
import './Cases.css';

export class Cases extends Component {
    state = {
        cases: [],
        officers: []
    }

    getCases = () => {

        const activeUser = localStorage.getItem('token');

        fetch('http://84.201.129.203:8888/api/cases', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${activeUser}`
            }
        })
            .then(response => response.json())
            .then(cases => {
               this.setState({ cases });
            });

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

    rowUpdate = (newData, oldData) => {

        if (newData.status === 'done') {
            newData.resolution = prompt('Please enter resolution');
        }

        fetch(`http://84.201.129.203:8888/api/cases/${oldData._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "color": newData.color,
                "date": newData.date,
                "description": newData.description,
                "licenseNumber": newData.licenseNumber,
                "ownerFullName": newData.ownerFullName,
                "type": newData.type,
                "status": newData.status,
                "resolution": newData.resolution,
                'officer': newData.officer,
                "updateAt": Date()
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => this.getCases())
    }

    componentDidMount() {
        this.getCases();
    }
   
    render() {
        
        if (localStorage.getItem('token')) {

            const cases  = this.state.cases;
            let officers = {};
            this.state.officers.forEach(item => {officers[item._id] = `${item.firstName} ${item.lastName}`})

            return (
                <div>
                    <AdminHeader />
                    <div>
                        <MaterialTable
                            columns={[
                                {title: "Status", field: "status",
                                lookup: {'new' : 'New', 'in_progress' : 'In progress', 'done' : 'Done'}
                                },
                                {title: "Officer", field: "officer",
                                lookup: officers
                                },                                
                                {title: "Date", field: "date", type: "date"},
                                {title: "License number", field: "licenseNumber"},
                                {title: "Color", field: "color"},
                                {title: "Type", field: "type",
                                lookup: {'general' : 'General', 'sport' : 'Sport'}
                                },
                                {title: "Owner", field: "ownerFullName"},
                                {title: "Description", field: "description",
                                editComponent: props => (
                                    <textarea 
                                    value={props.value} 
                                    onChange={e => props.onChange(e.target.value)}
                                    cols='40' 
                                    rows='3'></textarea>
                                )
                                },
                                {title: "Resolution", field: "resolution", editable: 'never'}
                            ]}
                            data={cases}

                            title='Cases'

                            detailPanel={[
                                {
                                  tooltip: 'Show Name',
                                  render: rowData => {
                                        let className = 'detail';
                                        if  (rowData.status === 'new') {
                                            className += ' detail_new'
                                        }
                                        let officerName = officers[rowData.officer]
                                    return (
                                      <div className={className}>
                                        Case date: {rowData.date.slice(0,10)}<br />
                                        Owner: {rowData.ownerFullName}<br />
                                        License number: {rowData.licenseNumber}<br />
                                        Type: {rowData.type}<br />
                                        Color: {rowData.color}<br />
                                        Description: {rowData.description}<br />
                                        <hr />
                                        Case created: {rowData.createdAt.slice(0,10)}<br />
                                        Case updated: {rowData.updateAt.slice(0,10)}<br />
                                        Officer: {officerName}<br />
                                        Resolution: {rowData.resolution}
                                      </div>
                                    )
                                  },
                                }
                            ]}

                            editable={{

                                onRowAdd: newData => 
                                    new Promise(resolve => {
                                    fetch('http://84.201.129.203:8888/api/cases', { 
                                        method: 'POST', 
                                        body: JSON.stringify({
                                            "color": newData.color,
                                            "date": newData.date,
                                            "description": newData.description,
                                            "licenseNumber": newData.licenseNumber,
                                            "ownerFullName": newData.ownerFullName,
                                            "type": newData.type,
                                            "officer": newData.officer,
                                            "clientId": localStorage.getItem('clientId')
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    .then(() => resolve()).then(() => this.getCases())
                                    }),

                                onRowUpdate: (newData, oldData) => 
                                    new Promise(resolve => {
                                        this.rowUpdate(newData, oldData);
                                        resolve();
                                    }),

                                onRowDelete: oldData =>
                                    new Promise(resolve => {
                                        fetch(`http://84.201.129.203:8888/api/cases/${oldData._id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                                            }
                                        })
                                        .then(() => resolve()).then(() => this.getCases())
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