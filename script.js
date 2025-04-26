function generateQRCode() {
  const input = document.getElementById("inputText").value.trim();
  const qrcodeDiv = document.getElementById("qrcode");
  const loader = document.getElementById("loader");
  const downloadBtn = document.getElementById("downloadBtn");

  if (input === "") {
    alert("Sila masukkan teks atau pautan terlebih dahulu.");
    return;
  }

  qrcodeDiv.innerHTML = "";
  loader.style.display = "block";
  downloadBtn.style.display = "none";
  downloadBtn.classList.remove("fade-in"); // Reset animasi jika ada sebelum ini

  const imageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(input)}&size=200x200`;
  const img = new Image();
  img.src = imageUrl;
  img.alt = "QR Code";

  const startTime = Date.now(); // Simpan masa mula loader

  img.onload = function () {
    const elapsed = Date.now() - startTime;
    const remainingTime = 1500 - elapsed;

    // Pastikan loader kekal minimum 1.5 saat
    setTimeout(() => {
      loader.style.display = "none";
      qrcodeDiv.appendChild(img);

      // Set pautan muat turun
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          downloadBtn.href = url;
          downloadBtn.download = "qrcode.png";
          downloadBtn.style.display = "inline-block";
          downloadBtn.classList.add("fade-in");
        });
    }, remainingTime > 0 ? remainingTime : 0);
  };
}
