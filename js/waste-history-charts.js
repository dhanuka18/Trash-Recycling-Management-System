// Waste History Charts JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeWasteTypeChart();
    initializeMonthlyTrendChart();
    initializePointsChart();
    initializeRecyclingScoreChart();

    // Sample data - Replace with actual data from backend
    const wasteTypeData = {
        labels: ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronic', 'Other'],
        datasets: [{
            data: [35, 25, 15, 10, 10, 5],
            backgroundColor: [
                '#2ecc71',
                '#3498db',
                '#9b59b6',
                '#f1c40f',
                '#e74c3c',
                '#95a5a6'
            ]
        }]
    };

    const monthlyTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Weight (kg)',
            data: [120, 150, 180, 140, 160, 190],
            borderColor: '#2ecc71',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(46, 204, 113, 0.1)'
        }]
    };

    const pointsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Points Earned',
            data: [800, 950, 1100, 900, 1050, 1250],
            borderColor: '#3498db',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(52, 152, 219, 0.1)'
        }]
    };

    const recyclingScoreData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Recycling Score',
            data: [75, 78, 80, 82, 83, 85],
            borderColor: '#9b59b6',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(155, 89, 182, 0.1)'
        }]
    };

    // Initialize Waste Type Distribution Chart
    function initializeWasteTypeChart() {
        const ctx = document.getElementById('wasteTypeChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: wasteTypeData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Waste Type Distribution'
                    }
                }
            }
        });
    }

    // Initialize Monthly Trend Chart
    function initializeMonthlyTrendChart() {
        const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: monthlyTrendData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Monthly Recycling Trend'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Weight (kg)'
                        }
                    }
                }
            }
        });
    }

    // Initialize Points Chart
    function initializePointsChart() {
        const ctx = document.getElementById('pointsChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: pointsData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Points Earned Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Points'
                        }
                    }
                }
            }
        });
    }

    // Initialize Recycling Score Chart
    function initializeRecyclingScoreChart() {
        const ctx = document.getElementById('recyclingScoreChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: recyclingScoreData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Recycling Score Progress'
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Score (%)'
                        }
                    }
                }
            }
        });
    }

    // Update charts with new data
    function updateCharts(newData) {
        // TODO: Implement chart updates with new data from backend
        console.log('Updating charts with new data...');
    }

    // Set up periodic updates
    setInterval(updateCharts, 300000); // Update every 5 minutes
});