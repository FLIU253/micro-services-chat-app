import config from 'config';
import { Express } from 'express';
import { getRepository, getConnection } from 'typeorm';
import dayjs from 'dayjs';
import User from '#root/db/entities/User';
import passwordCompareSync from '#root/helpers/passwordCompareSync';
import generateUUID from '#root/helpers/generateUUID';
import UserSession from '#root/db/entities/UserSession';

const USER_SESSION_EXPIRY_HOURS = <number>config.get('USER_SESSION_EXPIRY_HOURS');

const setupRoutes = (app: Express) => {
	const connection = getConnection();
	const userRepository = getRepository(User);

	app.post('/sessions', async (req, res, next) => {
		if (!req.body.username || !req.body.password) {
			return next(new Error('Invalid body!'));
		}

		try {
			const user: any = await userRepository.findOne(
				{
					where: {
						username: req.body.username,
					},
					select: [ 'id', 'passwordHash' ],
				}
				// {
				// 	select: [ 'id', 'passwordHash' ],
				// }
			);

			console.log('finding user: ');
			console.log(user);

			if (!user) return next(new Error('Invalid username!'));

			console.log('comparing passwords: ');

			console.log(typeof req.body.password);
			console.log(typeof user.passwordHash);

			if (!passwordCompareSync(req.body.password, user.passwordHash)) {
				return next(new Error('Invalid password!'));
			}

			console.log('passwords compared');

			const expiresAt = dayjs().add(USER_SESSION_EXPIRY_HOURS, 'hour').toISOString();

			const sessionToken = generateUUID();

			const userSession = {
				expiresAt,
				id: sessionToken,
				userId: user.id,
			};

			await connection.createQueryBuilder().insert().into(UserSession).values([ userSession ]).execute();

			return res.json(userSession);
		} catch (err) {
			return next(err);
		}
	});

	app.get('/users/:userId', async (req, res, next) => {
		try {
			const user = await userRepository.findOne(req.params.userId);

			if (!user) return next(new Error('Invalid user ID!'));

			return res.json(user);
		} catch (err) {
			return next(err);
		}
	});
};

export default setupRoutes;
