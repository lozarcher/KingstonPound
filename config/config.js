// export this to see the original selection
export const flavour = 'staging'

// use the secrets
export const secrets = true

// the base configuration
export const default_config={
    APP_CITY: 'Bristol',
    APP_CURRENCY: 'Bristol Default',
    APP_WEBSITE: 'https://bristolpound.org',
    TXT2PAY_NO: '+44 7441 906260',
    CYCLOS: {
        host: 'bristol-stage.community-currency.org',
        cyclosPrefix: 'cyclos',
        network: 'bristolpound',
        wsPrefix: ''
    },
    DIRECTORY: {
        host: 'api.bristolpound.org',
        cyclosPrefix: '',
        network: '',
        wsPrefix: ''
    },
    ALLOW_LOGIN: true,
    APP_VERSION: '4.0.0',
    DEFAULT_COORDINATES: { latitude: 51.454513, longitude:  -2.58791 },
    CASH_POINT_1: 'Here everyone can swap Sterling for Bristol Pounds, account holders can withdraw paper notes and businesses can deposit them.',
    CASH_POINT_2: 'Here everyone can swap Sterling for Bristol Pounds.'
}

// customisations for individual flavours are added here
export const configurations={
    staging: {
        APP_CURRENCY: 'Bristol Staging',
    },
    development: {
        APP_CURRENCY: 'Bristol Devel',
        CYCLOS: {
            host: 'dev-bristol.community-currency.org',
            channel: 'BristolPoundApp{CHANNEL_SECRET}',
        },
    },
    production: {
        APP_CURRENCY: 'Bristol Pound',
        TXT2PAY_NO: '+44 7441 900 333​',
        CYCLOS: {
            host: 'bristol.community-currency.org',
            channel: 'BristolPoundApp{CHANNEL_SECRET}',
        }
	}
}

export default config = {}
