#!/bin/bash

prev_name="xenous"
prev_capitalized_name="Xenous"

name=$1
capitalized_name=$(echo "$name" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')

function rename_project {
    prev_ansi_name=$(pnpm dlx figlet "$prev_name" -f "ANSI Shadow" | sed '$d')
    ansi_name=$(pnpm dlx figlet "$name" -f "ANSI Shadow" | sed '$d')

    # Find and replace previos ansi name
    find . -type f -not -path '*/.git/*' -exec grep -l -z "$prev_ansi_name" {} + | while read -r file; do
        awk -i inplace -v old="$prev_ansi_name" -v new="$ansi_name" 'BEGIN {RS="^$"; ORS=""} {gsub(old, new)} 1' "$file"
    done

    # Find and replace previos lowercase name
    find . -type f -not -path '*/.git/*' -exec grep -l "$prev_name" {} + | while read -r file; do
        if [[ "$(uname)" = "Darwin" ]]; then
            sed -i '' "s/$prev_name/$name/g" "$file" # macOS requires empty extension for -i flag
        else
            sed -i "s/$prev_name/$name/g" "$file"
        fi
    done

    # Find and replace previous capitalized name
    find . -type f -not -path '*/.git/*' -exec grep -l "$prev_capitalized_name" {} + | while read -r file; do
        if [[ "$(uname)" = "Darwin" ]]; then
            sed -i '' "s/$prev_capitalized_name/$capitalized_name/g" "$file" # macOS requires empty extension for -i flag
        else
            sed -i "s/$prev_capitalized_name/$capitalized_name/g" "$file"
        fi
    done
}

function _spinner() {
    # $1 start/stop
    #
    # on start: $2 display message
    # on stop : $2 process exit status
    #           $3 spinner function pid (supplied from stop_spinner)

    case $1 in
    start)
        # calculate the column where spinner and status msg will be displayed
        let column=$(tput cols)-${#2}-8
        # display message and position the cursor in $column column
        echo -ne ${2}
        printf "%${column}s"

        # start spinner
        i=1
        sp='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
        delay=${SPINNER_DELAY:-0.15}

        while :; do
            printf "\b${sp:i++%${#sp}:1}"
            sleep $delay
        done
        ;;
    stop)
        if [[ -z ${3} ]]; then
            echo "spinner is not running.."
            exit 1
        fi

        kill $3 >/dev/null 2>&1

        # erase the spinner
        echo -e "\b  "
        ;;
    *)
        echo "invalid argument, try {start/stop}"
        exit 1
        ;;
    esac
}

function start_spinner {
    # $1 : msg to display
    _spinner "start" "${1}" &
    # set global spinner pid
    _sp_pid=$!
    disown
}

function stop_spinner {
    # $1 : command exit status
    _spinner "stop" $1 $_sp_pid
    unset _sp_pid
}

start_spinner "Renaming $prev_name to $name"
rename_project
stop_spinner $?
