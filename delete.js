import axios from "axios";
import fs from "fs";
import path from "path";
import chalk from "chalk";

// Utility for timestamped logs
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ~ ").slice(0, 19);
}

// Log utilities with timestamp, emoji, and colors
function logError(message) {
  console.error(
    `${chalk.red("❌")} [${chalk.gray(getTimestamp())}] ${chalk.red(
      "[ERROR]"
    )} ${message}`
  );
}

function logSuccess(message) {
  console.log(
    `${chalk.green("✅")} [${chalk.gray(getTimestamp())}] ${chalk.green(
      "[SUCCESS]"
    )} ${message}`
  );
}

function logInfo(message) {
  console.log(
    `${chalk.blue("ℹ️")} [${chalk.gray(getTimestamp())}] ${chalk.blue(
      "[INFO]"
    )} ${message}`
  );
}

// Reads tokens from a file and trims/validates them
async function readTokens(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    logInfo(`Reading tokens from: ${absolutePath}`);
    const data = fs.readFileSync(absolutePath, "utf-8");
    return data
      .split("\n")
      .map((token) => token.trim())
      .filter((token) => token.length > 0);
  } catch (error) {
    logError(`Unable to read tokens from ${filePath}: ${error.message}`);
    return [];
  }
}

// Fetches a list of provider IDs using the provided token
async function fetchProviderList(token) {
  const url = "https://api.oasis.ai/internal/provider/providers";
  const params = {
    limit: 5,
    offset: 0,
    sortBy: "latest",
  };
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  try {
    logInfo("Fetching provider list...");
    const response = await axios.get(url, { headers, params });
    const results = response.data.results || [];
    logSuccess(`Found ${results.length} providers.`);
    return results.map((item) => item.id);
  } catch (error) {
    const errorMsg =
      error.response && error.response.status
        ? `HTTP ${error.response.status}`
        : error.message;
    logError(`Failed to fetch provider list: ${errorMsg}`);
    return [];
  }
}

// Deletes a provider by its ID
async function deleteProviderById(token, id) {
  const url = `https://api.oasis.ai/internal/provider/?id=${id}`;
  const params = { id };
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  try {
    logInfo(`Deleting provider with ID: ${id}`);
    const response = await axios.delete(url, { headers, data: params });
    logSuccess(`Deleted provider ID: ${id} - HTTP Status: ${response.status}`);
    return true;
  } catch (error) {
    const errorMsg =
      error.response && error.response.status
        ? `HTTP ${error.response.status}`
        : error.message;
    logError(`Failed to delete provider ID: ${id} - Error: ${errorMsg}`);
    return false;
  }
}

// Main function to orchestrate reading tokens and deleting providers
export async function readAndDelete() {
  logInfo("Starting the token and provider deletion process...");

  while (true) {
    try {
      const tokens = await readTokens("tokens.txt");
      if (tokens.length === 0) {
        logInfo("No valid tokens found in tokens.txt. Exiting...");
        break;
      }

      let providersDeleted = false;

      for (const token of tokens) {
        logInfo(`Processing token: ${chalk.cyan(token)}`);

        const ids = await fetchProviderList(token);

        if (ids.length === 0) {
          logInfo("No providers found for this token.");
          continue;
        }

        for (const id of ids) {
          const success = await deleteProviderById(token, id);
          providersDeleted ||= success;
        }
      }

      if (!providersDeleted) {
        logInfo("No providers were deleted. Exiting...");
        break;
      }
    } catch (error) {
      logError(`An unexpected error occurred: ${error.message}`);
    }
  }

  logSuccess("Process completed successfully.");
}

// Entry point for standalone execution
if (import.meta.url === new URL(import.meta.url).href) {
  readAndDelete().catch((error) =>
    logError(`Critical failure: ${error.message}`)
  );
}
