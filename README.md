# EmailWriter
Smart Email Assistant streamlines your inbox with AI-generated replies powered by Google’s Gemini API. Built with a Java Spring Boot backend, React frontend, and a Chrome extension, it supports multiple tones (professional, casual, humorous, and more), reducing drafting time by ~50%. Prompt-engineering tweaks and fast parsing keep responses accurate and under 2 seconds.


## Development Stack

| Category      | Technologies |
| :--          | :-- |
| **Frontend** | ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) ![CSS](https://img.shields.io/badge/CSS-000000?style=for-the-badge&logo=css3&logoColor=white) |
| **Backend**  | ![Java](https://img.shields.io/badge/Java-ED8B00.svg?style=for-the-badge&logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white) |
| **API** | ![Google Gemini](https://img.shields.io/badge/Gemini-8E75FF.svg?style=for-the-badge&logo=googlegemini&logoColor=white) |

## Quick Start

1. Start server:
    ```bash
    ./mvnw spring-boot:run
    (requires GEMINI_API_KEY)
    ```
2. For the front-end:
    ```bash
    npm install
    npm run dev
    ```
3. For the Chrome extension:
    ```bash
    Unload extension pack in chrome developer extensions.
    ```

## Links to detailed guides:
- [Backend](https://github.com/ayeshaArif6/EmailWriter/tree/main/email-writer-sb/README.md)
- [Frontend](https://github.com/ayeshaArif6/EmailWriter/tree/main/email-writer-react/README.md)
- [Extension](https://github.com/ayeshaArif6/EmailWriter/blob/main/Email-writer-ext/README.md)

