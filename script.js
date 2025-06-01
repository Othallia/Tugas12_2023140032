console.log("script.js loaded for Hindia Concert Registration");

document
  .querySelectorAll('input[type="radio"].dark-theme-radio')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      // console.log("Radio changed:", this.value, "for name:", this.name);

      document
        .querySelectorAll(`input[name="${this.name}"].dark-theme-radio`)
        .forEach((sib) => {
          const sibGroup = sib.closest(".group");
          if (!sibGroup) return;

          const sibIndicator = sibGroup.querySelector(
            ".radio-checked-indicator"
          );
          const sibLabel = sibGroup.querySelector("label"); // Target label umum
          const sibVisualOuter = sibGroup.querySelector(
            ".radio-visual-indicator > span:first-child"
          );

          if (sibIndicator) {
            sibIndicator.classList.remove("bg-blue-400");
            sibIndicator.classList.add("bg-transparent");
          }
          sibGroup.classList.remove("bg-gray-750", "active-radio-group");
          if (sibLabel) { // Pastikan kita menarget label yang benar untuk styling
            const mainLabelText = sibLabel.childNodes[0].nodeValue.trim(); // Ambil teks utama dari label
            sibLabel.classList.remove("text-blue-300"); // Warna teks label utama saat aktif
            sibLabel.classList.add("text-gray-200"); // Warna teks label utama saat tidak aktif
            
            const priceSpan = sibLabel.querySelector("span.text-xs"); // Sub-teks harga
            if(priceSpan) {
                priceSpan.classList.remove("text-blue-200"); // Jika ingin sub-teks harga juga berubah
                priceSpan.classList.add("text-blue-300", "opacity-75");
            }
          }
          if (sibVisualOuter) {
            sibVisualOuter.classList.remove("border-blue-400");
            sibVisualOuter.classList.add("border-gray-500");
          }
        });

      const currentGroup = this.closest(".group");
      if (!currentGroup) return;

      const currentIndicator = currentGroup.querySelector(
        ".radio-checked-indicator"
      );
      const currentLabel = currentGroup.querySelector("label"); // Target label umum
      const currentVisualOuter = currentGroup.querySelector(
        ".radio-visual-indicator > span:first-child"
      );

      if (this.checked) {
        if (currentIndicator) {
          currentIndicator.classList.add("bg-blue-400");
          currentIndicator.classList.remove("bg-transparent");
        }
        currentGroup.classList.add("bg-gray-750", "active-radio-group");
        if (currentLabel) { // Pastikan kita menarget label yang benar untuk styling
            const mainLabelText = currentLabel.childNodes[0].nodeValue.trim();
            currentLabel.classList.add("text-blue-300");
            currentLabel.classList.remove("text-gray-200");

            const priceSpan = currentLabel.querySelector("span.text-xs");
            if(priceSpan) {
                priceSpan.classList.add("text-blue-200"); // Warna sub-teks harga saat aktif
                priceSpan.classList.remove("text-blue-300", "opacity-75");
            }
        }
        if (currentVisualOuter) {
          currentVisualOuter.classList.add("border-blue-400");
          currentVisualOuter.classList.remove("border-gray-500");
        }
      }
    });

    const group = radio.closest(".group");
    if (group) {
      group.addEventListener("click", function (e) {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "LABEL" && !e.target.closest('label')) {
          // Izinkan klik pada label untuk memilih radio button
          const radioInput = group.querySelector('input[type="radio"]');
          if (radioInput && !radioInput.checked) {
             radioInput.click();
          }
        }
      });
    }
  });

document
  .getElementById("concertRegistrationForm") // ID form diubah
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const telepon = document.getElementById("telepon").value;
    const kategoriTiketInput = document.querySelector(
      'input[name="kategoriTiket"]:checked'
    );
    const jumlahTiket = document.getElementById("jumlahTiket").value;
    const kotaDomisili = document.getElementById("kotaDomisili").value;
    const termsChecked = document.getElementById("terms").checked;

    if (!kategoriTiketInput) {
      alert("Mohon pilih kategori tiket terlebih dahulu.");
      return;
    }
    if (!termsChecked) {
        alert("Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.");
        return;
    }

    const kategoriTiket = kategoriTiketInput.value;

    alert(
    `Pendaftaran Konser Hindia Berhasil!\n
    Nama: ${nama}
    Email: ${email}
    Telepon: ${telepon}
    Kategori Tiket: ${kategoriTiket}
    Jumlah: ${jumlahTiket} tiket
    Kota Domisili: ${kotaDomisili}\n
    Terima kasih telah mendaftar! Informasi selanjutnya akan dikirim melalui email.`
    );

    this.reset();

    // Reset styling radio buttons secara manual
    document
      .querySelectorAll('input[type="radio"].dark-theme-radio')
      .forEach((radio) => {
        radio.checked = false; // Pastikan tidak ada yang terpilih
        // Picu event change untuk mereset visualnya ke state default
        const changeEvent = new Event('change', { bubbles: true });
        radio.dispatchEvent(changeEvent);
      });
  });