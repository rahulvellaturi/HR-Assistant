/* eslint-disable no-undef */
// import "regenerator-runtime/runtime"; // Import for async/await support
// import { JSDOM } from "jsdom";
// //Add this line
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import HrAssistant from "./HrAssistant"; // Adjust the path if necessary
// import {} from "@testing-library/jest-dom";
// import fetchMock from "jest-fetch-mock";
// // Mock the fetch API globally
// global.fetch = fetchMock;
// describe("HrAssistant Component", () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     fetchMock.resetMocks();
//   });
//   // Helper function to simulate a successful API response
//   const mockSuccessfulFetch = (response: string) => {
//     fetchMock.mockResponse(
//       JSON.stringify({
//         choices: [
//           {
//             message: {
//               content: response,
//             },
//           },
//         ],
//       })
//     );
//   };
//   // Helper function to simulate an API error
//   const mockFailedFetch = () => {
//     fetchMock.mockReject(new Error("Failed to fetch"));
//   };
//   it("should render without crashing", () => {
//     render(<HrAssistant />);
//   });
//   it("should display the title and initial message", () => {
//     render(<HrAssistant />);
//     expect(screen.getByText(/MyHR/i)).toBeInTheDocument();
//     expect(screen.getByText(/Ask me anything about HR/i)).toBeInTheDocument();
//   });
//   it("should allow the user to type a question", () => {
//     render(<HrAssistant />);
//     const inputElement = screen.getByPlaceholderText(/Type your question/i);
//     fireEvent.change(inputElement, {
//       target: { value: "What is the holiday policy?" },
//     });
//     expect(inputElement.value).toBe("What is the holiday policy?");
//   });
//   it("should send a message on Enter key press", async () => {
//     render(<HrAssistant />);
//     const inputElement = screen.getByPlaceholderText(/Type your question/i);
//     const sendButton = screen.getByText(/Send/i);
//     mockSuccessfulFetch("The holiday policy is... ");
//     fireEvent.change(inputElement, {
//       target: { value: "What is the holiday policy?" },
//     });
//     fireEvent.keyDown(inputElement, { key: "Enter" });
//     await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
//     expect(fetchMock).toHaveBeenCalledWith(
//       "https://api.openai.com/v1/chat/completions",
//       expect.objectContaining({
//         method: "POST",
//         body: expect.stringContaining("What is the holiday policy?"),
//       })
//     );
//     await waitFor(() =>
//       expect(screen.getByText(/The holiday policy is.../i)).toBeInTheDocument()
//     );
//   });
//   it("should send a message on Send button click", async () => {
//     render(<HrAssistant />);
//     const inputElement = screen.getByPlaceholderText(/Type your question/i);
//     const sendButton = screen.getByText(/Send/i);
//     mockSuccessfulFetch("Our benefits package includes...");

//     fireEvent.change(inputElement, {
//       target: { value: "What benefits are offered?" },
//     });

//     fireEvent.click(sendButton);

//     await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

//     expect(fetchMock).toHaveBeenCalledWith(
//       "https://api.openai.com/v1/chat/completions",

//       expect.objectContaining({
//         method: "POST",

//         body: expect.stringContaining("What benefits are offered?"),
//       })
//     );

//     await waitFor(() =>
//       expect(
//         screen.getByText(/Our benefits package includes.../i)
//       ).toBeInTheDocument()
//     );
//   });

//   it("should display the user message", async () => {
//     render(<HrAssistant />);

//     const inputElement = screen.getByPlaceholderText(/Type your question/i);

//     const sendButton = screen.getByText(/Send/i);

//     mockSuccessfulFetch("okay");

//     fireEvent.change(inputElement, { target: { value: "Hello" } });

//     fireEvent.click(sendButton);

//     await waitFor(() => expect(screen.getByText(/Hello/i)).toBeInTheDocument());
//   });

//   it("should display the assistant response", async () => {
//     render(<HrAssistant />);

//     const inputElement = screen.getByPlaceholderText(/Type your question/i);

//     const sendButton = screen.getByText(/Send/i);

//     mockSuccessfulFetch("This is a response from the assistant.");

//     fireEvent.change(inputElement, { target: { value: "Tell me something." } });

//     fireEvent.click(sendButton);

//     await waitFor(() =>
//       expect(
//         screen.getByText(/This is a response from the assistant./i)
//       ).toBeInTheDocument()
//     );
//   });

//   it("should handle API errors gracefully", async () => {
//     render(<HrAssistant />);

//     const inputElement = screen.getByPlaceholderText(/Type your question/i);

//     const sendButton = screen.getByText(/Send/i);

//     mockFailedFetch();

//     fireEvent.change(inputElement, {
//       target: { value: "What happens if there is an error?" },
//     });

//     fireEvent.click(sendButton);

//     await waitFor(() =>
//       expect(screen.getByText(/No response./i)).toBeInTheDocument()
//     );
//   });

//   it("should display a loading indicator while waiting for a response", async () => {
//     render(<HrAssistant />);

//     const inputElement = screen.getByPlaceholderText(/Type your question/i);

//     const sendButton = screen.getByText(/Send/i);

//     // Simulate a delayed response

//     fetchMock.mockResponse(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5 second delay

//       return {
//         status: 200,

//         body: JSON.stringify({
//           choices: [{ message: { content: "Delayed response" } }],
//         }),
//       };
//     });

//     fireEvent.change(inputElement, {
//       target: { value: "A question with delay" },
//     });

//     fireEvent.click(sendButton);

//     expect(screen.getByRole("progressbar")).toBeInTheDocument(); // Check for the loading indicator

//     await waitFor(() =>
//       expect(screen.getByText(/Delayed response/i)).toBeInTheDocument()
//     );
//   });

//   it("should clear the input after sending a message", async () => {
//     render(<HrAssistant />);

//     const inputElement = screen.getByPlaceholderText(/Type your question/i);

//     const sendButton = screen.getByText(/Send/i);

//     mockSuccessfulFetch("Response");

//     fireEvent.change(inputElement, { target: { value: "Test" } });

//     fireEvent.click(sendButton);

//     await waitFor(() => expect(inputElement.value).toBe(""));
//   });
//});

// From Tabnine's code snippet:

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HrAssistant from "./HrAssistant"; // Adjust the path if necessary
import {} from "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
// Mock the fetch API globally


global.fetch = fetchMock;

//

describe("HrAssistant Component", () => {
  //

  beforeEach(() => {
    // Clear all mocks before each test

    fetchMock.resetMocks();
  }); // Helper function to simulate a successful API response

  const mockSuccessfulFetch = (response) => {
    fetchMock.mockResponse(
      JSON.stringify({
        choices: [
          {
            message: {
              content: response,
            },
          },
        ],
      })
    );
  }; // Helper function to simulate an API error

  const mockFailedFetch = () => {
    fetchMock.mockReject(new Error("Failed to fetch"));
  }; //

  it("should render without crashing", () => {
    render(<HrAssistant />);
  }); //

  it("should display the title and initial message", () => {
    render(<HrAssistant />); //

    expect(screen.getByText(/MyHR/i)).toBeInTheDocument(); //

    expect(screen.getByText(/Ask me anything about HR/i)).toBeInTheDocument();
  }); //

  it("should allow the user to type a question", () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    fireEvent.change(inputElement, {
      target: { value: "What is the holiday policy?" },
    }); //

    expect(inputElement.value).toBe("What is the holiday policy?");
  }); //

  it("should send a message on Enter key press", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i); // const sendButton = screen.getByText(/Send/i);

    mockSuccessfulFetch("The holiday policy is... ");

    fireEvent.change(inputElement, {
      target: { value: "What is the holiday policy?" },
    });

    fireEvent.keyDown(inputElement, { key: "Enter" }); //

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1)); //

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions", //

      expect.objectContaining({
        method: "POST", //

        body: expect.stringContaining("What is the holiday policy?"),
      })
    ); //

    await waitFor(() =>
      expect(screen.getByText(/The holiday policy is.../i)).toBeInTheDocument()
    );
  }); //

  it("should send a message on Send button click", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i);

    mockSuccessfulFetch("Our benefits package includes...");

    fireEvent.change(inputElement, {
      target: { value: "What benefits are offered?" },
    });

    fireEvent.click(sendButton); //

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1)); //

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions", //

      expect.objectContaining({
        method: "POST", //

        body: expect.stringContaining("What benefits are offered?"),
      })
    ); //

    await waitFor(() =>
      expect(
        screen.getByText(/Our benefits package includes.../i)
      ).toBeInTheDocument()
    );
  }); //

  it("should display the user message", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i);

    mockSuccessfulFetch("okay");

    fireEvent.change(inputElement, { target: { value: "Hello" } });

    fireEvent.click(sendButton); //

    await waitFor(() => expect(screen.getByText(/Hello/i)).toBeInTheDocument());
  }); //

  it("should display the assistant response", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i);

    mockSuccessfulFetch("This is a response from the assistant.");

    fireEvent.change(inputElement, { target: { value: "Tell me something." } });

    fireEvent.click(sendButton); //

    await waitFor(() =>
      expect(
        screen.getByText(/This is a response from the assistant./i)
      ).toBeInTheDocument()
    );
  }); //

  it("should handle API errors gracefully", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i);

    mockFailedFetch();

    fireEvent.change(inputElement, {
      target: { value: "What happens if there is an error?" },
    });

    fireEvent.click(sendButton); //

    await waitFor(() =>
      expect(screen.getByText(/No response./i)).toBeInTheDocument()
    );
  }); //

  it("should display a loading indicator while waiting for a response", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i); // Simulate a delayed response

    fetchMock.mockResponse(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5 second delay

      return {
        status: 200,

        body: JSON.stringify({
          choices: [{ message: { content: "Delayed response" } }],
        }),
      };
    });

    fireEvent.change(inputElement, {
      target: { value: "A question with delay" },
    });

    fireEvent.click(sendButton); //

    expect(screen.getByRole("progressbar")).toBeInTheDocument(); // Check for the loading indicator //

    await waitFor(() =>
      expect(screen.getByText(/Delayed response/i)).toBeInTheDocument()
    );
  }); //

  it("should clear the input after sending a message", async () => {
    render(<HrAssistant />);

    const inputElement = screen.getByPlaceholderText(/Type your question/i);

    const sendButton = screen.getByText(/Send/i);

    mockSuccessfulFetch("Response");

    fireEvent.change(inputElement, { target: { value: "Test" } });

    fireEvent.click(sendButton); //

    await waitFor(() => expect(inputElement.value).toBe(""));
  });
});
