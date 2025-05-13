// Rewards Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const redemptionModal = new bootstrap.Modal(document.getElementById('redemptionModal'));
    let selectedRewardId = null;

    // Sample rewards data (in a real application, this would come from a backend)
    const rewards = {
        1: {
            name: 'Amazon Gift Card',
            description: '$25 Amazon Gift Card',
            points: 2500
        },
        2: {
            name: 'Coffee Shop Voucher',
            description: '$10 Coffee Shop Voucher',
            points: 1000
        },
        3: {
            name: 'Movie Tickets',
            description: '2 Movie Tickets',
            points: 1500
        }
    };

    // Handle reward redemption
    window.redeemReward = function(rewardId) {
        selectedRewardId = rewardId;
        const reward = rewards[rewardId];
        
        // Update modal content
        document.getElementById('modalRewardName').textContent = reward.name;
        document.getElementById('modalRewardPoints').textContent = `${reward.points} points`;
        
        // Show modal
        redemptionModal.show();
    };

    // Handle redemption confirmation
    window.confirmRedemption = function() {
        if (!selectedRewardId) return;

        const reward = rewards[selectedRewardId];
        
        // Here you would typically make an API call to process the redemption
        console.log('Processing redemption for:', reward);

        // Show success message
        showSuccessMessage(reward);

        // Close modal
        redemptionModal.hide();
    };

    // Show success message
    function showSuccessMessage(reward) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Successfully redeemed ${reward.name} for ${reward.points} points!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert at the top of the main content
        const mainContent = document.querySelector('main');
        mainContent.insertBefore(alert, mainContent.firstChild);

        // Remove success message after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);

        // Update points display (in a real application, this would come from the backend)
        updatePointsDisplay(reward.points);
    }

    // Update points display
    function updatePointsDisplay(redeemedPoints) {
        const availablePointsElement = document.querySelector('.points-card:nth-child(1) .points-value');
        const totalPointsElement = document.querySelector('.points-card:nth-child(2) .points-value');
        const redeemedPointsElement = document.querySelector('.points-card:nth-child(3) .points-value');

        // Update available points
        const currentAvailablePoints = parseInt(availablePointsElement.textContent);
        availablePointsElement.textContent = (currentAvailablePoints - redeemedPoints).toLocaleString();

        // Update redeemed points
        const currentRedeemedPoints = parseInt(redeemedPointsElement.textContent.replace(/,/g, ''));
        redeemedPointsElement.textContent = (currentRedeemedPoints + redeemedPoints).toLocaleString();

        // Add to points history
        addToPointsHistory(redeemedPoints);
    }

    // Add to points history
    function addToPointsHistory(points) {
        const tableBody = document.querySelector('.table tbody');
        const newRow = document.createElement('tr');
        
        const today = new Date().toISOString().split('T')[0];
        const reward = rewards[selectedRewardId];

        newRow.innerHTML = `
            <td>${today}</td>
            <td>${reward.name} Redemption</td>
            <td class="text-danger">-${points.toLocaleString()}</td>
            <td><span class="badge bg-info">Redeemed</span></td>
        `;

        // Add new row at the top of the table
        tableBody.insertBefore(newRow, tableBody.firstChild);
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});