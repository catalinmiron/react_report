import React, { Component } from 'react';


class OrganizationFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            enableFeatures: false,
        };
        this.renderFields=this.renderFields.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onEnabledChange=this.onEnabledChange.bind(this);
    }

    componentDidMount () {
        this.props.onFilled(this.state);
    }

    onNameChange (event) {
        this.setState({
            name: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});

    }

    onEnabledChange (event) {
        this.setState({
            zuora: event.currentTarget.checked
        }, () => {this.props.onFilled(this.state)});
    }

    renderFields () {
        return(
            <div className="fields">
                <div>
                    <label id="name" >{`Name: `}</label>
                    <input
                        value={this.state.name}
                        onChange={this.onNameChange}
                        type="textField"
                        placeholder="ex: Redbooth BCN"
                    />
                </div>

                <div>
                    <label id="enableFeatures" >{`Enable all features: `}</label>
                    <input
                        onChange={this.onEnabledChange}
                        type="checkbox"
                    />
                </div>
            </div>
        )
    }

    render () {
        return (
            <div className="subscription-fields-pane fields-pane">
                <p>Insert organization data: </p>
                {this.renderFields()}
            </div>
        )
    }
};

export default OrganizationFieldsPane;
