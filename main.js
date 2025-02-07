const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');

const printerName = document.createElement('div');
printerName.textContent = `Name: ${obj.name}`;

document.body.appendChild(printerName);