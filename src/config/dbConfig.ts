import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  "type": "sqlite",
  "database": "./data/library_management.sqlite",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entities/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"]
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })