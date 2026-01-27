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
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 4 },
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              p: { xs: 2, sm: 4 },
              backdropFilter: "blur(20px)",
              bgcolor: darkMode
                ? "rgba(30, 30, 30, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              boxShadow: darkMode
                ? "0 20px 60px rgba(0, 0, 0, 0.5)"
                : "0 20px 60px rgba(0, 0, 0, 0.15)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              height: { xs: "90vh", sm: "85vh" },
              maxHeight: "900px",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    fontWeight={700}
                    sx={{
                      background: darkMode
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    MyHR Assistant
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    Your AI-Powered People Partner
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                  <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                    size="small"
                    sx={{
                      bgcolor: darkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
                {messages.length > 0 && (
                  <Tooltip title="Clear Chat">
                    <IconButton
                      onClick={handleClear}
                      size="small"
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      }}
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
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                mt: 2,
                mb: 2,
                pr: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: darkMode
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                  "&:hover": {
                    background: darkMode
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(0, 0, 0, 0.3)",
                  },
                },
              }}
            >
              {messages.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 3,
                    py: 4,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: { xs: 64, sm: 80 },
                      height: { xs: 64, sm: 80 },
                      mb: 2,
                    }}
                  >
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        width: "100%",
                        maxWidth: "500px",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textAlign: "center", mb: 1 }}
                      >
                        Try asking:
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {SUGGESTED_QUESTIONS.map((question, idx) => (
                          <Chip
                            key={idx}
                            label={question}
                            onClick={() => handleSuggestedQuestion(question)}
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                bgcolor: "primary.main",
                                color: "white",
                              },
                              transition: "all 0.2s",
                            }}
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
                        display="flex"
                        gap={1.5}
                        alignItems="flex-start"
                        flexDirection={
                          msg.role === "user" ? "row-reverse" : "row"
                        }
                        sx={{ maxWidth: { xs: "85%", sm: "75%" } }}
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              msg.role === "user"
                                ? "primary.main"
                                : darkMode
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.08)",
                            width: { xs: 32, sm: 36 },
                            height: { xs: 32, sm: 36 },
                            flexShrink: 0,
                          }}
                        >
                          {msg.role === "user" ? (
                            <PersonIcon fontSize="small" />
                          ) : (
                            <SmartToyIcon fontSize="small" />
                          )}
                        </Avatar>
                        <Box
                          sx={{
                            px: { xs: 2, sm: 2.5 },
                            py: { xs: 1.5, sm: 2 },
                            borderRadius: 4,
                            bgcolor:
                              msg.role === "user"
                                ? "primary.main"
                                : darkMode
                                ? "rgba(255, 255, 255, 0.08)"
                                : "rgba(0, 0, 0, 0.04)",
                            color:
                              msg.role === "user"
                                ? "#fff"
                                : "text.primary",
                            boxShadow:
                              msg.role === "user"
                                ? "0 4px 12px rgba(0, 122, 255, 0.25)"
                                : "0 2px 8px rgba(0,0,0,0.08)",
                            wordBreak: "break-word",
                            "& p": {
                              margin: 0,
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                              lineHeight: 1.6,
                            }}
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
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ mt: 1 }}
                >
                  <Box display="flex" gap={1.5} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.08)",
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                      }}
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                    <Box
                      sx={{
                        px: 2.5,
                        py: 2,
                        borderRadius: 4,
                        bgcolor: darkMode
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
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
            <Box
              display="flex"
              gap={1.5}
              sx={{
                flexShrink: 0,
                pt: 2,
                borderTop: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.02)",
                    "& fieldset": {
                      borderColor: darkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: darkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <Button
                onClick={handleSend}
                variant="contained"
                disabled={loading || !input.trim()}
                sx={{
                  minWidth: { xs: "auto", sm: "100px" },
                  px: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  "&:disabled": {
                    bgcolor: darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                  },
                }}
                endIcon={<SendIcon />}
              >
                <Box sx={{ display: { xs: "none", sm: "block" } }}>Send</Box>
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HrAssistant;
