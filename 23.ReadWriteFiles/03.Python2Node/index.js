const { spawn } = require('child_process');

// Pass an argument to the Python script
const pythonProcess = spawn('python', ['script.py', 'Alice']);

// Capture Python script output
pythonProcess.stdout.on('data', (data) => {
  console.log(`Python says: ${data}`);
});

// Capture errors
pythonProcess.stderr.on('data', (data) => {
  console.error(`Python error: ${data}`);
});

// Detect when the Python script ends
pythonProcess.on('close', (code) => {
  console.log(`Python script finished with code ${code}`);
});
