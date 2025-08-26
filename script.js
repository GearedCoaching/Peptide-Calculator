document.addEventListener('DOMContentLoaded', () => {
    const injectionType = document.getElementById('injectionType');
    const syringeFields = document.getElementById('syringeFields');
    const penFields = document.getElementById('penFields');
    const form = document.getElementById('peptideForm');
    const resultDisplay = document.getElementById('result');

    // Toggle fields based on injection type
    injectionType.addEventListener('change', () => {
        if (injectionType.value === 'syringe') {
            syringeFields.style.display = 'block';
            penFields.style.display = 'none';
        } else {
            syringeFields.style.display = 'none';
            penFields.style.display = 'block';
        }
    });

    // Handle form submission and calculation
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let compoundMg, desiredDoseMcg, bacWaterMl, penUnits;

        // Get common values
        desiredDoseMcg = parseFloat(document.getElementById('desiredDoseMcg').value);

        if (injectionType.value === 'syringe') {
            compoundMg = parseFloat(document.getElementById('compoundMgSyringe').value);
            bacWaterMl = parseFloat(document.getElementById('bacWaterMl').value);

            if (bacWaterMl <= 0) {
                resultDisplay.textContent = 'Error: Bac Water amount must be a positive number.';
                return;
            }

            // Calculation for syringe
            const concentration_mcg_ml = (compoundMg * 1000) / bacWaterMl;
            const needed_ml = desiredDoseMcg / concentration_mcg_ml;
            const needed_units = needed_ml * 100;

            resultDisplay.textContent = `For a dose of ${desiredDoseMcg} mcg, draw up ${needed_units.toFixed(2)} units. This is ${needed_ml.toFixed(2)} ml.`;

        } else if (injectionType.value === 'pen') {
            compoundMg = parseFloat(document.getElementById('compoundMgPen').value);
            penUnits = parseFloat(document.getElementById('penUnits').value);

            if (penUnits <= 0) {
                resultDisplay.textContent = 'Error: Pen units must be a positive number.';
                return;
            }

            // Calculation for pen
            const concentration_mcg_unit = (compoundMg * 1000) / penUnits;
            const needed_units = desiredDoseMcg / concentration_mcg_unit;

            resultDisplay.textContent = `For a dose of ${desiredDoseMcg} mcg, turn the pen to ${needed_units.toFixed(2)} units.`;
        }
    });
});
