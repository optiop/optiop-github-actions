import core = require('@actions/core');
import github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);
    const context = github.context;

    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }

    const prBody = context.payload.pull_request.body || '';
    const regex = /notion\.so\/\w+-\d+/;

    if (!regex.test(prBody)) {
      core.setFailed('The PR body does not include a link \
        like notion.so/xxx-xxx.');
    } else {
      core.info('The PR body includes a valid Notion link.');
    } 
  } catch (error) {
      core.setFailed((error as Error).message);
  }
}

run();
