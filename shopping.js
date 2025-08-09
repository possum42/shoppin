document.addEventListener("DOMContentLoaded", () => {
  const TAX_RATE = 0.103; // 10.3%

  function recalculate() {
    let subtotal = 0;
    let taxableTotal = 0;

    // Go through each row in the tbody
    document.querySelectorAll("tbody tr").forEach(row => {
      const numberInput = row.querySelector("input[type='number']");
      const checkboxInput = row.querySelector("input[type='checkbox']");

      // Only count rows that have BOTH a number and a checkbox (skip Date row, etc.)
      if (numberInput && checkboxInput) {
        const cost = parseFloat(numberInput.value);
        if (!isNaN(cost) && cost >= 0) {
          subtotal += cost;
          if (checkboxInput.checked) taxableTotal += cost;
        }
      }
    });

    const tax = taxableTotal * TAX_RATE;
    const grandTotal = subtotal + tax;

    // Update the footer
    const $ = sel => document.querySelector(sel);
    $("#subtotal").textContent   = `$${subtotal.toFixed(2)}`;
    $("#tax").textContent        = `$${tax.toFixed(2)}`;
    $("#grandTotal").textContent = `$${grandTotal.toFixed(2)}`;
  }

  // Event delegation: any input change inside the table body triggers a recalc
  const tbody = document.querySelector("tbody");
  if (tbody) tbody.addEventListener("input", recalculate);

  // Initial calc on load
  recalculate();
});
