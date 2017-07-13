const config={
    FLAVOUR: 'release',
	STAGE_CONFIG: {
		  host: 'bristol-stage.community-currency.org'
		, network: 'bristolpound'
	},
    DEV_CONFIG: {
		  host: 'bristol.cyclos.org'
		, cyclosPrefix: ""
		, network: 'bristolpoundsandbox03'
	},
    PROD_CONFIG: {
		  host: 'bristol-stage.community-currency.org'
		, network: 'bristolpound'
	},
    APP_CITY: 'Bristol',
    APP_WEBSITE: 'https://bristolpound.org',
    TXT2PAY_NO: '+44 7441 906260',
    ALLOW_LOGIN: true,
	APP_VERSION: '3.0.3'
}

// ToDo: needs to be replaced at some point with a CyclosHost object, similar to the config in DirectoryAPI
config.STAGE_SERVER	= 'https://'+config.STAGE_CONFIG.host	+'/cyclos/'+config.STAGE_CONFIG.network+'/api/'
config.DEV_SERVER 	= 'https://'+config.DEV_CONFIG.host		+'/'+config.STAGE_CONFIG.network+'/api/'
config.BASE_URL		= 'https://'+config.PROD_CONFIG.host	+'/cyclos/'+config.PROD_CONFIG.network+'/api/'

// ToDo: needs to also be able to use DEV_CONFIG
config.CURRENT_CONFIG = (config.FLAVOUR == 'release' ? config.PROD_CONFIG : config.STAGE_CONFIG)

export default config
