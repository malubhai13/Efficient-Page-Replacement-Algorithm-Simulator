class AdvancedPageReplacementSimulator {
    constructor(referenceString, frameSize) {
        this.referenceString = referenceString.split(' ').map(Number);
        this.frameSize = frameSize;
    }

    fifo() {
        const frames = [];
        const pageSequence = [];
        let pageFaults = 0;

        for (const page of this.referenceString) {
            if (!frames.includes(page)) {
                pageFaults++;
                if (frames.length < this.frameSize) {
                    frames.push(page);
                } else {
                    frames.shift();
                    frames.push(page);
                }
            }
            pageSequence.push([...frames]);
        }

        const faultRate = (pageFaults / this.referenceString.length) * 100;
        return { pageFaults, faultRate, pageSequence };
    }

    lru() {
        const frames = [];
        const pageSequence = [];
        let pageFaults = 0;

        for (const page of this.referenceString) {
            if (!frames.includes(page)) {
                pageFaults++;
                if (frames.length < this.frameSize) {
                    frames.push(page);
                } else {
                    // Remove least recently used page
                    frames.shift();
                    frames.push(page);
                }
            } else {
                // Move recently used page to the end
                const index = frames.indexOf(page);
                frames.splice(index, 1);
                frames.push(page);
            }
            pageSequence.push([...frames]);
        }

        const faultRate = (pageFaults / this.referenceString.length) * 100;
        return { pageFaults, faultRate, pageSequence };
    }

    optimal() {
        const frames = [];
        const pageSequence = [];
        let pageFaults = 0;

        for (let i = 0; i < this.referenceString.length; i++) {
            const page = this.referenceString[i];

            if (!frames.includes(page)) {
                pageFaults++;
                if (frames.length < this.frameSize) {
                    frames.push(page);
                } else {
                    // Find page to replace
                    const replaceIndex = this.findOptimalReplacePage(frames, i);
                    frames[replaceIndex] = page;
                }
            }
            pageSequence.push([...frames]);
        }

        const faultRate = (pageFaults / this.referenceString.length) * 100;
        return { pageFaults, faultRate, pageSequence };
    }

    findOptimalReplacePage(frames, currentIndex) {
        let replaceIndex = 0;
        let maxDistance = -1;

        for (let j = 0; j < frames.length; j++) {
            const futureIndex = this.referenceString.slice(currentIndex + 1).indexOf(frames[j]);
            const distance = futureIndex === -1 ? Infinity : futureIndex;

            if (distance > maxDistance) {
                maxDistance = distance;
                replaceIndex = j;
            }
        }

        return replaceIndex;
    }

    compareAlgorithms() {
        return {
            fifo: this.fifo(),
            lru: this.lru(),
            optimal: this.optimal()
        };
    }

    static generateRandomReferenceString(length = 15, maxPage = 9) {
        return Array.from(
            {length}, 
            () => Math.floor(Math.random() * (maxPage + 1))
        ).join(' ');
    }
}

function createPageFaultsChart(results) {
    const ctx = document.getElementById('pageReplacementChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(results).map(algo => algo.toUpperCase()),
            datasets: [
                {
                    label: 'Page Faults',
                    data: Object.values(results).map(result => result.pageFaults),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                },
                {
                    label: 'Fault Rate (%)',
                    data: Object.values(results).map(result => result.faultRate),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Page Faults / Fault Rate'
                    }
                }
            },
            plugins: {
                title: { 
                    display: true, 
                    text: 'Page Faults and Fault Rate Comparison' 
                }
            }
        }
    });
}

function createPerformanceRadarChart(results) {
    const ctx = document.getElementById('performanceRadarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Page Faults', 'Fault Rate (%)'],
            datasets: Object.entries(results).map(([algo, result], index) => ({
                label: algo.toUpperCase(),
                data: [
                    result.pageFaults,
                    result.faultRate
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)', 
                    'rgba(255, 99, 132, 0.2)', 
                    'rgba(75, 192, 192, 0.2)'
                ][index]
            }))
        },
        options: {
            responsive: true,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Algorithmic Performance Comparison' 
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const randomGenerateBtn = document.getElementById('randomGenerateBtn');
    const referenceStringInput = document.getElementById('referenceString');
    const simulateBtn = document.getElementById('simulateBtn');
    const performanceResults = document.getElementById('performanceResults');

    // Random Reference String Generation
    randomGenerateBtn.addEventListener('click', () => {
        referenceStringInput.value = AdvancedPageReplacementSimulator.generateRandomReferenceString();
    });

    // Simulation Handler
    simulateBtn.addEventListener('click', () => {
        const referenceString = referenceStringInput.value.trim();
        const frameSize = parseInt(document.getElementById('frameSize').value);
        const selectedAlgorithms = Array.from(
            document.querySelectorAll('.algorithm-checkbox:checked')
        ).map(checkbox => checkbox.value);

        if (!referenceString || isNaN(frameSize) || frameSize < 1) {
            alert('Please enter a valid reference string and frame size');
            return;
        }

        const simulator = new AdvancedPageReplacementSimulator(referenceString, frameSize);
        const results = {};

        // Only simulate selected algorithms
        selectedAlgorithms.forEach(algo => {
            results[algo] = simulator[algo]();
        });

        // Update Performance Results
        performanceResults.innerHTML = Object.entries(results).map(([algo, result]) => `
            <div class="bg-gray-100 p-3 rounded">
                <h4 class="font-bold">${algo.toUpperCase()} Algorithm</h4>
                <p>Page Faults: ${result.pageFaults}</p>
                <p>Fault Rate: ${result.faultRate.toFixed(2)}%</p>
            </div>
        `).join('');

        // Clear previous charts
        document.getElementById('pageReplacementChart').innerHTML = '';
        document.getElementById('performanceRadarChart').innerHTML = '';

        // Create Visualizations
        createPageFaultsChart(results);
        createPerformanceRadarChart(results);
    });
});