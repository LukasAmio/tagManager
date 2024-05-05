const config = {
    client: 'sqlite3',
    connection: {
        filename: 'src/db/prod.db'},
    migrations: {
        directory: './migrations'
    },
    useNullAsDefault: true
};

module.exports = config;