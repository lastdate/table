document.getElementById("addStudent").addEventListener("click", addStudent);
document.getElementById("savePDF").addEventListener("click", saveAsPDF);
document
  .getElementById("colorPicker")
  .addEventListener("input", changeTextColor);
document
  .getElementById("fontPicker")
  .addEventListener("change", changeFontFamily);
document.getElementById("shareApp").addEventListener("click", shareApp);

const studentTableBody = document.querySelector("#studentTable tbody");

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const rollNumber = document.getElementById("rollNumber").value.trim();
  const grade = document.getElementById("grade").value.trim();

  if (name && rollNumber && grade) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td contenteditable="true">${name}</td>
      <td contenteditable="true">${rollNumber}</td>
      <td contenteditable="true">${grade}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("grade").value = "";

    // Add event listeners to new buttons
    row
      .querySelector(".delete-btn")
      .addEventListener("click", () => row.remove());
  } else {
    alert("Please fill in all fields.");
  }
}

function saveAsPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.autoTable({ html: "#studentTable" });
  pdf.save("student_grades.pdf");
}

function changeTextColor(event) {
  document.querySelectorAll("#studentTable td").forEach((cell) => {
    cell.style.color = event.target.value;
  });
}

function changeFontFamily(event) {
  document.querySelectorAll("#studentTable td").forEach((cell) => {
    cell.style.fontFamily = event.target.value;
  });
}

function shareApp() {
  const appURL = window.location.href; // Current URL of the app

  if (navigator.share) {
    // Use the Web Share API for supported browsers
    navigator
      .share({
        title: "Student Grades App",
        text: "Check out this Student Grades App!",
        url: appURL,
      })
      .then(() => console.log("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    // Fallback: Copy the link to clipboard and notify the user
    navigator.clipboard
      .writeText(appURL)
      .then(() => {
        alert("Link copied to clipboard! Share it with your friends.");
      })
      .catch(() => {
        alert(`Unable to copy the link. Share this URL manually: ${appURL}`);
      });
  }
}

/* this is share */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  // Example: Handle "ref" query parameter
  if (urlParams.has("ref")) {
    console.log("Referred by:", urlParams.get("ref"));
  }

  // Clean up the URL to avoid reload issues
  if (window.history.replaceState) {
    const cleanURL = window.location.href.split("?")[0];
    window.history.replaceState(null, null, cleanURL);
  }
});
