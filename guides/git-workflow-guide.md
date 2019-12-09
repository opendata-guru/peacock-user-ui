GIT Workflow
====================
Viaduct-UI is using the <i>Gitflow</i> as Git workflow.
<br> See this [Gitflow Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and [Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/) for detailed information. 

<img src="https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg?cdnVersion=kc" width="600px"/> 

<br><b>Project Prototypes</b>
<br>In addition to the gitflow structure, it is possible to add branches for specific project prototypes that contain changes and additions tailored for that project only. This should not be a long term solution. Preferably projects shall use their own repository. 
<br>
<br><b>Rules for Project branches</b> 
<br>1. Project branches should be created out of a master release.
<br>2. Project branches should use a short, identifying name (Project identifier).
<br>3. Subbranches of a Project branch must use the identifier as prefix (i.e. PID-my-branch)
<br>4. Never merge a Project branch into a Viaduct-UI core branch (master, develop, features..)
<br>

Project Scenario
====================
The following example represents the workflow for new projects using Viaduct-UI.

<br><b>Start</b>
<br>
<br><i>Viaduct-UI Repository</i>

    master
    └───develop
<br>1. Client-A wants to buy a Open Data Frontend solution and calls it Project-A
<br>2. Provider-A clones the Viaduct-UI repository
<br>3. Provider-A checks out a new Branch from `master` and calls it `PA` <i>(short for 'Project-A')</i>
<br>
<br><i>Viaduct-UI Repository</i>

    master
    ├───develop
    └───PA
<br>
<br>4. Provider-A Follows the setup guidelines in the Viaduct-UI `readme.md` file. <i>(copy config.sample.js, i18n.sample.js files etc.)</i>
<br>
<br><b>First Prototype</b>
<br>1. Client-A wants features Viaduct-UI currently does not support. A Like-Button and a comment function for every Dataset displayed.
<br>2. Provider-A checks out a new Branch from `PA` and calls it `PA-like-button`
<br>3. Provider-A checks out a new Branch from `PA` and calls it `PA-comment-function`
<br>
<br><i>Viaduct-UI Repository</i>

    master
    ├───develop
    └───PA
        ├───PA-like-button
        └───PA-comment-function
<br>4. Provider-A develops the like and comment functionalities in the respective branches. When finished Provider-A merges the branches `PA-like-button` and `PA-comment-function` back to `PA`
<br>
<br><i>Viaduct-UI Repository</i>

    master
    ├───develop
    └───PA

<br>5. Client-A likes the solution and wants to continue using Viaduct-UI long-term. Therefor will use a different repository than the Viaduct-UI, a special Project-A Repository.
<br>
<br><b>Outsourcing to own project repository</b>
<br>1. Provider-A creates a new Repository for Project-A
<br>2. Provider-A merges the current Viaduct-UI `PA` branch into some branch (i.e. 'master') of the new Project-A repository
<br>3. Provider-A deletes the `PA` branch in the Viaduct-UI repository. No specific Project-A branches shall be present in the Viaduct-UI repository afterwards.
<br>
<br><i>Viaduct-UI Repository</i>

    master
    └───develop
<br><i>Project-A Repository</i>

    master 
<br>
<br><b>Updating</b>
<br>1. Viaduct-UI Updated from v1.0.0 to 1.1.0 and supports a language selector as a new feature now
<br>2. Client-A wants to update the Viaduct-UI version they are using for Project-A to make use of the language selector feature.
<br>3. Provider-A finishes all yet unfinished features
<br>4. Provider-A checks out a new branch `update-viaduct-ui-v1.1.0` in the Project-A repository 
<br>5. Provider-A merges the `master` commit tagged with 'v1.1.0' of the Viaduct-UI repository into `update-viaduct-ui-v1.1.0` branch of the Project-A repository.
<br>
<br><i>Viaduct-UI Repository</i>

    master
    └───develop
<br><i>Project-A Repository</i>

    master
    └───update-viaduct-ui-v1.1.0
<br>6. Provider-A fixes merge conflicts if necessary
<br>7. Provider-A updates config files where necessary (new config fields, changed naming, changed data format)
<br>8. Provider-A merges `update-viaduct-ui-v1.1.0` into `master` in Project-A repository 
<br>9. Project-A is now using Viaduct-UI v1.1.0
<br>
<br><i>Viaduct-UI Repository</i>

    master
    └───develop
<br><i>Project-A Repository</i>
  
    master
