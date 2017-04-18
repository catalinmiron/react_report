import React, { Component } from 'react';
import UserPane from './UserFieldsPane/index';
import OrganizationPane from './OrganizationFieldsPane/index';
import SubscriptionPane from './SubscriptionFieldsPane/index';
import Siringa from '../../siringa'


class NewUserPane extends Component {

    constructor (props) {
        super(props);

        this.state = {
            userData: {},
            subscriptionData: {},
            organizationData: {},
            environment: 'release'
        };

        this.renderTextFields=this.renderTextFields.bind(this);
        this.onEnvironmentFilled=this.onEnvironmentFilled.bind(this);
        this.onUserFilled=this.onUserFilled.bind(this);
        this.onOrganizationFilled=this.onOrganizationFilled.bind(this);
        this.onSubscriptionFilled=this.onSubscriptionFilled.bind(this);
        this.isButtonEnabled=this.isButtonEnabled.bind(this);
        this.onSend=this.onSend.bind(this);
    }


    onEnvironmentFilled (event) {
        this.setState (
            {
                environment: event.currentTarget.value
            }
        )
    }

    onSubscriptionFilled (subscriptionData) {
        this.setState (
            {
                subscriptionData: subscriptionData
            }
        )
    }

    onOrganizationFilled (organizationData) {
        this.setState (
            {
                organizationData: organizationData
            }
        )
    }

    onUserFilled (userData) {
        this.setState({
            userData: userData
        })
    }

    onSend () {
        Siringa.create_user(
            this.state
        , (error, response) => {
            if(error){
                console.log("There is an error: \n", error)
            } else {
                console.log("Here is the response: \n", response)
            }
        });
    }

    renderTextFields () {
        return (
            <div>
                <div className="environment">
                    <label >{`Environment: `}</label>
                    <input className="environment-input"
                           value={this.state.environment}
                           onChange={this.onEnvironmentFilled}
                           type="textField"
                    />
                </div>
                <div className="new-user-fields">
                    <UserPane onFilled={this.onUserFilled}/>
                    <OrganizationPane onFilled={this.onOrganizationFilled}/>
                    <SubscriptionPane onFilled={this.onSubscriptionFilled}/>
                </div>
            </div>
        )
    }

    isButtonEnabled (){
        return {
            disabled: Object.values(this.state).some(
                          (value) => {
                              return (JSON.stringify(value).includes("{}"))
                          }
                      )
        }
    }

    render () {
        return (
            <div className="suite-pane col-md-12">
                <div className="no-suite-loaded panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <h1>Create new user</h1>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="create-new-user">
                            <div>

                                {this.renderTextFields()}
                                <button className="sendButton btn btn-default" {...this.isButtonEnabled()} onClick={this.onSend}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default NewUserPane;
