const { exec, execSync } = require('child_process');

const name = process.argv[1];
const arg = process.argv[2] || 'patch';

if (!name) {
	throw new Error('Error: output path is required');
}

if (arg === 'patch' || arg === 'minor' || arg === 'major' || arg === 'preminor' || arg === 'premajor' || arg === 'prepatch' || arg === 'prerelease') {
	console.log('Deploy version:', arg);

	exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
		if (err) {
			throw new Error('Error: checking branch');
		}

		if (typeof stdout === 'string' && (stdout.trim() === 'main' && arg === 'patch' || arg === 'minor' || arg === 'major')) {
			execSync(`git pull && ng build ${name} && npm run lint`, { stdio: [0, 1, 2] });

			execSync(`cd projects/${name} && npm version ${arg} && cd ../..`, { stdio: [0, 1, 2] });

			execSync('git add . && git commit --amend --no-edit', { stdio: [0, 1, 2] });

			execSync('npm version ' + arg, { stdio: [0, 1, 2] });
		} else {
			throw new Error('Error: The branch used must be main');
		}
	});
} else {
	throw new Error('Error: semantic versioning not supported, use "major", "minor", "patch" or "premajor", "preminor", "prepatch" or "prerelease"');
}
