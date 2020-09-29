import React from 'react';
import './NewCase.css';

export class NewCase extends React.Component {
  state = {
    date: '',
    licenseNumber: '',
    color: '',
    type: 'general',
    ownerFullName: '',
    desc: '',
  };

  handleDateChange = (event) => {
    const date = event.target.value;
    this.setState({ date });
  };

  handleLicenseNumberChange = (event) => {
    const licenseNumber = event.target.value;
    this.setState({ licenseNumber });
  };

  handleColorChange = (event) => {
    const color = event.target.value;
    this.setState({ color });
  };

  handleTypeChange = (event) => {
    const type = event.target.value;
    this.setState({ type });
  };

  handleOwnerFullNameChange = (event) => {
    const ownerFullName = event.target.value;
    this.setState({ ownerFullName });
  };

  handleDescChange = (event) => {
    const desc = event.target.value;
    this.setState({ desc });
  };

  handleCaseCreate = async () => {
    const newCase = this.state;

    await fetch('http://84.201.129.203:8888/api/public/report', {
      method: 'POST',
      body: JSON.stringify({
        color: newCase.color,
        date: newCase.date,
        description: newCase.desc,
        licenseNumber: newCase.licenseNumber,
        ownerFullName: newCase.ownerFullName,
        type: newCase.type,
        clientId: localStorage.getItem('clientId'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // eslint-disable-next-line no-alert
    alert('Your case was successfully submitted. Thank you for your information!');
    window.location = '/';
  };

  render() {
    const newCase = this.state;

    return (
      <div className="form_container">
        <div className="form_block">
          <div className="newcase_form_block">
            <label className="form_label" htmlFor="licenseNumber">
              {' '}
              License number
              <input
                className="form_input"
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                placeholder="Enter license number"
                onChange={this.handleLicenseNumberChange}
                value={newCase.licenseNumber}
              />
            </label>
            <label className="form_label" htmlFor="color">
              {' '}
              Color
              <input
                className="form_input"
                type="text"
                name="color"
                id="color"
                placeholder="Enter bike color"
                onChange={this.handleColorChange}
                value={newCase.color}
              />
            </label>
            <div className="form_label for_select">
              {' '}
              Choose bike type
              <br />
              <input
                className="form_radio"
                type="radio"
                name="type"
                id="type1"
                value="general"
                defaultChecked
                onChange={this.handleTypeChange}
                // eslint-disable-next-line react/jsx-one-expression-per-line
              />{' '}
              General
              <input
                className="form_radio"
                type="radio"
                name="type"
                id="type2"
                value="sport"
                onChange={this.handleTypeChange}
                // eslint-disable-next-line react/jsx-one-expression-per-line
              />{' '}
              Sport
            </div>
          </div>
          <div className="newcase_form_block">
            <label className="form_label" htmlFor="date">
              {' '}
              Case date
              <input
                className="form_input for_date"
                type="date"
                name="date"
                id="date"
                onChange={this.handleDateChange}
                value={newCase.date}
              />
            </label>
            <label className="form_label for_name" htmlFor="ownerFullName">
              {' '}
              Full name
              <input
                className="form_input input_name"
                type="text"
                name="ownerFullName"
                id="ownerFullName"
                placeholder="Enter your full name"
                onChange={this.handleOwnerFullNameChange}
                value={newCase.ownerFullName}
              />
            </label>
          </div>
          <label className="form_label" htmlFor="desc">
            {' '}
            Case details
            <textarea
              className="form_input"
              name="desc"
              id="desc"
              placeholder="Tell us more about your case"
              onChange={this.handleDescChange}
              value={newCase.desc}
            />
          </label>
        </div>
        <input
          className="myButton newcase_btn"
          type="button"
          onClick={this.handleCaseCreate}
          value="Submit"
          disabled={
            !newCase.desc.length ||
            !newCase.licenseNumber.length ||
            !newCase.color.length ||
            !newCase.ownerFullName.length
          }
        />
      </div>
    );
  }
}
