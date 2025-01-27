<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discord Automation Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            text-align: center;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        button {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
    <script>
        async function handleSubmit(event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form values
            const token = document.getElementById('token').value.trim();
            const channelIds = document.getElementById('channelIds').value.split(',').map(id => id.trim());
            const message = document.getElementById('message').value.trim();
            const delay = parseInt(document.getElementById('delay').value, 10);

            // Validate inputs
            if (!token || channelIds.length === 0 || !message || isNaN(delay) || delay <= 0) {
                alert("Please fill out all fields correctly.");
                return;
            }

            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token,
                        channelIds,
                        message,
                        delay,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.success);
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while sending messages.");
            }
        }

        window.onload = function() {
            document.getElementById('discordForm').addEventListener('submit', handleSubmit);
        };
    </script>
</head>
<body>

    <h1>Discord Automation Setup</h1>

    <form id="discordForm" action="/send-message" method="POST">
        <div class="form-group">
            <label for="token">Discord Bot Token:</label>
            <input type="text" id="token" name="token" required>
        </div>

        <div class="form-group">
            <label for="channelIds">Channel IDs (comma-separated):</label>
            <input type="text" id="channelIds" name="channelIds" required>
        </div>

        <div class="form-group">
            <label for="message">Message to Send:</label>
            <input type="text" id="message" name="message" required>
        </div>

        <div class="form-group">
            <label for="delay">Delay (in seconds):</label>
            <input type="number" id="delay" name="delay" min="1" required>
        </div>

        <button type="submit">Submit</button>
    </form>

</body>
</html>
