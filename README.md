# MyHR - AI-Powered HR Assistant

A modern, responsive web application that provides an AI-powered HR assistant to help answer questions about HR policies, benefits, time off, and other workplace-related queries.

## Features

✨ **Modern UI/UX**
- Beautiful, responsive design that works on all devices
- Dark mode support
- Smooth animations and transitions
- Gradient backgrounds and glassmorphism effects

🤖 **AI-Powered**
- Powered by OpenAI's GPT-3.5-turbo model
- Context-aware conversations
- Professional HR-focused responses

💾 **Smart Features**
- Message persistence using localStorage
- Suggested questions for quick start
- Error handling with user-friendly messages
- Auto-scrolling chat interface
- Clear chat functionality

📱 **Fully Responsive**
- Optimized for mobile, tablet, and desktop
- Touch-friendly interface
- Adaptive layouts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd HR-Assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Project Structure

```
HR-Assistant/
├── src/
│   ├── HrAssistant.jsx    # Main HR Assistant component
│   ├── App.jsx             # Root App component
│   ├── main.jsx            # Application entry point
│   ├── App.css             # App-specific styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Usage

1. **Set up your API key**: Add your OpenAI API key to the `.env` file
2. **Start chatting**: Type your HR-related questions in the input field
3. **Use suggested questions**: Click on the suggested question chips to quickly ask common questions
4. **Toggle dark mode**: Use the theme toggle button in the header
5. **Clear chat**: Use the delete button to clear all messages

## Technologies Used

- **React 19** - UI framework
- **Material-UI (MUI) v7** - Component library
- **Vite** - Build tool and dev server
- **OpenAI API** - AI chat completions
- **Emotion** - CSS-in-JS styling

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key (required) |

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints optimized for all screen sizes
- Touch-optimized controls

### Error Handling
- Graceful API error handling
- User-friendly error messages
- Network error detection

### Message Persistence
- Messages are automatically saved to localStorage
- Persists across page refreshes
- Easy to clear when needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.
