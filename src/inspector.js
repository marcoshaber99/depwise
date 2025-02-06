// Require axios to make HTTP requests.
import axios from "axios";

/**
 * Fetch package metadata from the npm registry.
 *
 * @param {string} packageName - The name of the npm package.
 * @returns {Promise<Object>} - A promise that resolves with the package metadata.
 */
async function fetchPackageData(packageName) {
  // The npm registry URL for a given package.
  const registryUrl = `https://registry.npmjs.org/${packageName}`;

  try {
    // Axios makes a GET request to the registry URL.
    const response = await axios.get(registryUrl);
    // The registry returns a JSON object containing package metadata.
    return response.data;
  } catch (error) {
    // If there is an error (for example, package not found), log it and throw the error.
    console.error(
      `Error fetching data for package "${packageName}":`,
      error.message
    );
    throw error;
  }
}

/**
 * Fetch download statistics for a package for the last week.
 *
 * @param {string} packageName - The name of the npm package.
 * @returns {Promise<number|null>} - A promise that resolves with the number of downloads, or null on error.
 */
async function fetchDownloadStats(packageName) {
  // The npm downloads API endpoint for getting weekly downloads.
  const downloadsUrl = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;

  try {
    const response = await axios.get(downloadsUrl);
    // The API returns an object that includes a 'downloads' field.
    return response.data.downloads;
  } catch (error) {
    console.error(
      `Error fetching download stats for package "${packageName}":`,
      error.message
    );
    // We return null if downloads cannot be fetched.
    return null;
  }
}

/**
 * Inspect an npm package by fetching both metadata and download statistics,
 * then extracting key details.
 *
 * @param {string} packageName - The name of the npm package.
 * @returns {Promise<Object>} - A promise that resolves with an object containing package details.
 */
async function inspectPackage(packageName) {
  // Fetch the metadata from the npm registry.
  const metadata = await fetchPackageData(packageName);

  // Fetch the download statistics.
  const downloads = await fetchDownloadStats(packageName);

  // Extract the latest version using the 'dist-tags' property.
  const latestVersion = metadata["dist-tags"]
    ? metadata["dist-tags"].latest
    : "Unknown";

  // The release date for the latest version is stored in the 'time' object.
  const releaseTime = metadata.time ? metadata.time[latestVersion] : "Unknown";

  // Check if the latest version has a deprecation message.
  const deprecated =
    metadata.versions && metadata.versions[latestVersion]
      ? metadata.versions[latestVersion].deprecated || null
      : null;

  // Prepare default GitHub data.
  let githubData = { stars: "N/A", openIssues: "N/A", lastUpdated: "N/A" };

  // If a repository URL is provided in the metadata, try to fetch GitHub data.
  if (metadata.repository && metadata.repository.url) {
    try {
      githubData = await fetchGitHubData(metadata.repository.url);
    } catch (error) {
      // If an error occurs, githubData remains at its default values.
    }
  }

  // Return an object summarizing the package information, including GitHub data.
  return {
    name: packageName,
    latestVersion,
    releaseTime,
    downloads,
    deprecated,
    ...githubData, // Spread the GitHub data into the object.
  };
}

/**
 * Fetch GitHub repository data from the GitHub API.
 *
 * @param {string} repositoryUrl - The repository URL from the package metadata.
 * @returns {Promise<Object>} - An object containing stars, open issues, and last updated info.
 */
async function fetchGitHubData(repositoryUrl) {
  // Normalize the URL: remove "git+" prefix if present, and remove a trailing ".git".
  let normalizedUrl = repositoryUrl;
  if (normalizedUrl.startsWith("git+")) {
    normalizedUrl = normalizedUrl.slice(4);
  }
  if (normalizedUrl.endsWith(".git")) {
    normalizedUrl = normalizedUrl.slice(0, -4);
  }

  // Use a regex to extract the owner and repository name.
  // This regex looks for "github.com/owner/repo".
  const match = normalizedUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error(
      `Repository URL "${repositoryUrl}" is not a valid GitHub URL.`
    );
  }

  const owner = match[1];
  const repo = match[2];

  const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await axios.get(githubApiUrl);
    const { stargazers_count, open_issues_count, updated_at } = response.data;
    return {
      stars: stargazers_count,
      openIssues: open_issues_count,
      lastUpdated: updated_at,
    };
  } catch (error) {
    console.error(
      `Error fetching GitHub data for "${repositoryUrl}":`,
      error.message
    );
    // Return default values if fetching fails.
    return {
      stars: "N/A",
      openIssues: "N/A",
      lastUpdated: "N/A",
    };
  }
}

export {
  fetchPackageData,
  fetchDownloadStats,
  inspectPackage,
  fetchGitHubData,
};
