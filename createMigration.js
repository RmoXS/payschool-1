//? HOW TO USE THIS
//! npm run migration:create --name=MigrationName

const { exec } = require('child_process');

// Ambil nama migrasi dari environment variable npm_config_name
const migrationName = process.env.npm_config_name;

if (!migrationName) {
    console.error('Error: npm_config_name is not set.');
    process.exit(1);
}

// Jalankan perintah untuk membuat migration
const command = `npm run typeorm -- migration:create db/migrations/${migrationName}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});
