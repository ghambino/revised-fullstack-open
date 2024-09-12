sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Writes note in text field
    User->>Browser: Clicks "Save" button
    Note over Browser: preventDefault() called on submit event
    Note over Browser: JavaScript adds new note to notes list
    Note over Browser: JavaScript rerenders the note list on the page
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note over Browser,Server: JSON data: { content: "user's note content", date: "2024-09-12" }
    Server-->>Browser: HTTP 201 Created
    Note over Browser: JavaScript code logs success message to console