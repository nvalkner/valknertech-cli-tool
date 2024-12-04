import { execSync } from "child_process";
import path from "path";
import { awsCheckLogin } from "./loginToAws.js";

// Definerer GITHUB_PATH
const GITHUB_PATH = process.env.GITHUB_PATH || "/Users/nicolaivalkner/Kode/";

async function docker() {
  try {
    await awsCheckLogin();
    // Endrer til ønsket katalog
    const dockerPath = path.join(
      GITHUB_PATH,
      "bygr-devops/docker-developer-mac"
    );
    process.chdir(dockerPath);

    // Kjører "git pull"
    execSync("git pull", { stdio: "inherit" });

    // Kjører "docker-compose pull"
    execSync("docker-compose pull", { stdio: "inherit" });

    // Kjører "docker-compose up -d"
    execSync("docker-compose up -d", { stdio: "inherit" });

    // Åpner Chrome til ønsket adresse
    execSync('open -a "Google Chrome" http://localhost:3000/cm', {
      stdio: "inherit",
    });

    // Går tilbake til opprinnelig katalog
    process.chdir(GITHUB_PATH);
  } catch (error) {
    console.error("Noe gikk galt:", error.message);
  }
}

(async () => {
  await docker();
})();
