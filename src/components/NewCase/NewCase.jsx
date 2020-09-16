import React from 'react';

export class NewCase extends React.Component {
    state = {
        date: '',
        licenseNumber: '',
        color: '',
        type: 'general',
        ownerFullName: '',
        desc: '',
    }

    handleDateChange = (event) => {
        const date = event.target.value;
        this.setState({ date: date });
    }

    handleLicenseNumberChange = (event) => {
        const licenseNumber = event.target.value;
        this.setState({ licenseNumber: licenseNumber });
    }

    handleColorChange = (event) => {
        const color = event.target.value;
        this.setState({ color: color });
    }
    
    handleTypeChange = (event) => {
        const type = event.target.value;
        this.setState({ type: type });
    }

    handleOwnerFullNameChange = (event) => {
        const ownerFullName = event.target.value;
        this.setState({ ownerFullName: ownerFullName });
    }

    handleDescChange = (event) => {
        const desc = event.target.value;
        this.setState({ desc: desc });
    }

    handleCaseCreate = () => {
        const newCase  = this.state;

            fetch('http://84.201.129.203:8888/api/public/report', { 
                method: 'POST', 
                body: JSON.stringify({
                    "color": newCase.color,
                    "date": newCase.date,
                    "description": newCase.desc,
                    "licenseNumber": newCase.licenseNumber,
                    "ownerFullName": newCase.ownerFullName,
                    "type": newCase.type,
                    "clientId": localStorage.getItem('clientId')
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        .then(() => {
            alert('Сообщение создано, благодарим за информацию!');
            window.location = "/";
        })
    }

    render() {
        const newCase  = this.state;

        return (
            <div>
                <input type="date" name="date" onChange={this.handleDateChange} value={newCase.date} /> <br />
                <input type="text" name="licenseNumber" placeholder="Рег. номер" onChange={this.handleLicenseNumberChange} value={newCase.licenseNumber} /> <br />
                <input type="text" name="color" placeholder="Цвет" onChange={this.handleColorChange} value={newCase.color} /> <br />
                <select name="type" onChange={this.handleTypeChange}> 
                    <option value="general">General</option>
                    <option value="sport">Sport</option>
                </select>
                <br />
                <input type="text" name="ownerFullName" placeholder="ФИО" onChange={this.handleOwnerFullNameChange} value={newCase.ownerFullName} /> <br />
                <textarea name="desc" placeholder="Опишите ваш случай" onChange={this.handleDescChange} value={newCase.desc} /> <br />
                <input type="button" onClick={this.handleCaseCreate} value="Отправить" disabled={!newCase.desc.length || !newCase.licenseNumber.length || !newCase.color.length || !newCase.ownerFullName.length} />
            </div>
        )
    }
};
