# Find and Replace Tool

A modern, user-friendly find and replace tool built with Angular. This application allows users to easily search for and replace text within a document.

## Installation

1. Clone the repository: `git clone https://github.com/Rupam-Shil/find-and-replace.git`
2. Navigate to the project directory: `cd find-and-replace`
3. Install dependencies: `npm install | yarn`
4. Start the development server: `ng serve | yarn start`
5. Open your browser and navigate to `http://localhost:4200`

## Features

- Clean, intuitive user interface
- Real-time match counting
- Replace single occurrence
- Replace all occurrences
- Case-sensitive search
- Responsive design

## Technical Details

The application is structured into several components and services:

- `FindReplaceComponent`: Main UI component that handles user interactions
- `FindReplaceService`: Core service that implements find and replace logic
- `TextHighlightPipe`: Custom pipe for highlighting matched text

## Assumptions

1. The search is case-insensitive by default
2. Special characters in search terms are automatically escaped
3. Empty search terms are not processed
4. The tool works with plain text content
5. Matches are highlighted in real-time as users type

## Implementation Notes

- Uses Angular's standalone components for better modularity
- Implements reactive forms for better user input handling
- Utilizes regular expressions for text matching and replacement
- Includes error handling for special characters in search terms
