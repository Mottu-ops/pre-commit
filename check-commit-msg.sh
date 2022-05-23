#!/usr/bin/env bash

local_commit=$1
valid_commit_regex='(#[0-9]+ \[(fix|feat|chore|style|perf|build|refactor|test|docs)+\] - [a-zA-Z])'

message="There is something wrong with your commit $local_commit. Commits in this project must adhere to this agreement: $valid_commit_regex. Your commit will be rejected. You should rename your commit to a valid name and try again."


if ! grep -iqE "$valid_commit_regex" "$local_commit"; then
    tput setaf 1;
    echo "$message" >&2
    tput sgr0
    exit 1
fi
