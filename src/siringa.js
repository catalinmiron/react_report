import jsonp from 'jsonp'

var Siringa = class {
    constructor(definition = null) {
        this.definition = definition || 'create_user_with_org';
    }

    create_user = function(params, callback) {
        const host = `https://${params.environment}.staging.redbooth.com/app/test/load_definition/pb_create_user_with_subscription`;
        const parameters = {
            "siringa_args": {
                //user data
                "first_name": params.userData.firstName,
                "last_name": params.userData.lastName,
                "login": params.userData.login,
                "email": params.userData.email,
                "password": 'papapa22',
                //Subscription data
                "product": params.subscriptionData.product,
                "state": params.subscriptionData.state,
                "subscription_date": params.subscriptionData.date,
                "zuora_susbcription_creation": params.subscriptionData.zuora,
                //Organization data
                "org_name": params.organizationData.name,
                "enable_all_features": params.organizationData.enableFeatures
            }
        };

        jsonp(host, parameters, 'callback', function (json) {
            callback(json)
        })
    }
};

export default new Siringa();
