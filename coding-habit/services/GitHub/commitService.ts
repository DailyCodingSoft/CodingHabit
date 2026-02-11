import { Octokit } from "octokit";

const octotik = new Octokit(); //usemos primero octokit sin autenticacion para probar
// despues la idea es usar github app para que el usuario de permisos de lectura.
//aunque es mejor si los repos son publicos siempre, mas facil.

//the idea here is to get the commits from yesterday so that
//the app can know if the user break the streak.
//this call is supposed to be done only once per user if
//the response is that he break streak  
export async function getCommits(owner:string, repo:string, since:string, commiter:string) {
    return await octotik.request(`GET /repos/{owner}/{repo}/commits
                                 ?since=${since}&commiter=${commiter}`, {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}