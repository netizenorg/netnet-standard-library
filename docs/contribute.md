# contributors doc

If you'd like to contribute to this repository, below are the steps you should take to setup a local project as well as contribute any bug fixes, additions or other changes.

### setup
0. start by [fork our repo](https://github.com/netizenorg/netnet-standard-library/fork) this repo
1. then clone your fork `git clone https://github.com/[YOUR_USER_NAME]/netnet.studio.git`
2. then navigate into that directory `cd netnet-standard-library` and then pull the code from the sub-modules `npm run pull-modules`
3. then install dev dependencies `npm install`
3. lastly, setup a remote "upstream" to our repo: `git remote add upstream https://github.com/netizenorg/netnet-standard-library.git`

### development

0. before starting on a new feature it's always a good idea to run `git pull upstream main` to pull updates from our repo. Also, if/when any of the individual sub-module repositories have been updated, you can run `npm run update-modules` to update the local modules.
1. create a "feature" branch `git checkout -b [FEATURE-NAME]` for your contribution.
2. if you're adding a new sub-module, run `git submodule add [module-github-URL]`, and then include them in the `main.js` file, otherwise you can add simply add new properties or methods directly to the library in the `main.js` file.
3. as you work locally you can
  - use the `npm run build` command to create new builds of the library
  - use the `test.html` page to test your changes
  - use the `npm run lint` command to ensure you're conforming to our [coding style](https://standardjs.com/) before making any commits.
3. when you're ready, create a [PR](https://github.com/netizenorg/netnet-standard-library/pulls) *from* your `feature` branch and *into* our `main` branch.
4. Once your PR has been merged, clean things up before starting on another feature
```
git checkout main
git pull upstream main
git push origin --delete [FEATURE-NAME]
git branch --delete [FEATURE-NAME]
```
