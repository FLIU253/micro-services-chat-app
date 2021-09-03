//by adding the types, it allows you to do any key that is a string i.e. cache.a="test"
const cache: { [key: string]: string } = {};

const accessEnv = (key: string, defaultValue: string) => {
	if (!(key in process.env) || typeof process.env[key] === undefined) {
		if (defaultValue) return defaultValue;
		throw new Error(`${key} not found in process.env!`);
	}

	if (!(key in cache)) {
		cache[key] = <string>process.env[key];
	}

	return cache[key];
};

export default accessEnv;
