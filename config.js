// to use API URL flexibly
const config = {
  // baseUrl: "http://127.0.0.1:8000",
  baseUrl: "https://job-portal-system-backend.onrender.com",
};


// creating a function to display the error messages
const displayErrorMessages = (errors) => {
  const errorMessagesDiv = document.getElementById("error-messages");
  errorMessagesDiv.innerHTML = ""; // Clear any previous errors

  // Check if errors is an object or a string
  if (typeof errors === "string") {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = errors;
    errorMessage.className =
      "w-1/2 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-5"; // Tailwind CSS classes for styling
    errorMessagesDiv.appendChild(errorMessage);
  } else if (typeof errors === "object") {
    for (const [field, messages] of Object.entries(errors)) {
      // Check if messages is an array
      if (Array.isArray(messages)) {
        const messageList = messages.join(", ");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `${messageList}`;
        errorMessage.className =
          "w-1/2 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-5"; // Tailwind CSS classes for styling
        errorMessagesDiv.appendChild(errorMessage);
      } else {
        // If messages is not an array, just display it directly
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `${messages}`;
        errorMessage.className =
          "w-1/2 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-5"; // Tailwind CSS classes for styling
        errorMessagesDiv.appendChild(errorMessage);
      }
    }
  } else {
    // If errors is neither an object nor a string, log it for debugging
    console.log("Unexpected error format:", errors);
  }
};


// function to handle file downloading in PDF format
const downloadPDF = () => {
  const content = document.getElementById("job-post-detail");

  // Define the options for html2pdf
  const options = {
    margin: [0.225, -1, 0.20, -1], // Adjust margins
    filename: "job_circular_details.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  // Use html2pdf to generate and download the PDF
  html2pdf(content, options);
};
