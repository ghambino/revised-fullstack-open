sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enters URL https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: HTML document
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: main.css
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>Browser: spa.js
    Note over Browser: Browser starts executing spa.js
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: [{ content: "HTML is easy", date: "2023-1-1" }, ...]
    Note over Browser: Browser executes the event handler<br>that renders notes to display
    Note over Browser: Browser sets up event handlers for<br>form submission and other interactions