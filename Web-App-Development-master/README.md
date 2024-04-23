# Web Application Development (QHO540)

## This repository contains the projects and all related files built throughout the Web Application Development (QHO540) module

## Cloning the repository
### `git clone https://github.com/nezumiCodes/Web-App-Development.git`

<br>

## Cloning only one branch 
### `git clone --single-branch -b <branch_name> https://github.com/nezumiCodes/Web-App-Development.git`

<br>

## Checking the remote origin

### `git remote -v`

<br>

## Fetching changes from the remote repository

### `git fetch origin`

`git fetch` will retrieve any changes done to the remote repository, without merging them into your local repository.

<br>

## Fetching only one branch from the remote repository
### `git fetch origin <branch_name>`

<br>

## Switching between branches

### To local branch: `git checkout <local_branch>`
### To remote branch: `git checkout origin/<remote_branch>`

<br>

## Checking branch status and differences between local and remote braches

### `git status`
### `git diff <local_branch> origin/<remote_branch>`

<br>

## Merge changes into the local branch

### `git merge origin/<remote_branch>`