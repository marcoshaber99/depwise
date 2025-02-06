#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import Table from "cli-table3";

// import the inspectPackage function from inspector.js
import { inspectPackage } from "./inspector.js";

// Set up the program metadata
program
  .version("1.0.0")
  .description("CLI tool for evaluating npm package health");

// Define the expected arguments: one or more package names
program
  .argument("<packages...>", "List of npm packages to inspect")
  .action(async (packages) => {
    // Inform the user that data fetching is in progress.
    console.log(chalk.blue("Fetching package data...\n"));

    try {
      // Use Promise.all to run inspectPackage on all packages concurrently.
      const results = await Promise.all(
        packages.map((pkg) => inspectPackage(pkg))
      );

      // Create a new table with headers. We use chalk to bold the header text.
      const table = new Table({
        head: [
          chalk.bold("Package"),
          chalk.bold("Latest Version"),
          chalk.bold("Release Time"),
          chalk.bold("Downloads"),
          chalk.bold("Deprecated"),
          chalk.bold("Stars"),
          chalk.bold("Open Issues"),
          chalk.bold("Last Updated"),
        ],
        wordWrap: true,
      });

      // Loop over the results and add each as a row in the table.
      results.forEach((result) => {
        table.push([
          result.name,
          result.latestVersion,
          result.releaseTime,
          result.downloads !== null ? result.downloads.toLocaleString() : "N/A",
          result.deprecated
            ? chalk.red(result.deprecated)
            : chalk.green("None"),
          result.stars !== "N/A" ? result.stars.toLocaleString() : "N/A",
          result.openIssues !== "N/A"
            ? result.openIssues.toLocaleString()
            : "N/A",
          result.lastUpdated,
        ]);
      });

      // Display the formatted table in the terminal.
      console.log(table.toString());
    } catch (error) {
      // If there was an error while fetching data, print an error message.
      console.error(chalk.red("Error inspecting packages:"), error);
    }
  });

// Parse the command-line arguments.
program.parse(process.argv);
