const fs = require('fs');
const path = require('path');

const arg = process.argv[2];
if (!arg) {
  console.error('O parâmetro está ausente');
  process.exit(1);
}
const distPath = path.join(__dirname, `dist/${arg}`);
const mainJsPattern = /^main\.[a-z0-9]+\.js$/;

function generateHeadersFile() {
	const headersContent = `# This is a comment
/assets/*
  Access-Control-Allow-Origin: *
  X-Robots-Tag: nosnippet`;

	fs.writeFile(path.join(distPath, '_headers'), headersContent, function (err) {
		if (err) throw err;
		console.log('Arquivo _headers salvo com sucesso!');
	});
}
// Função para renomear o arquivo main.*.js para main.js
function renameMainJs() {
	const files = fs.readdirSync(distPath);

	const mainJsFile = files.find(file => mainJsPattern.test(file));

	if (!mainJsFile) {
		console.error('Arquivo main.*.js não encontrado');
		process.exit(1);
	}

	const oldPath = path.join(distPath, mainJsFile);
	const newPath = path.join(distPath, 'main.js');

	fs.renameSync(oldPath, newPath);

	return mainJsFile;
}

// Função para atualizar o index.html
function updateIndexHtml(oldFileName) {
	const indexPath = path.join(distPath, 'index.html');
	let indexHtml = fs.readFileSync(indexPath, 'utf8');

	indexHtml = indexHtml.replace(oldFileName, 'main.js');

	fs.writeFileSync(indexPath, indexHtml);
}

// Executando as funções
generateHeadersFile();
const oldFileName = renameMainJs();
updateIndexHtml(oldFileName);

console.log('Renomeação e atualização do index.html concluídas com sucesso.');
