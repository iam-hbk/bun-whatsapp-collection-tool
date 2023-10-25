
# Crowdsourced WhatsApp Sentiment Analysis System Proposal
## Table of Contents

- [Objective](#objective)
- [Implementation](#implementation)
  - [Bun WhatsApp Integration](#1-nodejs-whatsapp-integration)
  - [Data Collection and Management](#2-data-collection-and-management)
  - [Language Identification and Sentiment Classification Process](#3-language-identification-and-sentiment-classification-process)
  - [Identification and Classification Verification](#4-identification-and-classification-verification)
  - [Data Storage](#5-data-storage)
  - [Automation](#6-automation)
  - [Privacy and Permissions](#7-privacy-and-permissions)
- [Dataflow Diagram](#dataflow-diagram)
- [Conclusion](#conclusion)

## Objective
The objective is to create a system that sends tweets in any of the 11 national languages of South Africa, sourced from a CSV file, to specific users for language identification and sentiment classification via WhatsApp. The users will identify the language of the tweet and classify its sentiment as "positive," "negative," or "neutral." This system will gather the language identifications and sentiment classifications, verify them for consensus, and subsequently store the results in a JSON format.

## Implementation

### 1. Bun WhatsApp Integration
- Utilize Twilio's API or a similar solution to integrate WhatsApp messaging capabilities into the Bun server.
- Ensure a robust system is in place to track and manage messaging due to the vast number of identifications and classifications required.

### 2. Data Collection and Management
- Assign unique identifiers to each tweet in the CSV to aid in correlating received identifications and classifications to their original messages.
- Implement rate limiting to ensure neither the server nor the users get overwhelmed. For instance, set a limit to the number of tweets sent per hour.

### 3. Language Identification and Sentiment Classification Process
- Dispatch each tweet to a specific group of users for language identification and sentiment classification.
- For redundancy and accuracy, send each tweet to multiple users (e.g., five users per tweet).
- Store all received identifications and classifications temporarily, pending verification.

### 4. Identification and Classification Verification
- Introduce a two-step verification process:
  - First, identifications and classifications are sourced from a primary group of users.
  - Subsequently, the received identifications and classifications are forwarded to a separate group of users who vote on or rate the most agreed-upon language and sentiment.
  
This method ensures that the identifications and classifications are verified by the community, enhancing accuracy.

### 5. Data Storage
- Preserve the approved identifications and classifications in a JSON format.
- Ensure that the server storage capacity is adequate given the expected volume.

### 6. Automation
- Due to the substantial volume of tweets, aim to automate as much of the process as possible, ranging from sending out tweets for identification and classification to collecting and storing the results.

### 7. Privacy and Permissions
- Secure the required permissions to send WhatsApp messages to the selected users.
- Notify users about the sentiment analysis project's objectives, ensuring their data remains anonymous and protected.
- Adhere to all relevant data protection and privacy norms.

## Dataflow Diagram

[![](https://mermaid.ink/img/pako:eNqFUstOwzAQ_JWVD5xauPcAahP6Ei2IoCIU92DibWuU2JG9oVRV_52NUyo4cYmc8c7MznqPonAaxUBsvap38JJKK-0wT7IVjE2JsDfE6B6Rwhr6_VsY5UsmXH8EyNB_ou8qXneKwrCuYWYJWYqMs2tpR5GSHJ8VITyYyhD6k7RJhNM8Q6s7cSAHT95Uyh9g4l1Tw8Z5mGm0ZDamiHpwBUmpQrgAbJBGpfs8I-cRXrCqnVfelAcw9vJ7gFSRelcB1226-8gZ52Pn98rr1jrDwln913yF_rfTOLImeeLKEguClSMMNxzM2G0A7u7_ZidRYnpMnA1oQxNgWOwMfqK-O7WNTfke3jDEstk5E-dYKP78RGiBefa4BG6_UrQ-05aum2mrM4vHeT5syHEJah6tKzCEmGuJX9QNnbnz7oFaluiJClnSaN6Go7QAUtAOK5RiwEeNG9WUJIW0Jy5VrJ0dbCEGG1UG7Imm1myVGsWvX11Q1IZTLLoVi5t2-gaNsNV1?type=png)](https://mermaid.live/edit#pako:eNqFUstOwzAQ_JWVD5xauPcAahP6Ei2IoCIU92DibWuU2JG9oVRV_52NUyo4cYmc8c7MznqPonAaxUBsvap38JJKK-0wT7IVjE2JsDfE6B6Rwhr6_VsY5UsmXH8EyNB_ou8qXneKwrCuYWYJWYqMs2tpR5GSHJ8VITyYyhD6k7RJhNM8Q6s7cSAHT95Uyh9g4l1Tw8Z5mGm0ZDamiHpwBUmpQrgAbJBGpfs8I-cRXrCqnVfelAcw9vJ7gFSRelcB1226-8gZ52Pn98rr1jrDwln913yF_rfTOLImeeLKEguClSMMNxzM2G0A7u7_ZidRYnpMnA1oQxNgWOwMfqK-O7WNTfke3jDEstk5E-dYKP78RGiBefa4BG6_UrQ-05aum2mrM4vHeT5syHEJah6tKzCEmGuJX9QNnbnz7oFaluiJClnSaN6Go7QAUtAOK5RiwEeNG9WUJIW0Jy5VrJ0dbCEGG1UG7Imm1myVGsWvX11Q1IZTLLoVi5t2-gaNsNV1)

## Conclusion
This project aims to effectively crowdsource the identification of the national language of South African tweets and classify their sentiment. By incorporating redundancy and a two-step verification process, we strive to achieve high accuracy in both language identification and sentiment classification. Automating the process ensures efficiency, and by respecting user privacy and permissions, we maintain ethical standards throughout the project.