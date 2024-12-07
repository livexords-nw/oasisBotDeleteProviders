import axios from "axios";
import fs from "fs";

async function readTokens(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data
      .split("\n")
      .map((token) => token.trim())
      .filter((token) => token.length > 0);A
  } catch (error) {
    console.error(`Error reading tokens from ${filePath}: ${error.message}`);
    return [];
  }
}

async function fetchProviderList(token) {
  const url =
    "https://api.oasis.ai/internal/providerList,providerList,providerPointsTimeseries,settingsProfile?batch=1";
  const input =
    "%7B%220%22%3A%7B%22json%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A10%2C%22sortBy%22%3A%22latest%22%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A10%2C%22sortBy%22%3A%22latest%22%7D%7D%2C%222%22%3A%7B%22json%22%3A%7B%22interval%22%3A%22week%22%7D%7D%2C%223%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D";
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(`${url}&input=${input}`, { headers });
    const results = response.data[0].result.data.json.results;
    return results.map((item) => item.id);
  } catch (error) {
    console.error(
      `Failed to fetch provider list: ${
        error.response ? error.response.status : error.message
      }`
    );
    return [];
  }
}

async function deleteProviderById(token, id) {
  const url = "https://api.oasis.ai/internal/providerDelete?batch=1";
  const payload = {
    0: { json: { id } },
  };
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log(`Deleted provider ID: ${id} - Status: ${response.status}`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to delete provider ID: ${id} - Error: ${
        error.response ? error.response.status : error.message
      }`
    );
    return null;
  }
}

export async function readAndDelete() {
  while (true) {
    try {
      const tokens = await readTokens("tokens.txt");
      if (tokens.length === 0) {
        console.log("No tokens found in tokens.txt.");
        break;
      }

      let providerFound = false;

      for (const token of tokens) {
        console.log(`Using token: ${token}`);

        const ids = await fetchProviderList(token);

        if (ids.length === 0) {
          console.log("No providers found to delete.");
          continue; 
        }

        providerFound = true;

        for (const id of ids) {
          console.log(`Attempting to delete provider ID: ${id}`);
          const result = await deleteProviderById(token, id);
          if (result) {
            console.log(`Successfully deleted provider ID: ${id}`);
          } else {
            console.log(`Failed to delete provider ID: ${id}`);
          }
        }
      }

      if (!providerFound) {
        console.log("No provider found to delete. Exiting...");
        break;
      }
    } catch (error) {
      console.error(`Error during operation: ${error.message}`);
    }
  }
}

if (import.meta.url === new URL(import.meta.url).href) {
  readAndDelete();
}
