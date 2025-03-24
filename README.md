# Efficient Page Replacement Algorithm Simulator - Simulation & Performance Analyzer

## Overview
This module is designed to **simulate and analyze the performance** of various **page replacement algorithms**. The goal is to compare different algorithms based on key performance metrics such as **page faults, execution time, and hit ratio**.

## Features
- Implements **FIFO, LRU, and Optimal** page replacement algorithms.
- Accepts **custom input parameters** (number of frames, reference string, and algorithm choice).
- **Simulates** page replacement scenarios.
- **Analyzes performance** using:
  - Page Fault Rate
  - Execution Time
  - Hit Ratio
- **Visualizes results** with graphs (Matplotlib, Seaborn).

## Algorithms Implemented
1. **FIFO (First-In-First-Out)**
2. **LRU (Least Recently Used)**
3. **Optimal Page Replacement**

## Installation
### Prerequisites
Ensure you have **Python 3.x** installed. Install dependencies using:
```bash
pip install -r requirements.txt
```

## Usage
Run the main script:
```bash
python main.py
```
Follow the on-screen instructions to input the number of frames, reference string, and algorithm selection.

## Example
Input:
```
Enter number of frames: 3
Enter reference string: 7, 0, 1, 2, 0, 3, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1
Choose Algorithm: FIFO
```
Output:
```
Page Faults: 12
Hit Ratio: 36.84%
```

## Performance Visualization
After execution, the program generates:
- **Comparison graphs** in the `results/` folder.
- Graphs showing **page faults vs. different algorithms**.

## Project Structure
```
/Efficient-Page-Replacement-Simulator
├── src/
│   ├── fifo.py
│   ├── lru.py
│   ├── optimal.py
│   ├── performance_analyzer.py
│   ├── main.py
├── results/
│   ├── comparison_graphs.png
├── README.md
├── requirements.txt
└── .gitignore
```

## Contributing
- Fork the repository
- Create a new branch (`git checkout -b feature-name`)
- Commit changes (`git commit -m 'Add new feature'`)
- Push to GitHub (`git push origin feature-name`)
- Create a Pull Request

## License
This project is licensed under the **MIT License**.

