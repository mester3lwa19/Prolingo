document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle

  const menuToggle = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
  // Get the textarea and iframe elements
  const codeInput = document.getElementById("codeInput");
  const outputFrame = document.getElementById("outputFrame");

  if (codeInput && outputFrame) {
    // Listen for changes in the textarea
    codeInput.addEventListener("input", () => {
      const userCode = codeInput.value;

      // Get iframe document
      const iframeDoc =
        outputFrame.contentDocument || outputFrame.contentWindow.document;

      // Write user's HTML into the iframe
      iframeDoc.open();
      iframeDoc.write(userCode);
      iframeDoc.close();
    });
  } else {
    console.warn("Could not find codeInput or outputFrame element.");
  }
});
