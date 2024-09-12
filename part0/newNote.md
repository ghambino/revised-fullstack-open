sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Writes note in text field
    User->>Browser: Clicks "Save" button
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note over Browser,Server: Form data: { note: "user's note content" }
    Server-->>Browser: HTTP 302 (URL redirect to /exampleapp/notes)
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML document
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: main.css
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: main.js
    Note over Browser: Browser starts executing main.js
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: [{ content: "HTML is easy", date: "2023-1-1" }, ..., { content: "user's note content", date: "2024-9-12" }]
    Note over Browser: Browser executes the event handler<br>that renders notes to display