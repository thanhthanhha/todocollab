$backendDir = "backend"
$clientDir = "client"
$npmCmd = "npm start"

if ($args.Length -gt 0 -and $args[0] -eq "seed") {
    $npmCmd = "npm seed"
}

$backendProcess = Start-Process -NoNewWindow -PassThru -WorkingDirectory $backendDir -FilePath "cmd" -ArgumentList "/c $npmCmd" -RedirectStandardOutput "output.txt"
try {
    while ($true) {

        $output = Get-Content "output.txt" -Tail 1
        if ($output -like "*Connected to DB*" -or $output -like "*Database seeded*") {
            break
        }
        Start-Sleep -Milliseconds 500
    }

    if ($args[0] -ne "seed") {
        Write-Host "Backend is up!!"
        $clientProcess = Start-Process -NoNewWindow -WorkingDirectory $clientDir -FilePath "cmd" -ArgumentList "/c npm start"
    }


    # Register an event handler for script exit
    $jobCleanup = {
        if ($backendProcess-ne $null) {
            Stop-Process -Id $backendProcess.Id -Force
        }
        if ($clientProcess -ne $null) {
            Stop-Process -Id $clientProcess.Id -Force
        }
    }

    Register-EngineEvent -SourceIdentifier "CleanupProcesses" -EventName "Exiting" -Action $jobCleanup
    while ($true) {
        # Keep the script running until interrupted
        Start-Sleep -Seconds 1
    }
}
catch [System.Management.Automation.PSInvalidOperationException] {
    # Handle Keyboard Interrupt (Ctrl+C) gracefully
    Write-Host "Keyboard Interrupt received. Exiting gracefully."
}