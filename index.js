const github = require("@actions/github");
const core = require("@actions/core");
const graphql = require("@octokit/graphql");
const actions = require("@jestaubach/actions");

async function run() {
  const myToken = process.env.ACTION_TOKEN ? process.env.ACTION_TOKEN : core.getInput("action-token");
  const boards = process.env.BOARDS ? process.env.BOARDS : core.getInput("boards");
  const octokit = new github.GitHub(myToken);
  const context = github.context;
  
  console.log(
    `>> Action triggered by issue #${context.issue.number}\n`,
    `   << Create project boards.`
  );
  await actions.githubProjects.createOnceBoards(octokit, context, { boards });
}

run()
  .then(
    (response) => { console.log(`Finished running: ${response}`); },
    (error) => { 
      console.log(`#ERROR# ${error}`);
      process.exit(1); 
    }
  );
