import knex from "knex";
import path from "path";
import { attachPaginate } from "knex-paginate";

attachPaginate();

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default connection;
