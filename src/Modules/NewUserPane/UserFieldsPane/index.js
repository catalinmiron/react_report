import React, { Component } from 'react';


class UserFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            login: '',
            email: '',
        };
        this.renderFields=this.renderFields.bind(this);
        this.onFirstNameChange=this.onFirstNameChange.bind(this);
        this.onLastNameChange=this.onLastNameChange.bind(this);
        this.onLoginChange=this.onLoginChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
    }

    onFirstNameChange (event) {
        this.setState({
            firstName: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});

    }

    onLastNameChange (event) {
        this.setState({
            lastName: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onLoginChange (event) {
        this.setState({
            login: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onEmailChange (event) {
        this.setState({
            email: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    renderFields () {
        return(
            <div className="fields">
                <div>
                    <label id="first_name" >{`First name: `}</label>
                    <input
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        type="textField"
                        placeholder="ex: Carlos"
                    />
                </div>

                <div>
                    <label id="last_name" >{`Last name: `}</label>
                    <input
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                        type="textField"
                        placeholder="ex: Perez"
                    />
                </div>

                <div>
                    <label id="login" >{`Login: `}</label>
                    <input
                        value={this.state.login}
                        onChange={this.onLoginChange}
                        type="textField"
                        placeholder="ex: caper"
                    />
                </div>

                <div>
                    <label id="email" >{`Email: `}</label>
                    <input
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        type="textField"
                        placeholder="ex: example@example.com"
                    />
                </div>
            </div>
        )
    }

    render () {
        return (
            <div className="user-fields-pane fields-pane">
                <p>Insert user data: </p>
                    {this.renderFields()}
            </div>
        )
    }
};

export default UserFieldsPane;
