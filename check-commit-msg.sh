#!/usr/bin/env bash
local_commit_msg="$(git log -1 --pretty=%B)"

valid_branch_regex='(#[0-9]+ \[(fix|feat|chore|style|perf|build|refactor|test|docs)+\] - [a-zA-Z])'

message="There is something wrong with your commit. Branch names in this project must adhere to this agreement: $valid_branch_regex. Your commit will be rejected. You should rename your commit to a valid name and try again."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    tput setaf 1; echo "$message"
    tput sgr0
    exit 1
fi
tput setaf 2; echo "Correct commit message!"
tput sgr0
exit 0
