// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Handle sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('show');
        });
    }

    // Handle notification dropdown
    const notificationDropdown = document.getElementById('notificationsDropdown');
    if (notificationDropdown) {
        notificationDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically fetch new notifications
            updateNotifications();
        });
    }

    // Handle new pickup request button
    const newPickupBtn = document.querySelector('.btn-primary');
    if (newPickupBtn) {
        newPickupBtn.addEventListener('click', function() {
            // Here you would typically open a modal or navigate to a new page
            showNewPickupModal();
        });
    }

    // Update stats periodically
    setInterval(updateStats, 300000); // Update every 5 minutes
});

// Function to update notifications
function updateNotifications() {
    // This would typically make an API call to fetch new notifications
    console.log('Fetching new notifications...');
    
    // Example of updating notification count
    const notificationBadge = document.querySelector('.badge');
    if (notificationBadge) {
        const currentCount = parseInt(notificationBadge.textContent);
        if (currentCount > 0) {
            notificationBadge.textContent = currentCount - 1;
        }
    }
}

// Function to show new pickup modal
function showNewPickupModal() {
    // This would typically show a modal with a form
    console.log('Opening new pickup request form...');
    
    // Example of creating and showing a modal
    const modal = new bootstrap.Modal(document.createElement('div'));
    modal.show();
}

// Function to update dashboard stats
function updateStats() {
    // This would typically make an API call to fetch updated stats
    console.log('Updating dashboard stats...');
    
    // Example of updating stats
    const stats = {
        recycled: '245 kg',
        points: '1,250',
        pickups: '12',
        carbon: '45 kg'
    };

    // Update the stats in the UI
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            element.textContent = value;
        }
    });
}

// Function to handle activity item click
function handleActivityClick(activityId) {
    // This would typically navigate to the activity details
    console.log(`Viewing activity details for ID: ${activityId}`);
}

// Function to handle pickup item click
function handlePickupClick(pickupId) {
    // This would typically navigate to the pickup details
    console.log(`Viewing pickup details for ID: ${pickupId}`);
}

// Function to handle user profile click
function handleProfileClick() {
    // This would typically navigate to the user profile
    console.log('Navigating to user profile...');
}

// Function to handle settings click
function handleSettingsClick() {
    // This would typically navigate to the settings page
    console.log('Navigating to settings...');
}

// Function to handle logout
function handleLogout() {
    // This would typically clear the session and redirect to login
    console.log('Logging out...');
    // window.location.href = '/login.html';
}

// Add event listeners for various actions
document.addEventListener('click', function(e) {
    // Handle activity item clicks
    if (e.target.closest('.activity-item')) {
        const activityId = e.target.closest('.activity-item').dataset.id;
        handleActivityClick(activityId);
    }

    // Handle pickup item clicks
    if (e.target.closest('.upcoming-pickup')) {
        const pickupId = e.target.closest('.upcoming-pickup').dataset.id;
        handlePickupClick(pickupId);
    }

    // Handle profile link clicks
    if (e.target.closest('[data-action="profile"]')) {
        handleProfileClick();
    }

    // Handle settings link clicks
    if (e.target.closest('[data-action="settings"]')) {
        handleSettingsClick();
    }

    // Handle logout link clicks
    if (e.target.closest('[data-action="logout"]')) {
        handleLogout();
    }
});