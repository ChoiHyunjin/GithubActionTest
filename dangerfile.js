/**
 *
 * To test Danger during development, run yarn in this directory, then run:
 * $ yarn danger pr <URL to GitHub PR>
 *
 */
import { danger, fail, message, warn } from 'danger';
import { stripIndents } from 'common-tags';
import jiraIssue from 'danger-plugin-jira-issue';
import * as fs from 'fs';
import { includes } from 'lodash';

// Setup
// const github = danger.github;
// const pr = github.pr;
// const commits = github.commits;
const modifiedFiles = danger.git.modified_files;
// const createdFiles = danger.git.created_files;
// const deletedFiles = danger.git.deleted_files;
// const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Rules

// Links related JIRA issue
jiraIssue({
  key: 'RS',
  url: 'https://radish.atlassian.net/browse',
  emoji: ':paperclip:',
  location: 'branch', // Optional location, either 'title' or 'branch'
});

// Report type errors
if (fs.existsSync('ts-compile-output.log')) {
  const tsCompileOutput = fs.readFileSync('ts-compile-output.log').toString();

  if (includes(tsCompileOutput, 'error')) {
    fail(stripIndents`
      There are compile errors:
      <br/><br/>

      ${tsCompileOutput}

      Please fix the reported compile errors.
    `);
  } else {
    message(':white_check_mark: TS compile passed');
  }
} else {
  warn("Couldn't read ts compilation results file");
}

// Report eslint errors
if (fs.existsSync('eslint-output.log')) {
  const eslintOutput = fs.readFileSync('eslint-output.log').toString();

  if (includes(eslintOutput, 'problems')) {
    fail(eslintOutput);
  } else {
    message(':white_check_mark: ESLint passed');
  }
} else {
  warn("Couldn't read ESLint results file");
}

if (fs.existsSync('cyclic-import-output.log')) {
  const cyclicImportOutput = fs.readFileSync('cyclic-import-output.log').toString();

  if (includes(cyclicImportOutput, '✖')) {
    fail(cyclicImportOutput.split('\n').slice(3).join('\n'));
  } else {
    message(':white_check_mark: No circular dependency found');
  }
} else {
  warn("Couldn't read ESLint results file");
}

// Tags big PRs
const bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  const title = ':exclamation: Big PR';
  const idea = `This PR is extremely unlikely to get reviewed because it touches ${
    danger.github.pr.additions + danger.github.pr.deletions
  } lines.`;
  warn(`${title} - <i>${idea}</i>`);
}

// Warns if there are changes to package.json, and tags the team.
const packageChanged = includes(modifiedFiles, 'package.json');
if (packageChanged) {
  const title = ':lock: package.json';
  const idea = 'Changes were made to package.json. Please let all members know.';
  warn(`${title} - <i>${idea}</i>`);
}
