// Points Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const form = document.getElementById('pointsCalculatorForm');
    const materialTypeInputs = document.querySelectorAll('input[name="materialType"]');
    const quantityInput = document.getElementById('quantity');
    const weightInput = document.getElementById('weight');

    // Points calculation constants
    const BASE_POINTS = {
        plastic: 100,
        paper: 50,
        glass: 75,
        metal: 150,
        electronic: 200,
        other: 30
    };

    const WEIGHT_MULTIPLIER = 10;
    const QUANTITY_MULTIPLIER = 5;

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculatePoints();
    });

    // Handle real-time updates
    materialTypeInputs.forEach(input => {
        input.addEventListener('change', calculatePoints);
    });

    quantityInput.addEventListener('input', calculatePoints);
    weightInput.addEventListener('input', calculatePoints);

    // Calculate points
    function calculatePoints() {
        const selectedMaterial = document.querySelector('input[name="materialType"]:checked').value;
        const quantity = parseInt(quantityInput.value) || 0;
        const weight = parseFloat(weightInput.value) || 0;

        // Calculate base points
        const basePoints = BASE_POINTS[selectedMaterial] * quantity;

        // Calculate weight bonus
        const weightBonus = Math.floor(weight * WEIGHT_MULTIPLIER);

        // Calculate quantity bonus
        const quantityBonus = quantity > 1 ? (quantity - 1) * QUANTITY_MULTIPLIER : 0;

        // Calculate total points
        const totalPoints = basePoints + weightBonus + quantityBonus;

        // Update display
        updatePointsDisplay(basePoints, weightBonus, quantityBonus, totalPoints);
    }

    // Update points display
    function updatePointsDisplay(basePoints, weightBonus, quantityBonus, totalPoints) {
        // Update total points
        document.getElementById('calculatedPoints').textContent = totalPoints.toLocaleString();

        // Update breakdown
        document.getElementById('basePoints').textContent = basePoints.toLocaleString();
        document.getElementById('weightBonus').textContent = weightBonus.toLocaleString();
        document.getElementById('quantityBonus').textContent = quantityBonus.toLocaleString();

        // Add animation effect
        const pointsValue = document.getElementById('calculatedPoints');
        pointsValue.style.animation = 'none';
        pointsValue.offsetHeight; // Trigger reflow
        pointsValue.style.animation = 'fadeInUp 0.5s ease-out';
    }

    // Add input validation
    quantityInput.addEventListener('input', function() {
        if (this.value < 1) this.value = 1;
    });

    weightInput.addEventListener('input', function() {
        if (this.value < 0.1) this.value = 0.1;
    });

    // Calculate initial points
    calculatePoints();
});