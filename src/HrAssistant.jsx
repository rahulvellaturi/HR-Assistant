import React, { useState } from "react";
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
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";



const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

const HrAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        //Input tokens: $0.100 / 1M tokens
        //Cached Input tokens: $0.025 / 1M tokens
        //Output tokens: $0.400 / 1M tokens

        
        //model: "gpt-4.1-mini",
        // Input tokens: $0.40 / 1M tokens
        // Cached Input tokens: $0.10 / 1M tokens
        // Output: $1.60 / 1M tokens

        // model: "gpt-3.5-turbo", 
        // Input tokens: $0.0005 per 1K tokens.
        //Output tokens: $0.0015 per 1K tokens. 
        messages: newMessages,
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";
    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f2f5, #dce3ec)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              borderRadius: 6,
              p: 4,
              backdropFilter: "blur(12px)",
              bgcolor: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight={600}
              gutterBottom
            >
              🌟 MyHR — Your AI-Powered People Partner
            </Typography>

            <Box
              sx={{
                height: "60vh",
                overflowY: "auto",
                mt: 3,
                mb: 2,
                pr: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {messages.length === 0 ? (
                <Typography
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 6 }}
                >
                  Ask me anything about HR — policies, benefits, or time off.
                </Typography>
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
                        gap={1}
                        alignItems="flex-end"
                        flexDirection={
                          msg.role === "user" ? "row-reverse" : "row"
                        }
                      >
                        <Avatar
                          sx={{
                            bgcolor: msg.role === "user" ? "#007aff" : "#ccc",
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
                            px: 2,
                            py: 1.5,
                            borderRadius: 4,
                            bgcolor:
                              msg.role === "user" ? "#007aff" : "#f1f3f5",
                            color: msg.role === "user" ? "#fff" : "#000",
                            boxShadow:
                              msg.role === "user"
                                ? "0 4px 12px rgba(0, 122, 255, 0.2)"
                                : "0 2px 6px rgba(0,0,0,0.05)",
                            maxWidth: "70%",
                          }}
                        >
                          <Typography variant="body2">{msg.content}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Slide>
                ))
              )}
              {loading && (
                <Box textAlign="center" mt={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#f1f3f5",
                      width: 32,
                      height: 32,
                      mx: "auto",
                      color: "#555",
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <span className="dot-typing" />
                  </Typography>
                </Box>
              )}
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                variant="outlined"
                sx={{ borderRadius: 3, bgcolor: "#fff" }}
              />
              <Button
                onClick={handleSend}
                variant="contained"
                sx={{
                  px: 4,
                  borderRadius: 3,
                  fontWeight: 600,
                  bgcolor: "#007aff",
                  "&:hover": { bgcolor: "#0059c0" },
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HrAssistant;
