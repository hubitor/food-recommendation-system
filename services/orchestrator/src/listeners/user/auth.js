const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ email, password }, ch) =>
	new Promise((resolve) => {
		rpcSend({
			ch,
			queue: 'user_profile:authEmail_orchestrator',
			data: { email, password },
		}).then((res) => {
			if (res.status === 200 || res.status === 400) resolve(res);
			else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
		});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_user:auth_api',
		process,
	});
};

module.exports = method;
