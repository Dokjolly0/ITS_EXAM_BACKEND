// generate-api-module.ts

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Utility per rendere il nome file in kebab-case
const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Nome del modulo: ", (inputName) => {
  if (!inputName) {
    console.error("❌ Nome non valido.");
    rl.close();
    return;
  }

  const kebabName = toKebabCase(inputName);
  const folderPath = path.join(__dirname, "src", "api", kebabName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const baseFileName = kebabName;
  const files = [
    `${baseFileName}.dto.ts`,
    `${baseFileName}.router.ts`,
    `${baseFileName}.entity.ts`,
    `${baseFileName}.model.ts`,
    `${baseFileName}.service.ts`,
    `${baseFileName}.controller.ts`,
  ];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `// ${file}\n`);
      console.log(`✅ Creato: ${filePath}`);
    } else {
      console.log(`⚠️ Esiste già: ${filePath}`);
    }
  });

  console.log(`✅ Modulo "${kebabName}" creato con successo.`);
  rl.close();
});
