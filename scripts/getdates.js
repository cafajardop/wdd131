
// Get the current year and set it in the element with ID "currentyear"
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Get the last modified date of the document
const lastModified = document.lastModified;
document.getElementById("lastmodified").textContent = `Last Modified: ${lastModified}`;