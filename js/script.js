const form = document.getElementById("form-generator");
const qr = document.getElementById("qrcode");

// Main logic
const onSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // URL validation
  if (url === "") {
    alert("Please enter a valid URL");
  } else {
    showSpinner();
    // Show spinner for 1s
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        addSaveButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Add save button to download QR code
const addSaveButton = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onSubmit);
