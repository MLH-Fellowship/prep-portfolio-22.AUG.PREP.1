const commitURL = 'https://api.github.com/repos/MLH-Fellowship/prep-portfolio-22.AUG.PREP.1/commits?per_page=100';
const prURL = 'https://api.github.com/repos/MLH-Fellowship/prep-portfolio-22.AUG.PREP.1/pulls?per_page=100&state=all';

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getFellowsContributions() {
    const commitData = await getData(commitURL);
    const prData = await getData(prURL);
    const contributions = commitData.reduce((acc, commit) => {
        const author = commit.author.html_url;
        if (!acc[author]) {
            acc[author] = {
                commits: 1,
                prs: 0,
            };
        }
        else {
            acc[author].commits++;
        }
        return acc;
    }, {});
    for (const pr of prData) {
        const author = pr.user.html_url;
        if (!contributions.hasOwnProperty(author)) {
            contributions[author] = {commits: 0, prs: 0};
        }
        contributions[author].prs++;
    }
    console.log(contributions)
    return contributions;
}

getFellowsContributions().then(contributions => {
    document.querySelectorAll('.fellow-data').forEach(fellow => {
        const githubURL = fellow.querySelector('.fa-github').href;
        let text;
        if (contributions[githubURL]) {
            text = `Commits: ${contributions[githubURL].commits} PR: ${contributions[githubURL].prs}`;
        } else {
            text = 'Commits: 0 PR: 0';
        }
        fellow.querySelector('.github-stats').innerText = text;
    })
});
