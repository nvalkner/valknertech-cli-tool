import { promises as fs } from "fs";
import { exec } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Få brukerens hjemmekatalog
const HOME_DIR = process.env.HOME || process.env.USERPROFILE;

// Hent filplasseringen til modulen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Sjekker om AWS SSO er aktiv og logger inn hvis nødvendig.
 * @param {string} profile - AWS SSO-profilen som skal sjekkes (default: "bygr-developer")
 */
export async function awsCheckLogin(profile = "bygr-developer") {
  const cacheDir = join(HOME_DIR, ".aws", "sso", "cache");

  try {
    // Sjekk om cache-mappen eksisterer
    const cacheFiles = await fs.readdir(cacheDir);

    let loggedIn = false;

    // Sjekk hver fil i SSO-cache for gyldige tokens
    for (const file of cacheFiles) {
      const filePath = join(cacheDir, file);
      try {
        const data = JSON.parse(await fs.readFile(filePath, "utf8"));
        if (data.startUrl && data.accessToken) {
          loggedIn = true;
          break;
        }
      } catch {
        // Ignorer JSON-parsing feil
      }
    }

    if (loggedIn) {
      console.log(
        `Du er allerede logget inn på AWS SSO med profilen "${profile}".`
      );
    } else {
      console.log(
        `Ingen aktiv SSO-innlogging funnet for profilen "${profile}". Logger inn...`
      );
      await awsLogin(profile);
    }
  } catch (error) {
    console.log(`Ingen SSO-cache funnet eller feil oppstod: ${error.message}`);
    console.log("Logger inn...");
    await awsLogin(profile);
  }
}

/**
 * Logger inn på AWS SSO for en gitt profil.
 * @param {string} profile - AWS SSO-profilen som skal brukes
 */
async function awsLogin(profile) {
  return new Promise((resolve, reject) => {
    exec(`aws sso login --profile ${profile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Feil under innlogging: ${stderr}`);
        reject(error);
      } else {
        console.log(
          `Innlogging vellykket for profilen "${profile}": ${stdout}`
        );
        resolve(stdout);
      }
    });
  });
}

(async () => {
  await awsCheckLogin();
})();
