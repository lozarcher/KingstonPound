const config={
    FLAVOUR: 'release',
	STAGE_CONFIG: {
		  host: 'api.bristolpound.org'
		, cyclosPrefix: ''
		, network: ''
		, wsPrefix: ''
	},
    DEV_CONFIG: {
		  host: 'bristol.cyclos.org'
		, cyclosPrefix: ""
		, network: 'bristolpoundsandbox03'
	},
    PROD_CONFIG: {
		  host: 'api.bristolpound.org'
		, cyclosPrefix: ''
		, network: ''
		, wsPrefix: ''
	},
    APP_CITY: 'Bristol',
    APP_WEBSITE: 'https://bristolpound.org',
    TXT2PAY_NO: '+44 7441 906260',
    ALLOW_LOGIN: true
}

// ToDo: needs to be replaced at some point with a CyclosHost object, similar to the config in DirectoryAPI
config.STAGE_SERVER	= 'https://bristol-stage.community-currency.org/cyclos/bristolpound/api/'
config.DEV_SERVER 	= 'https://'+config.DEV_CONFIG.host		+'/'+config.STAGE_CONFIG.network+'/api/'
config.BASE_URL	= 'https://bristol-stage.community-currency.org/cyclos/bristolpound/api/'

// ToDo: needs to also be able to use DEV_CONFIG
config.CURRENT_CONFIG = (config.FLAVOUR == 'release' ? config.PROD_CONFIG : config.STAGE_CONFIG)

export default config
