#!/usr/bin/env bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex='^((feature|bug|us|hotfix|release|issue|poc|task)\/[0-9\-]+)|(main)|(develop)$'

message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex. Your commit will be rejected. You should rename your branch to a valid name and try again."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    tput setaf 1; echo "$message"
    tput sgr0
    exit 1
fi
tput setaf 2; echo "Correct branch name!"
tput sgr0
exit 0
