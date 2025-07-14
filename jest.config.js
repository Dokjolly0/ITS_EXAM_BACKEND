/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // oppure adatta al tuo percorso
  setupFiles: ["dotenv/config"], // carica le variabili env
};
