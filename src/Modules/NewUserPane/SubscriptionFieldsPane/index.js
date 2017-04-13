import React, { Component } from 'react';


class SubscriptionFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: '',
            states: ['active', 'trialing', 'expired', 'canceled'],
            state: 'active',
            date: new Date().toISOString().slice(0,10),
            zuora: true
        };

        this.renderFields=this.renderFields.bind(this);
        this.renderStates=this.renderStates.bind(this);
        this.onProductChange=this.onProductChange.bind(this);
        this.onStateChange=this.onStateChange.bind(this);
        this.onDateChange=this.onDateChange.bind(this);
        this.onZuoraChange=this.onZuoraChange.bind(this);
    }

    componentDidMount () {
        this.props.onFilled(this.state);
    }

    onProductChange (event) {
        this.setState({
            product: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});

    }

    onStateChange (event) {
        this.setState({
            state: event.target.value
        }, () => {this.props.onFilled(this.state)});
    }

    onDateChange (event) {
        this.setState({
            date: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onZuoraChange (event) {
        this.setState({
            zuora: event.currentTarget.checked
        }, () => {this.props.onFilled(this.state)});
    }

    renderStates () {
        return (
            <div>
                <label id="state" >{`State: `}</label>
                <select onChange={this.onStateChange}>
                    {
                        this.state.states.map((state) => {
                            return(
                                <option key={state} value={state} >{state}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }

    renderFields () {
        return(
            <div className="fields">
                <div>
                    <label id="product" >{`Product: `}</label>
                    <input
                        value={this.state.product}
                        onChange={this.onProductChange}
                        type="textField"
                    />
                </div>

                {this.renderStates()}

                <div>
                    <label id="date" >{`Creation date: `}</label>
                    <input
                        value={this.state.date}
                        onChange={this.onDateChange}
                        type="date"
                    />
                </div>

                <div>
                    <label id="zuora" >{`Create zuora subscription: `}</label>
                    <input
                        onChange={this.onZuoraChange}
                        type="checkbox"
                    />
                </div>
            </div>
        )
    }

    render () {
        return (
            <div className="subscription-fields-pane fields-pane">
                <p>Insert subscription data: </p>
                {this.renderFields()}
            </div>
        )
    }
};

export default SubscriptionFieldsPane;
