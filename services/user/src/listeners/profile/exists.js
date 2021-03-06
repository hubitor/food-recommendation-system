const User = require('../../schemas/user');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ email }) =>
	new Promise((resolve) => {
		User.findOne({
			email,
		})
			.then((user) =>
				resolve({
					status: 200,
					data: {
						status: !!user,
						msg: user ? 'User already registered.' : 'User not found.',
					},
				})
			)
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'user_profile:exists_orchestrator',
		process,
	});
};

module.exports = method;
