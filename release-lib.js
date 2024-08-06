const { exec, execSync } = require('child_process');

const name = process.argv[2];
const arg = process.argv[3] || 'patch';

console.log(name, arg);

if (!name) {
	throw new Error('Error: name is required');
}

if (arg === 'patch' || arg === 'minor' || arg === 'major' || arg === 'preminor' || arg === 'premajor' || arg === 'prepatch' || arg === 'prerelease') {
	console.log('Deploy version:', arg);
	execSync(`git pull && npm run lint`, { stdio: [0, 1, 2] });

	execSync(`cd projects/${name} && npm version ${arg} && cd ../..`, { stdio: [0, 1, 2] });

	execSync('git add . && git commit --amend --no-edit', { stdio: [0, 1, 2] });

	execSync('npm version ' + arg, { stdio: [0, 1, 2] });
} else {
	throw new Error('Error: semantic versioning not supported, use "major", "minor", "patch" or "premajor", "preminor", "prepatch" or "prerelease"');
}
