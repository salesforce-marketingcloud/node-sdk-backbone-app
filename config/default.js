module.exports = {
	port: 5000,
	ui: {
		publicDir: '/public-optimized',
		staticBase: '/',
		bowerBase: '/bower_components'
	},
	redis: {
		useVCAP: true,
		host: '127.0.0.1',
		port: 6379
	},
	auth: {
		clientId: '', //get this from App Center
		clientSecret: '', //get this from App Center
		stack: '' //whatever stack your account is linked to, like S1	
	},
	fuelConfigs: {
		S1: {
			appId: '',
			clientId: '',
			clientSecret: '',
			appSignature: '',
			
			authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1',
			legacyRestHost: 'mc.s1.exacttarget.com',
			fuelapiRestHost: 'www.exacttargetapis.com',
			baseUrl: 'http://mc.s1.exacttarget.com/rest/',
			soap: {
				hostname: 'webservice.exacttarget.com',
				path: '/Service.asmx',
				port: '443'
			}		
		}
	},
	csrfFreeRoutes: {
		'/login': true
	}
};
