# Daily Riverhouse Barn fetch from Darren's home connection.
#
# Riverhouse Barn refuses every request from cloud servers, so the 5am cloud
# events refresh cannot read it. This script fetches Riverhouse Barn from home,
# politely and under our own honest user agent, saves the pages to
# data/riverhouse-snapshot/ and pushes them to main. The cloud refresh then uses
# that snapshot (see docs/events-sources.md, Riverhouse Barn).
#
# Run it from a dedicated clone, not your working copy, so it never touches
# work in progress:
#   git clone https://github.com/waltononthames/walton-on-thames C:\walton-riverhouse-fetch
#
# Register it once (PowerShell, as yourself), to run daily at 04:10 and catch up
# when the computer next wakes if it was off:
#   $a = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-NoProfile -ExecutionPolicy Bypass -File "C:\walton-riverhouse-fetch\scripts\riverhouse-home-fetch.ps1"'
#   $t = New-ScheduledTaskTrigger -Daily -At 4:10am
#   $s = New-ScheduledTaskSettingsSet -StartWhenAvailable -WakeToRun
#   Register-ScheduledTask -TaskName 'Walton Riverhouse fetch' -Action $a -Trigger $t -Settings $s
#
# Test it by hand first:  Start-ScheduledTask 'Walton Riverhouse fetch'
# Log: %LOCALAPPDATA%\walton-riverhouse-fetch.log

$ErrorActionPreference = 'Stop'
$env:Path = "C:\nvm4w\nodejs;$env:Path"
$repo = Split-Path $PSScriptRoot -Parent
Set-Location $repo
Start-Transcript -Path (Join-Path $env:LOCALAPPDATA 'walton-riverhouse-fetch.log') -Append | Out-Null

try {
    $branch = (git rev-parse --abbrev-ref HEAD).Trim()
    if ($branch -ne 'main') { throw "This clone is on '$branch', not main. Use a dedicated clone." }
    if (git status --porcelain) { throw 'This clone has local changes. Use a dedicated clone.' }

    git pull --ff-only origin main
    if ($LASTEXITCODE) { throw 'git pull failed' }

    node scripts/fetch-event-sources.mjs --riverhouse-snapshot --no-state
    if ($LASTEXITCODE) { throw 'Riverhouse Barn could not be read from this connection either; snapshot not updated' }

    git add data/riverhouse-snapshot
    git diff --cached --quiet
    if ($LASTEXITCODE) {
        # [skip ci]: the snapshot is not part of the site, so no Cloudflare deploy is needed.
        git commit -m "Record Riverhouse Barn snapshot from home fetch [skip ci]"
        git push origin main
        if ($LASTEXITCODE) {
            # Main moved while we were fetching: rebase once and retry.
            git pull --rebase origin main
            git push origin main
            if ($LASTEXITCODE) { throw 'git push failed' }
        }
    }
    Write-Output "Done $(Get-Date -Format s)"
}
finally {
    Stop-Transcript | Out-Null
}
