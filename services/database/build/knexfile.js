"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    client: "pg",
    connection: {
        database: process.env.DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.DB_ADDRESS,
        port: process.env.DB_PORT
    }
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map