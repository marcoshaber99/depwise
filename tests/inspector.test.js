// tests/inspector.test.js

import axios from "axios";
import {
  fetchPackageData,
  fetchDownloadStats,
  inspectPackage,
  fetchGitHubData,
} from "../src/inspector.js";

// Jest automatically hoists mocks to the top of the module.
// We'll mock axios so our tests don’t perform real HTTP calls.
jest.mock("axios");

describe("fetchPackageData", () => {
  it("should return package metadata when given a valid package name", async () => {
    const fakeData = {
      "dist-tags": { latest: "1.0.0" },
      time: { "1.0.0": "2023-01-01T00:00:00.000Z" },
      versions: { "1.0.0": {} },
    };
    axios.get.mockResolvedValue({ data: fakeData });

    const data = await fetchPackageData("fake-package");
    expect(data).toEqual(fakeData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://registry.npmjs.org/fake-package"
    );
  });
});

describe("fetchDownloadStats", () => {
  it("should return download count when API call is successful", async () => {
    axios.get.mockResolvedValue({ data: { downloads: 12345 } });
    const downloads = await fetchDownloadStats("fake-package");
    expect(downloads).toBe(12345);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.npmjs.org/downloads/point/last-week/fake-package"
    );
  });
});

describe("inspectPackage", () => {
  it("should return a summary object with expected keys", async () => {
    // Prepare fake responses for both metadata and download stats.
    const fakeMetadata = {
      "dist-tags": { latest: "1.0.0" },
      time: { "1.0.0": "2023-01-01T00:00:00.000Z" },
      versions: { "1.0.0": {} },
      repository: { url: "https://github.com/fakeOwner/fakeRepo.git" },
    };
    const fakeDownloads = { downloads: 1000 };
    // Fake GitHub data
    const fakeGitHubData = {
      stars: 500,
      openIssues: 10,
      lastUpdated: "2023-01-15T00:00:00.000Z",
    };

    axios.get.mockImplementation((url) => {
      if (url.startsWith("https://registry.npmjs.org")) {
        return Promise.resolve({ data: fakeMetadata });
      } else if (url.startsWith("https://api.npmjs.org/downloads")) {
        return Promise.resolve({ data: fakeDownloads });
      } else if (url.startsWith("https://api.github.com/repos")) {
        return Promise.resolve({
          data: {
            stargazers_count: fakeGitHubData.stars,
            open_issues_count: fakeGitHubData.openIssues,
            updated_at: fakeGitHubData.lastUpdated,
          },
        });
      }
    });

    const summary = await inspectPackage("fake-package");
    expect(summary).toMatchObject({
      name: "fake-package",
      latestVersion: "1.0.0",
      releaseTime: "2023-01-01T00:00:00.000Z",
      downloads: 1000,
      deprecated: null,
      stars: fakeGitHubData.stars,
      openIssues: fakeGitHubData.openIssues,
      lastUpdated: fakeGitHubData.lastUpdated,
    });
  });
});
