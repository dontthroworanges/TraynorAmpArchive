<!-- Load Montserrat font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap">

<div class="serial-decoder">

  <input
    type="text"
    id="serialInput"
    placeholder="Enter 4 or 7-digit serial number"
    maxlength="7"
  >

  <button type="button" onclick="decodeSerial()">
    Decode Serial Number
  </button>

  <p id="result"></p>

</div>

<style>
  .serial-decoder {
    font-family: 'Montserrat', sans-serif;
  }

  .serial-decoder input,
  .serial-decoder button {
    font-size: 16px;
    padding: 12px 14px;
    width: 100%;
    box-sizing: border-box;
  }

  .serial-decoder button {
    margin-top: 10px;
    cursor: pointer;
  }

  .serial-decoder p {
    margin-top: 12px;
  }
</style>

<script>
  function decodeSerial() {
    const input = document.getElementById("serialInput").value;
    const result = document.getElementById("result");

    // Must be numeric only
    if (!/^\d+$/.test(input)) {
      result.textContent = "Please enter numbers only.";
      return;
    }

    // ---- 4-DIGIT SERIAL NUMBERS ----
    if (input.length === 4) {
      const firstDigit = parseInt(input.charAt(0), 10);

      // Valid range: 0–5 (1966–1971)
      if (firstDigit < 0 || firstDigit > 5) {
        result.textContent = "Invalid 4-digit serial number.";
        return;
      }

      const year = 1966 + firstDigit;
      result.textContent =
        "Possible manufactured year is "+ year +
        ". Check against additional part dates to be accurate.";
      return;
    }

    // ---- 7-DIGIT SERIAL NUMBERS ----
    if (input.length === 7) {
      // Year (digit 1)
      const firstDigit = parseInt(input.charAt(0), 10);
      const baseYear = 1970;
      const year = baseYear + firstDigit;

      // Month (digits 2–3)
      const monthNumber = parseInt(input.substring(1, 3), 10);

      if (monthNumber < 1 || monthNumber > 12) {
        result.textContent = "Invalid month encoded in serial number.";
        return;
      }

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const monthName = monthNames[monthNumber - 1];

      result.textContent = "Manufacturing date: " + monthName + " " + year;
      return;
    }

    // ---- INVALID LENGTH ----
    result.textContent = "Please enter a valid 4- or 7-digit serial number.";
  }
</script>
