import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Slide,
  CssBaseline,
  Alert,
  IconButton,
  Tooltip,
  Fade,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./HrAssistant.css";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// Suggested questions for better UX
const SUGGESTED_QUESTIONS = [
  "What is our vacation policy?",
  "How do I request time off?",
  "What are the company benefits?",
  "How does the performance review work?",
];

const HrAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("hrAssistantMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to load messages:", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("hrAssistantMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!OPENAI_API_KEY) {
      setError(
        "Please set your OpenAI API key in the .env file as VITE_OPENAI_API_KEY"
      );
      return;
    }

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful HR assistant. Provide clear, concise, and professional answers about HR policies, benefits, time off, and other workplace questions. Be friendly and approachable.",
            },
            ...newMessages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `API Error: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response received.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message || "Failed to get response. Please try again.");
      setMessages(newMessages); // Keep user message even if API fails
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([]);
      localStorage.removeItem("hrAssistantMessages");
      setError(null);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#007aff",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f7fa",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    shape: {
      borderRadius: 12,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        className={`hr-assistant-container ${darkMode ? "dark-mode" : "light-mode"}`}
      >
        {/* Background Pattern */}
        <Box className="hr-assistant-background-pattern" />

        <Container 
          maxWidth={false}
          className="hr-assistant-inner-container"
          sx={{ 
            height: '100%',
            width: '100%',
            padding: 0,
            margin: 0
          }}
        >
          <Paper
            elevation={24}
            className={`hr-assistant-paper ${darkMode ? "dark-mode" : "light-mode"}`}
          >
            {/* Header */}
            <Box className="hr-assistant-header">
              <Box className="hr-assistant-header-left">
                <Avatar className="hr-assistant-avatar">
                  <SmartToyIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    className="hr-assistant-title"
                  >
                    MyHR Assistant
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="hr-assistant-subtitle"
                  >
                    Your AI-Powered People Partner
                  </Typography>
                </Box>
              </Box>
              <Box className="hr-assistant-header-actions">
                <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                  <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                    size="small"
                    className="hr-assistant-icon-button"
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
                {messages.length > 0 && (
                  <Tooltip title="Clear Chat">
                    <IconButton
                      onClick={handleClear}
                      size="small"
                      className="hr-assistant-icon-button"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>

            {/* Error Alert */}
            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  onClose={() => setError(null)}
                  className="hr-assistant-error-alert"
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Messages Area */}
            <Box className="hr-assistant-messages-container">
              {messages.length === 0 ? (
                <Box className="hr-assistant-welcome-container">
                  <Avatar className="hr-assistant-avatar-large">
                    <SmartToyIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    👋 Welcome! How can I help you today?
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ maxWidth: "500px" }}
                  >
                    Ask me anything about HR policies, benefits, time off, or
                    workplace questions.
                  </Typography>

                  {/* Suggested Questions */}
                  {messages.length === 0 && (
                    <Box className="hr-assistant-suggested-questions">
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className="hr-assistant-suggested-questions-label"
                      >
                        Try asking:
                      </Typography>
                      <Box className="hr-assistant-suggested-questions-list">
                        {SUGGESTED_QUESTIONS.map((question, idx) => (
                          <Chip
                            key={idx}
                            label={question}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="hr-assistant-chip"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                messages.map((msg, i) => (
                  <Slide
                    in
                    direction={msg.role === "user" ? "left" : "right"}
                    timeout={300}
                    key={i}
                  >
                    <Box
                      display="flex"
                      justifyContent={
                        msg.role === "user" ? "flex-end" : "flex-start"
                      }
                    >
                      <Box
                        className={`hr-assistant-message-container ${
                          msg.role === "user"
                            ? "hr-assistant-message-user"
                            : "hr-assistant-message-assistant"
                        }`}
                      >
                        <Avatar
                          className={`hr-assistant-avatar-message ${
                            msg.role === "user"
                              ? "hr-assistant-avatar-user"
                              : "hr-assistant-avatar-assistant"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <PersonIcon fontSize="small" />
                          ) : (
                            <SmartToyIcon fontSize="small" />
                          )}
                        </Avatar>
                        <Box
                          className={`hr-assistant-message-bubble ${
                            msg.role === "user"
                              ? "hr-assistant-message-bubble-user"
                              : "hr-assistant-message-bubble-assistant"
                          }`}
                        >
                          <Typography
                            variant="body2"
                            className="hr-assistant-message-text"
                          >
                            {msg.content}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Slide>
                ))
              )}
              {loading && (
                <Box className="hr-assistant-loading-container">
                  <Box display="flex" gap={1.5} alignItems="flex-start">
                    <Avatar
                      className="hr-assistant-avatar-message hr-assistant-avatar-assistant"
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                    <Box className="hr-assistant-loading-bubble">
                      <CircularProgress size={16} thickness={4} />
                      <Typography variant="body2" color="text.secondary">
                        Thinking...
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box className="hr-assistant-input-area">
              <TextField
                fullWidth
                placeholder="Ask about HR policies, benefits, time off..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                variant="outlined"
                disabled={loading}
                multiline
                maxRows={4}
                className="hr-assistant-input"
              />
              <Button
                onClick={handleSend}
                variant="contained"
                disabled={loading || !input.trim()}
                className="hr-assistant-send-button"
                endIcon={<SendIcon />}
              >
                <Box className="hr-assistant-send-button-text">Send</Box>
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HrAssistant;
