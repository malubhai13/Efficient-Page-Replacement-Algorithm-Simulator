 # Efficient-Page-Replacement-Algorithm-Simulator

 # Overview  
The **Efficient Page Replacement Algorithm Simulator** is a tool designed to simulate and analyze different page replacement algorithms used in operating systems for managing memory efficiently. The simulator helps visualize how various algorithms perform under different workloads, providing insights into **page faults, hit ratios, and execution efficiency**.  

##  Features  
 Supports multiple page replacement algorithms:  
- **FIFO (First-In-First-Out)**  
- **LRU (Least Recently Used)**  
- **Optimal Page Replacement**  
- **LFU (Least Frequently Used)**  
- **MRU (Most Recently Used)**  

 **Performance Analysis** – Tracks **page faults, hit ratios**, and **execution time**.  
 **Customizable Input** – Users can provide their own **page reference string** and memory frame size.  
 **Graphical & Tabular Output** – Displays results in a **clear, easy-to-understand format**.  

##  Technologies Used  
- **Python** for core implementation  
- **Matplotlib** for graphical visualization  
- **Pandas/Numpy** for data handling and analysis  


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


1. Simulation of Page Replacement Algorithms
Input: The simulator needs input such as:
The number of frames (available memory frames)
A sequence of page references (access pattern for the pages).
Page Replacement Algorithms:
You’ll simulate the different algorithms (FIFO, LRU, etc.) based on the input sequence of page references.
2. Performance Metrics
To analyze the performance of the algorithms, you should track the following:

Page Faults: Number of times a page needs to be loaded into memory because it’s not currently in the available frames.
Hit Rate: The proportion of accesses that result in a page hit (the page is already in memory).
Miss Rate: The proportion of accesses that result in a page fault (the page is not in memory).
Algorithm Efficiency: Comparison of the different algorithms based on page faults and hit/miss rate.
3. Key Functions for Simulation
Here are some functions you might need to implement:

Simulate FIFO, LRU, etc.: A function for each algorithm to simulate page replacements. For example, the FIFO function would handle replacing the oldest page when a new page comes in, while LRU would replace the least recently used page.

Track Frames: Maintain a list or array that simulates the frames (memory slots). This would change as pages are added or replaced.

Log Results: Keep track of the number of page faults and hits for each algorithm.

4. Performance Analysis
Once the simulation is run, you'll want to analyze how well each algorithm performs. You can compare the following:

Total Page Faults for each algorithm.
Hit Rate: Calculated as (total references - page faults) / total references.
Efficiency: Comparing the hit/miss ratio for different algorithms to show which one works better under specific conditions.
5. Visualization
You could also include graphs or charts to visualize how each algorithm performs with different inputs, which will help users understand the efficiency of each algorithm.

