/*
 * ASYNCHRONOUS PROGRAMMING
 * =========================
 * 
 * GENERIC DEFINITION:
 * -------------------
 * Asynchronous programming is a programming paradigm where operations can be initiated 
 * and their results handled at different times, without blocking the main execution flow. 
 * It's about managing time and resources efficiently.
 * 
 * Note: Async programming is NOT specific to JavaScript - it exists in Python, C#, Java, Go, etc.
 * 
 * 
 * CONCURRENCY vs PARALLELISM:
 * ---------------------------
 * Async Programming is PRIMARILY about CONCURRENCY, not parallelism.
 * 
 * 🔄 CONCURRENCY: Multiple tasks making progress over time (time-slicing, interleaving)
 *    - Like a chef juggling multiple dishes
 *    - Tasks start, pause, resume, complete at different times
 *    - Can happen on single or multiple cores
 * 
 * ⚡ PARALLELISM: Multiple tasks executing simultaneously (true simultaneous execution)
 *    - Like multiple chefs in a kitchen
 *    - Requires multiple CPU cores
 *    - Tasks run at the exact same time
 * 
 * 🎯 KEY POINT: Async programming is fundamentally about CONCURRENCY - managing multiple 
 *    tasks that can be paused, resumed, and interleaved.
 * 
 * 
 * THREADING MODELS:
 * -----------------
 * 1. Single-threaded async: One thread handles multiple tasks (JavaScript, Python asyncio)
 * 2. Multi-threaded async: Multiple threads with async coordination (C#, Java)
 * 3. Event-driven: Operations triggered by events (Node.js, GUI applications)
 * 
 * 
 * KEY BENEFITS:
 * -------------
 * ✅ Resource efficiency: Don't waste CPU waiting for I/O
 * ✅ Responsiveness: UI stays interactive during long operations
 * ✅ Scalability: Handle thousands of concurrent operations
 * 
 * 
 * REAL-WORLD ANALOGY:
 * -------------------
 * Restaurant Manager:
 * - Synchronous: Take order → Cook → Serve → Take next order (inefficient)
 * - Asynchronous: Take multiple orders → Start cooking → Take more orders while food cooks → Serve when ready
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * JAVASCRIPT-SPECIFIC ASYNCHRONOUS PROGRAMMING
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * JAVASCRIPT'S LIMITATION:
 * ------------------------
 * 🚫 Single-threaded: Only one call stack, one thread
 * 🚫 No true parallelism within JavaScript code
 * ✅ Event Loop: JavaScript's solution to async programming
 * 
 * 
 * JAVASCRIPT'S ASYNC MODEL:
 * -------------------------
 * JavaScript doesn't block - it uses the Event Loop
 * 
 * Example:
 * console.log("1");
 * setTimeout(() => console.log("2"), 0);
 * console.log("3");
 * // Output: 1, 3, 2 (not 1, 2, 3)
 * 
 * 
 * JAVASCRIPT ASYNC MECHANISMS:
 * ----------------------------
 * 1. Callbacks: setTimeout, addEventListener
 * 2. Promises: .then(), .catch(), .finally()
 * 3. Async/Await: Syntactic sugar over Promises
 * 4. Web APIs: fetch(), XMLHttpRequest
 * 
 * 
 * JAVASCRIPT'S UNIQUE APPROACH:
 * -----------------------------
 * 📋 Non-blocking I/O: While waiting for network/disk, JavaScript can do other work
 * 📋 Event-driven: Everything is based on events and callbacks
 * 📋 Callback Queue: Completed async operations wait in queue
 * 📋 Microtasks: Promises get priority over regular callbacks
 * 
 * 
 * JAVASCRIPT VS OTHER LANGUAGES:
 * ------------------------------
 * | Language     | Async Model            | Threading        |
 * |--------------|------------------------|------------------|
 * | JavaScript   | Event Loop + Callbacks | Single-threaded  |
 * | Python       | asyncio + async/await  | Single-threaded  |
 * | C#           | async/await + Tasks    | Multi-threaded   |
 * | Java         | CompletableFuture      | Multi-threaded   |
 * | Go           | Goroutines             | Multi-threaded   |
 * 
 * 
 * JAVASCRIPT'S "FAKE" CONCURRENCY:
 * --------------------------------
 * // This looks concurrent but isn't truly parallel
 * Promise.all([
 *     fetch('/api/user'),
 *     fetch('/api/posts'),
 *     fetch('/api/comments')
 * ]);
 * // All requests start simultaneously, but JavaScript can only execute 
 * // one piece of code at a time
 * 
 * 
 * 🎯 KEY POINT: 
 * JavaScript achieves async programming through COOPERATIVE MULTITASKING - 
 * functions voluntarily yield control back to the event loop, allowing other operations to run.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * TRACING ASYNC PROGRAMMING: APPLICATION TO CPU LEVEL
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * LEVEL 1: APPLICATION LEVEL (Your Code)
 * --------------------------------------
 * fetch('/api/data')
 *     .then(data => processData(data))
 *     .then(result => displayResult(result));
 * 
 * 
 * LEVEL 2: JAVASCRIPT ENGINE LEVEL
 * ---------------------------------
 * Components:
 * - Call Stack: Executes synchronous code
 * - Web APIs: Handle async operations (setTimeout, fetch, DOM events)
 * - Callback Queue: Stores completed async operations
 * - Event Loop: Continuously checks if call stack is empty, then moves callbacks from queue to stack
 * 
 * 
 * LEVEL 3: BROWSER/RUNTIME LEVEL
 * -------------------------------
 * - Browser APIs: XMLHttpRequest, fetch, setTimeout
 * - Network Stack: HTTP requests, WebSocket connections
 * - File System: Node.js file operations
 * - Timer APIs: setTimeout, setInterval
 * 
 * 
 * LEVEL 4: OPERATING SYSTEM LEVEL
 * --------------------------------
 * Process Management:
 * ┌─────────────────────────────────────┐
 * │       Application Process           │
 * │  ┌─────────────────────────────────┐│
 * │  │     JavaScript Thread           ││
 * │  │  ┌─────────────────────────────┐││
 * │  │  │      Event Loop             │││
 * │  │  │  - Call Stack               │││
 * │  │  │  - Callback Queue           │││
 * │  │  └─────────────────────────────┘││
 * │  └─────────────────────────────────┘│
 * │                                     │
 * │  ┌─────────────────────────────────┐│
 * │  │    I/O Operations               ││
 * │  │  - Network requests             ││
 * │  │  - File system calls            ││
 * │  │  - Timer events                 ││
 * │  └─────────────────────────────────┘│
 * └─────────────────────────────────────┘
 * 
 * Threading Model:
 * - Single-threaded JavaScript: One main thread
 * - OS Thread Pool: Browser/Node.js uses multiple OS threads for I/O
 * - Kernel Threads: OS manages actual thread execution
 * 
 * 
 * LEVEL 5: CPU LEVEL
 * ------------------
 * Context Switching:
 * Thread 1 (JavaScript): [Execute] → [Wait for I/O] → [Execute]
 * Thread 2 (I/O):        [Wait] → [Handle I/O] → [Wait]
 * Thread 3 (Timer):      [Wait] → [Wait] → [Timer Event]
 * 
 * CPU Scheduling:
 * - Time Slicing: OS gives each thread small time slices
 * - Preemptive Multitasking: OS can interrupt threads
 * - Context Switch: Save/restore thread state when switching
 * 
 * 
 * LEVEL 6: HARDWARE LEVEL
 * -----------------------
 * CPU Cores:
 * - Single Core: True concurrency (time-slicing)
 * - Multi-Core: Potential for parallelism
 * - Hyperthreading: Virtual cores for better concurrency
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * EXAMPLE: TRACING fetch() CALL THROUGH ALL LEVELS
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * CODE:
 * fetch('/api/data')
 *     .then(response => response.json())
 *     .then(data => console.log(data));
 * 
 * 
 * FLOW (Top to Bottom):
 * ---------------------
 * 1. JavaScript Code → fetch() called
 * 
 * 2. Browser Engine:
 *    - Call Stack: fetch() is pushed
 *    - Web API: Network request initiated
 *    - Callback Queue: Promise resolution queued
 * 
 * 3. Operating System:
 *    - Network Stack: TCP connection established
 *    - Kernel: Manages network buffers
 *    - Device Driver: Network card communication
 * 
 * 4. Hardware:
 *    - Network Card: Sends packets over wire
 *    - CPU: Handles interrupts from network card
 *    - Memory: Buffers network data
 * 
 * 5. Response Flow (Reverse):
 *    Hardware → OS → Browser → JavaScript Engine → Your Code
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * KEY INSIGHTS
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * CONCURRENCY vs PARALLELISM IN ASYNC:
 * -------------------------------------
 * 
 * JavaScript (Single-threaded async):
 * ✅ Concurrency: Multiple tasks interleaved
 * ❌ Parallelism: Only one JavaScript thread
 * ✅ I/O Parallelism: OS handles multiple I/O operations
 * 
 * Multi-threaded Languages (C#, Java):
 * ✅ Concurrency: Multiple tasks interleaved
 * ✅ Parallelism: Multiple threads on multiple cores
 * ✅ I/O Parallelism: OS + language threads
 * 
 * 
 * THE MAGIC OF ASYNC:
 * -------------------
 * Without Async (Blocking):
 * CPU: [Wait] → [Wait] → [Wait] → [Process] → [Wait] → [Wait]
 * 
 * With Async (Non-blocking):
 * CPU: [Process A] → [Process B] → [Process C] → [Process A] → [Process B]
 * 
 * 
 * 🎯 FINAL KEY POINT:
 * The OS and CPU are doing the heavy lifting - async programming is just a smart way 
 * to coordinate with them! JavaScript's Event Loop efficiently manages the communication 
 * between your code and the OS's I/O operations.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * THE EVENT LOOP - HEART OF JAVASCRIPT'S ASYNC PROGRAMMING
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * WHAT IS THE EVENT LOOP?
 * -----------------------
 * The Event Loop is the mechanism that allows JavaScript to perform non-blocking operations
 * despite being single-threaded. It continuously monitors the Call Stack and Task Queues,
 * coordinating the execution of code, collecting events, and executing sub-tasks.
 * 
 * 
 * EVENT LOOP COMPONENTS:
 * ----------------------
 * 
 * 1. CALL STACK (Execution Context Stack)
 *    - Where synchronous code executes
 *    - LIFO (Last In, First Out) structure
 *    - Only one thing can execute at a time
 *    - When empty, Event Loop checks the queues
 * 
 * 2. WEB APIs (Browser/Node.js APIs)
 *    - setTimeout/setInterval
 *    - fetch/XMLHttpRequest
 *    - DOM Events (click, scroll, etc.)
 *    - File I/O (Node.js)
 *    - These run OUTSIDE JavaScript engine
 * 
 * 3. CALLBACK QUEUE / TASK QUEUE (Macrotask Queue)
 *    - Stores callbacks from Web APIs
 *    - setTimeout, setInterval callbacks
 *    - I/O operations
 *    - UI rendering tasks
 *    - FIFO (First In, First Out)
 * 
 * 4. MICROTASK QUEUE (Job Queue)
 *    - Higher priority than Callback Queue
 *    - Promise callbacks (.then, .catch, .finally)
 *    - MutationObserver callbacks
 *    - queueMicrotask()
 *    - Process.nextTick (Node.js)
 * 
 * 5. EVENT LOOP
 *    - Monitors Call Stack and Queues
 *    - Coordinates execution order
 *    - Never sleeps, always running
 * 
 * 
 * EVENT LOOP ALGORITHM:
 * ---------------------
 * 1. Execute all synchronous code (Call Stack)
 * 2. When Call Stack is empty:
 *    a. Execute ALL microtasks (empty the Microtask Queue completely)
 *    b. If microtasks create more microtasks, execute those too
 * 3. Execute ONE macrotask from Callback Queue
 * 4. Go back to step 2
 * 5. Repeat forever
 * 
 * 
 * PRIORITY ORDER:
 * ---------------
 * 1. Synchronous Code (Call Stack) - HIGHEST PRIORITY
 * 2. Microtasks (Promises)
 * 3. Macrotasks (setTimeout, setInterval)
 * 4. Rendering (if needed)
 * 
 * 
 * VISUAL REPRESENTATION:
 * ----------------------
 * 
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                     JAVASCRIPT ENGINE                       │
 *     │                                                             │
 *     │   ┌─────────────┐         ┌──────────────────────┐        │
 *     │   │  Call Stack │         │   Heap (Memory)      │        │
 *     │   │             │         │                      │        │
 *     │   │  function3  │         │   Objects, Arrays    │        │
 *     │   │  function2  │         │   Functions, etc.    │        │
 *     │   │  function1  │         │                      │        │
 *     │   └─────────────┘         └──────────────────────┘        │
 *     │                                                             │
 *     └─────────────────────────────────────────────────────────────┘
 *                              ↑
 *                              │ Event Loop monitors
 *                              ↓
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                       EVENT LOOP                            │
 *     │                                                             │
 *     │  1. Check Call Stack (empty?)                              │
 *     │  2. Process ALL Microtasks                                 │
 *     │  3. Process ONE Macrotask                                  │
 *     │  4. Repeat                                                 │
 *     │                                                             │
 *     └─────────────────────────────────────────────────────────────┘
 *                              ↓
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                    MICROTASK QUEUE                          │
 *     │  [Promise.then] → [Promise.then] → [queueMicrotask]        │
 *     │                                                             │
 *     │  Priority: HIGH (executes before macrotasks)               │
 *     └─────────────────────────────────────────────────────────────┘
 * 
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │              MACROTASK QUEUE (Callback Queue)               │
 *     │  [setTimeout] → [setInterval] → [I/O callback]             │
 *     │                                                             │
 *     │  Priority: LOW (executes one at a time)                    │
 *     └─────────────────────────────────────────────────────────────┘
 * 
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                       WEB APIs                              │
 *     │  (Run outside JavaScript engine, in browser/Node.js)       │
 *     │                                                             │
 *     │  • setTimeout/setInterval timers                           │
 *     │  • fetch/XMLHttpRequest (Network)                          │
 *     │  • DOM Events                                              │
 *     │  • File System (Node.js)                                   │
 *     │                                                             │
 *     └─────────────────────────────────────────────────────────────┘
 * 
 * 
 * DETAILED EXAMPLE - EVENT LOOP IN ACTION:
 * -----------------------------------------
 * 
 * console.log('1 - Sync');
 * 
 * setTimeout(() => {
 *     console.log('2 - Macrotask');
 * }, 0);
 * 
 * Promise.resolve().then(() => {
 *     console.log('3 - Microtask');
 * });
 * 
 * console.log('4 - Sync');
 * 
 * 
 * EXECUTION FLOW:
 * ---------------
 * 
 * Step 1: Execute synchronous code
 *    Call Stack: [console.log('1')]
 *    Output: "1 - Sync"
 * 
 * Step 2: setTimeout encountered
 *    - Sent to Web API (timer starts)
 *    - After 0ms, callback added to MACROTASK Queue
 * 
 * Step 3: Promise encountered
 *    - Already resolved, .then() callback added to MICROTASK Queue
 * 
 * Step 4: Execute synchronous code
 *    Call Stack: [console.log('4')]
 *    Output: "4 - Sync"
 * 
 * Step 5: Call Stack empty, Event Loop checks queues
 *    - Microtask Queue: [Promise callback]
 *    - Macrotask Queue: [setTimeout callback]
 * 
 * Step 6: Process ALL Microtasks first
 *    Call Stack: [console.log('3')]
 *    Output: "3 - Microtask"
 * 
 * Step 7: Process ONE Macrotask
 *    Call Stack: [console.log('2')]
 *    Output: "2 - Macrotask"
 * 
 * FINAL OUTPUT:
 * 1 - Sync
 * 4 - Sync
 * 3 - Microtask
 * 2 - Macrotask
 * 
 * 
 * COMPLEX EXAMPLE - NESTED PROMISES VS SETTIMEOUT:
 * -------------------------------------------------
 * 
 * console.log('Start');
 * 
 * setTimeout(() => {
 *     console.log('Timeout 1');
 *     Promise.resolve().then(() => console.log('Promise in Timeout 1'));
 * }, 0);
 * 
 * Promise.resolve().then(() => {
 *     console.log('Promise 1');
 *     setTimeout(() => console.log('Timeout in Promise 1'), 0);
 * });
 * 
 * Promise.resolve().then(() => console.log('Promise 2'));
 * 
 * setTimeout(() => console.log('Timeout 2'), 0);
 * 
 * console.log('End');
 * 
 * OUTPUT:
 * Start
 * End
 * Promise 1
 * Promise 2
 * Timeout 1
 * Promise in Timeout 1
 * Timeout 2
 * Timeout in Promise 1
 * 
 * EXPLANATION:
 * 1. Sync code: "Start", "End"
 * 2. All Microtasks: "Promise 1", "Promise 2"
 * 3. One Macrotask: "Timeout 1" (creates microtask)
 * 4. New Microtask: "Promise in Timeout 1"
 * 5. Next Macrotask: "Timeout 2"
 * 6. Next Macrotask: "Timeout in Promise 1"
 * 
 * 
 * KEY INSIGHTS ABOUT EVENT LOOP:
 * -------------------------------
 * 
 * 1. MICROTASKS HAVE PRIORITY
 *    - All microtasks execute before any macrotask
 *    - Can create "microtask loops" that block macrotasks
 * 
 * 2. MACROTASKS EXECUTE ONE AT A TIME
 *    - After each macrotask, check microtask queue again
 *    - Allows for fair distribution of work
 * 
 * 3. JAVASCRIPT IS NON-PREEMPTIVE
 *    - Once function starts, it runs to completion
 *    - Long-running sync code blocks everything
 * 
 * 4. WEB APIs ARE THE SECRET
 *    - They run OUTSIDE JavaScript engine
 *    - Enable "concurrent" behavior in single-threaded JS
 * 
 * 5. RENDERING IS BLOCKED BY JAVASCRIPT
 *    - Browser can't repaint while JS is executing
 *    - Break long tasks into smaller chunks for smooth UI
 * 
 * 
 * HOW EVENT LOOP ENABLES ASYNC PROGRAMMING:
 * ------------------------------------------
 * 
 * ✅ Non-blocking I/O:
 *    - fetch() doesn't block - network request handled by Web API
 *    - JavaScript continues executing other code
 *    - When response arrives, callback queued for later execution
 * 
 * ✅ Responsive UI:
 *    - User clicks handled via event queue
 *    - UI stays responsive during async operations
 *    - Animations/interactions don't freeze
 * 
 * ✅ Efficient Resource Usage:
 *    - One thread handles thousands of concurrent operations
 *    - No thread overhead or context switching costs
 *    - Memory efficient compared to thread-per-request model
 * 
 * 
 * COMMON PITFALLS:
 * ----------------
 * 
 * 1. Blocking the Event Loop:
 *    // BAD - blocks everything
 *    for (let i = 0; i < 1000000000; i++) {
 *        // Heavy computation
 *    }
 * 
 * 2. Microtask Starvation:
 *    // BAD - infinite microtasks block macrotasks
 *    function loop() {
 *        Promise.resolve().then(loop);
 *    }
 *    loop();
 * 
 * 3. setTimeout(0) is not immediate:
 *    // It's queued as macrotask, runs after microtasks
 *    setTimeout(() => console.log('later'), 0);
 *    Promise.resolve().then(() => console.log('first'));
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * WEB WORKERS, SERVICE WORKERS & TRUE PARALLELISM IN JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * ARE WORKERS RELATED TO ASYNC PROGRAMMING?
 * ------------------------------------------
 * Yes! Workers provide TRUE PARALLELISM (not just concurrency) in JavaScript.
 * They run on separate threads, enabling CPU-intensive tasks without blocking the main thread.
 * 
 * 
 * 1. WEB WORKERS - TRUE MULTI-THREADING
 * --------------------------------------
 * 
 * WHAT ARE WEB WORKERS?
 * - Separate JavaScript threads that run in background
 * - Have their own Event Loop, Call Stack, Memory
 * - Enable TRUE PARALLELISM on multi-core CPUs
 * - Do NOT have access to DOM
 * 
 * USE CASES:
 * ✅ Heavy computations (image processing, cryptography)
 * ✅ Data parsing (large JSON/XML files)
 * ✅ Background calculations
 * ✅ Real-time data processing
 * 
 * EXAMPLE:
 * 
 * // main.js (Main Thread)
 * const worker = new Worker('worker.js');
 * 
 * // Send data to worker
 * worker.postMessage({ data: largeArray });
 * 
 * // Receive result from worker
 * worker.onmessage = (event) => {
 *     console.log('Result from worker:', event.data);
 * };
 * 
 * // worker.js (Worker Thread)
 * self.onmessage = (event) => {
 *     const result = heavyComputation(event.data);
 *     self.postMessage(result); // Send back to main thread
 * };
 * 
 * function heavyComputation(data) {
 *     // CPU-intensive work here
 *     return processedData;
 * }
 * 
 * 
 * WEB WORKER ARCHITECTURE:
 * ------------------------
 * 
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                    MAIN THREAD                              │
 *     │                                                             │
 *     │  ┌──────────────┐        ┌──────────────┐                  │
 *     │  │  Event Loop  │        │  DOM Access  │                  │
 *     │  │  Call Stack  │        │  UI Updates  │                  │
 *     │  └──────────────┘        └──────────────┘                  │
 *     │                                                             │
 *     │         ↕ postMessage / onmessage (Message Passing)        │
 *     │                                                             │
 *     └─────────────────────────────────────────────────────────────┘
 * 
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │                   WEB WORKER THREAD                         │
 *     │                                                             │
 *     │  ┌──────────────┐        ┌──────────────┐                  │
 *     │  │  Event Loop  │        │  No DOM      │                  │
 *     │  │  Call Stack  │        │  Access      │                  │
 *     │  └──────────────┘        └──────────────┘                  │
 *     │                                                             │
 *     │  Runs on SEPARATE CPU THREAD                               │
 *     │                                                             │
 *     └─────────────────────────────────────────────────────────────┘
 * 
 * 
 * KEY CHARACTERISTICS:
 * - Separate global scope (no window, no document)
 * - Communication via message passing (structured clone)
 * - No shared memory (except SharedArrayBuffer)
 * - Can create more workers (nested workers)
 * - Terminated when not needed to save resources
 * 
 * 
 * 2. SERVICE WORKERS - OFFLINE & CACHING
 * --------------------------------------
 * 
 * WHAT ARE SERVICE WORKERS?
 * - Special type of Web Worker
 * - Acts as network proxy between app and server
 * - Enables offline functionality
 * - Runs even when page is closed
 * - Has its own lifecycle
 * 
 * USE CASES:
 * ✅ Offline web apps (PWAs)
 * ✅ Caching strategies
 * ✅ Background sync
 * ✅ Push notifications
 * ✅ Intercepting network requests
 * 
 * EXAMPLE:
 * 
 * // Register service worker
 * if ('serviceWorker' in navigator) {
 *     navigator.serviceWorker.register('/sw.js')
 *         .then(registration => console.log('SW registered'))
 *         .catch(error => console.log('SW registration failed'));
 * }
 * 
 * // sw.js (Service Worker)
 * // Install event - cache resources
 * self.addEventListener('install', (event) => {
 *     event.waitUntil(
 *         caches.open('v1').then(cache => {
 *             return cache.addAll([
 *                 '/',
 *                 '/index.html',
 *                 '/styles.css',
 *                 '/script.js'
 *             ]);
 *         })
 *     );
 * });
 * 
 * // Fetch event - serve from cache or network
 * self.addEventListener('fetch', (event) => {
 *     event.respondWith(
 *         caches.match(event.request)
 *             .then(response => response || fetch(event.request))
 *     );
 * });
 * 
 * 
 * SERVICE WORKER LIFECYCLE:
 * -------------------------
 * 1. Registration: navigator.serviceWorker.register()
 * 2. Installation: 'install' event fires
 * 3. Activation: 'activate' event fires
 * 4. Idle/Terminated: Waits for events
 * 5. Fetch/Message: Handles events when triggered
 * 
 * 
 * 3. OTHER WORKER TYPES
 * ---------------------
 * 
 * SHARED WORKERS:
 * - Shared between multiple browser tabs/windows
 * - Single instance serves multiple contexts
 * - Use case: Shared state, WebSocket connections
 * 
 * WORKLETS:
 * - Lightweight workers for specific tasks
 * - Types: Audio Worklet, Paint Worklet, Animation Worklet
 * - Low-level control over rendering/audio pipeline
 * 
 * 
 * COMPARISON TABLE:
 * -----------------
 * 
 * | Feature            | Main Thread | Web Worker | Service Worker | Shared Worker |
 * |--------------------|-------------|------------|----------------|---------------|
 * | DOM Access         | ✅          | ❌         | ❌             | ❌            |
 * | Separate Thread    | ❌          | ✅         | ✅             | ✅            |
 * | Network Intercept  | ❌          | ❌         | ✅             | ❌            |
 * | Offline Support    | ❌          | ❌         | ✅             | ❌            |
 * | Shared Across Tabs | N/A         | ❌         | ✅             | ✅            |
 * | Lifecycle          | Page        | Page       | Independent    | Shared        |
 * | True Parallelism   | ❌          | ✅         | ✅             | ✅            |
 * 
 * 
 * HOW WORKERS FIT INTO ASYNC PROGRAMMING:
 * ----------------------------------------
 * 
 * EVENT LOOP (Main Thread):
 * - Handles I/O asynchronously (fetch, timers)
 * - Single-threaded concurrency
 * - Non-blocking but sequential execution
 * 
 * WEB WORKERS:
 * - Handle CPU-intensive tasks in parallel
 * - Multi-threaded parallelism
 * - True simultaneous execution on multiple cores
 * 
 * 🎯 KEY INSIGHT:
 * Event Loop = Async programming via CONCURRENCY (I/O operations)
 * Web Workers = Async programming via PARALLELISM (CPU operations)
 * 
 * Together, they provide:
 * ✅ Non-blocking I/O (Event Loop)
 * ✅ Parallel computation (Workers)
 * ✅ Responsive UI (Both working together)
 * 
 * 
 * WHEN TO USE WHAT?
 * -----------------
 * 
 * USE EVENT LOOP (Normal Async):
 * - Network requests (fetch, axios)
 * - File operations
 * - Timers and animations
 * - User interactions
 * - Database queries
 * 
 * USE WEB WORKERS:
 * - Image/video processing
 * - Large data parsing/sorting
 * - Cryptography
 * - Complex calculations
 * - Game physics
 * 
 * USE SERVICE WORKERS:
 * - Offline functionality
 * - Caching strategies
 * - Push notifications
 * - Background sync
 * - PWAs
 * 
 * 
 * EXAMPLE: COMBINING EVENT LOOP + WEB WORKERS:
 * ---------------------------------------------
 * 
 * // Fetch data asynchronously (Event Loop handles this)
 * fetch('/api/data')
 *     .then(response => response.json())
 *     .then(data => {
 *         // Heavy processing in Worker (parallel execution)
 *         const worker = new Worker('process.js');
 *         worker.postMessage(data);
 *         
 *         worker.onmessage = (event) => {
 *             // Update UI with processed result
 *             updateUI(event.data);
 *         };
 *     });
 * 
 * // Main thread stays responsive throughout!
 * // - Fetch doesn't block (Event Loop)
 * // - Processing doesn't block (Web Worker)
 * // - UI updates smoothly (Main thread available)
 * 
 * 
 * 🎯 FINAL UNDERSTANDING:
 * -----------------------
 * JavaScript's async programming ecosystem:
 * 
 * 1. Event Loop: Handles async I/O via CONCURRENCY
 * 2. Web Workers: Handle CPU tasks via PARALLELISM
 * 3. Service Workers: Handle offline/caching via BACKGROUND PROCESSING
 * 
 * All three work together to make JavaScript capable of:
 * ✅ Non-blocking operations
 * ✅ Parallel processing
 * ✅ Responsive user interfaces
 * ✅ Offline-first applications
 * 
 * This is how JavaScript, despite being single-threaded, competes with 
 * multi-threaded languages in building modern, performant applications!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * MULTIPLE FETCH CALLS - CONCURRENT OR PARALLEL?
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * THE COMMON CONFUSION:
 * ---------------------
 * When we call fetch() multiple times, are they:
 * - Executed sequentially (one after another)?
 * - Executed concurrently (overlapping in time)?
 * - Executed in parallel (simultaneously on different threads)?
 * 
 * ANSWER: They execute CONCURRENTLY but NOT in true parallelism (in JavaScript itself)
 * 
 * 
 * WHAT ACTUALLY HAPPENS:
 * ----------------------
 * 
 * SCENARIO 1: Multiple fetch() calls back-to-back
 * 
 * fetch('https://api.example.com/users');
 * fetch('https://api.example.com/posts');
 * fetch('https://api.example.com/comments');
 * 
 * Execution Timeline:
 * -------------------
 * 
 * Time 0ms:  fetch('users') called
 *            ↓
 *            JavaScript: "Hey Web API, start network request for users"
 *            JavaScript: Immediately returns Promise (pending)
 *            JavaScript: Continues to next line (NON-BLOCKING)
 * 
 * Time 1ms:  fetch('posts') called
 *            ↓
 *            JavaScript: "Hey Web API, start network request for posts"
 *            JavaScript: Immediately returns Promise (pending)
 *            JavaScript: Continues to next line
 * 
 * Time 2ms:  fetch('comments') called
 *            ↓
 *            JavaScript: "Hey Web API, start network request for comments"
 *            JavaScript: Immediately returns Promise (pending)
 *            JavaScript: Done executing synchronous code
 * 
 * Meanwhile (in parallel, handled by Browser/OS):
 * Time 0-200ms:   Network request for 'users' in progress
 * Time 1-150ms:   Network request for 'posts' in progress
 * Time 2-180ms:   Network request for 'comments' in progress
 * 
 * Time 150ms: 'posts' response arrives → callback queued in Microtask Queue
 * Time 180ms: 'comments' response arrives → callback queued in Microtask Queue
 * Time 200ms: 'users' response arrives → callback queued in Microtask Queue
 * 
 * 
 * 🎯 KEY INSIGHT:
 * ---------------
 * - JavaScript code execution: SEQUENTIAL (one line at a time)
 * - fetch() initiation: SEQUENTIAL (called one after another, ~1-2ms apart)
 * - Network requests: CONCURRENT (all happening at the same time in Web API/OS)
 * - Network I/O: TRUE PARALLELISM (handled by OS networking stack)
 * 
 * 
 * DETAILED BREAKDOWN:
 * -------------------
 * 
 * 1. JAVASCRIPT SIDE (Single-threaded):
 *    - fetch() function calls execute sequentially
 *    - Each call takes ~1-2 milliseconds
 *    - Returns Promise immediately (doesn't wait for response)
 *    - Moves to next line without blocking
 * 
 * 2. WEB API / BROWSER SIDE (Multi-threaded):
 *    - Network requests handled by browser's networking stack
 *    - Each request runs on separate OS thread
 *    - Multiple network requests happen simultaneously
 *    - This is TRUE PARALLELISM (different CPU cores/threads)
 * 
 * 3. OPERATING SYSTEM SIDE:
 *    - Multiple TCP connections opened
 *    - Network I/O handled by kernel
 *    - Multiple threads handling socket operations
 *    - Hardware (network card) sends packets in parallel
 * 
 * 
 * VISUAL REPRESENTATION:
 * ----------------------
 * 
 *     JAVASCRIPT THREAD (Single-threaded, Sequential)
 *     ┌─────────────────────────────────────────────────────────┐
 *     │ 0ms   fetch('users')   → Returns Promise immediately    │
 *     │ 1ms   fetch('posts')   → Returns Promise immediately    │
 *     │ 2ms   fetch('comments')→ Returns Promise immediately    │
 *     │ 3ms   (Call Stack empty, waiting for responses)         │
 *     └─────────────────────────────────────────────────────────┘
 *                            ↓ Delegates to
 *     ┌─────────────────────────────────────────────────────────┐
 *     │            WEB API / BROWSER (Multi-threaded)           │
 *     │                                                         │
 *     │  Thread 1: [========== users request ==========] 200ms  │
 *     │  Thread 2: [===== posts request ======] 150ms           │
 *     │  Thread 3: [======= comments request =======] 180ms     │
 *     │                                                         │
 *     │  All three network requests happening SIMULTANEOUSLY    │
 *     │  (True Parallelism on different threads)               │
 *     └─────────────────────────────────────────────────────────┘
 *                            ↓ When complete
 *     ┌─────────────────────────────────────────────────────────┐
 *     │              MICROTASK QUEUE                            │
 *     │  150ms: [posts .then callback]                          │
 *     │  180ms: [comments .then callback]                       │
 *     │  200ms: [users .then callback]                          │
 *     └─────────────────────────────────────────────────────────┘
 *                            ↓ Processed by
 *     ┌─────────────────────────────────────────────────────────┐
 *     │        EVENT LOOP (Back to JavaScript Thread)           │
 *     │  Executes callbacks one by one (Sequential)             │
 *     └─────────────────────────────────────────────────────────┘
 * 
 * 
 * SCENARIO 2: Promise.all() with multiple fetch()
 * ------------------------------------------------
 * 
 * const promises = Promise.all([
 *     fetch('https://api.example.com/users'),
 *     fetch('https://api.example.com/posts'),
 *     fetch('https://api.example.com/comments')
 * ]);
 * 
 * promises.then(([users, posts, comments]) => {
 *     console.log('All requests completed!');
 * });
 * 
 * 
 * WHAT HAPPENS:
 * -------------
 * 
 * Step 1: Array of fetch() calls evaluated
 *    - fetch('users') called → Promise 1 (pending)
 *    - fetch('posts') called → Promise 2 (pending)
 *    - fetch('comments') called → Promise 3 (pending)
 *    - All three calls happen within ~2-3ms
 * 
 * Step 2: Promise.all() creates wrapper Promise
 *    - Monitors all three Promises
 *    - Waits for ALL to resolve (or ANY to reject)
 *    - Doesn't start the requests (they're already started!)
 * 
 * Step 3: Network requests happen concurrently
 *    - All three requests in flight simultaneously
 *    - Handled by browser's networking layer
 *    - True parallelism in the network I/O
 * 
 * Step 4: Promises resolve in order they complete
 *    - Whichever finishes first, its Promise resolves
 *    - Promise.all() tracks all of them
 *    - When last one finishes, Promise.all() resolves
 * 
 * Step 5: .then() callback executes
 *    - Gets results in ORIGINAL ORDER (not completion order)
 *    - All three responses available at once
 * 
 * 
 * 🎯 IMPORTANT: Promise.all() does NOT start requests!
 * The requests start when fetch() is called.
 * Promise.all() only coordinates when to run the callback.
 * 
 * 
 * SCENARIO 3: Sequential vs Concurrent fetch()
 * ---------------------------------------------
 * 
 * BAD - SEQUENTIAL (Slower):
 * --------------------------
 * const users = await fetch('https://api.example.com/users');
 * const posts = await fetch('https://api.example.com/posts');
 * const comments = await fetch('https://api.example.com/comments');
 * 
 * Timeline:
 * 0ms:     Start users request
 * 200ms:   Users complete → Start posts request
 * 350ms:   Posts complete → Start comments request
 * 530ms:   Comments complete
 * Total:   530ms (requests happen one after another)
 * 
 * 
 * GOOD - CONCURRENT (Faster):
 * ---------------------------
 * const [users, posts, comments] = await Promise.all([
 *     fetch('https://api.example.com/users'),
 *     fetch('https://api.example.com/posts'),
 *     fetch('https://api.example.com/comments')
 * ]);
 * 
 * Timeline:
 * 0ms:     Start all three requests simultaneously
 * 200ms:   Users complete
 * 150ms:   Posts complete
 * 180ms:   Comments complete
 * Total:   200ms (longest request determines total time)
 * 
 * 
 * COMPARISON:
 * -----------
 * Sequential: 200 + 150 + 180 = 530ms (sum of all)
 * Concurrent: max(200, 150, 180) = 200ms (longest one)
 * 
 * Performance gain: 530ms → 200ms (2.65x faster!)
 * 
 * 
 * TECHNICAL EXPLANATION:
 * ----------------------
 * 
 * CONCURRENT:
 * - Multiple operations in progress at overlapping times
 * - JavaScript code: Sequential (one fetch() call after another)
 * - Network I/O: Concurrent (all requests active simultaneously)
 * - Enabled by: Non-blocking I/O + Event Loop
 * 
 * PARALLEL:
 * - Multiple operations executing simultaneously on different processors
 * - JavaScript code: Not parallel (single thread)
 * - Network I/O: Truly parallel (browser's network threads + OS)
 * - JavaScript callbacks: Sequential (Event Loop executes one at a time)
 * 
 * 
 * SO, ARE MULTIPLE FETCH CALLS CONCURRENT OR PARALLEL?
 * -----------------------------------------------------
 * 
 * ✅ CONCURRENT: Yes! Multiple requests are in-flight at the same time
 * ✅ PARALLEL: Yes! But only at the network/OS level, not in JavaScript code
 * ❌ PARALLEL: No, in JavaScript code itself (single-threaded)
 * 
 * BREAKDOWN BY LAYER:
 * 
 * 1. JavaScript Code Execution: SEQUENTIAL
 *    - fetch() calls execute one line at a time
 *    - Event Loop processes callbacks one at a time
 * 
 * 2. Network Requests: CONCURRENT + PARALLEL
 *    - All requests active simultaneously (concurrent)
 *    - Handled by different threads/processes (parallel)
 *    - Operating system level parallelism
 * 
 * 3. Response Handling: SEQUENTIAL
 *    - Promises resolve when data arrives
 *    - .then() callbacks execute one at a time
 *    - Event Loop coordination
 * 
 * 
 * ANALOGY:
 * --------
 * Think of a restaurant with ONE waiter (JavaScript) and MULTIPLE cooks (Network threads):
 * 
 * SEQUENTIAL:
 * Waiter takes order → Goes to kitchen → Waits for food → Serves → Takes next order
 * (Waiter wastes time waiting)
 * 
 * CONCURRENT:
 * Waiter takes order 1 → Passes to cook 1 → Immediately takes order 2 → Passes to cook 2
 * → Takes order 3 → Passes to cook 3 → All cooks working simultaneously
 * (Waiter doesn't wait, cooks work in parallel)
 * 
 * 
 * KEY INSIGHTS:
 * -------------
 * 
 * 1. fetch() INITIATES requests but doesn't wait for them
 *    - Returns Promise immediately
 *    - Actual work delegated to Web API
 * 
 * 2. Multiple fetch() calls create CONCURRENT network requests
 *    - Even if called sequentially in code
 *    - Network layer handles them in parallel
 * 
 * 3. Promise.all() COORDINATES results, doesn't start requests
 *    - Requests already started when fetch() called
 *    - Just waits for all to complete
 * 
 * 4. JavaScript remains SINGLE-THREADED
 *    - Only one JavaScript code executing at a time
 *    - Concurrency achieved through event loop + Web APIs
 * 
 * 5. Network I/O happens in TRUE PARALLEL
 *    - Browser uses multiple threads
 *    - Operating system handles concurrent connections
 *    - Network card sends/receives packets simultaneously
 * 
 * 
 * PRACTICAL EXAMPLE WITH TIMING:
 * -------------------------------
 * 
 * console.log('Start:', Date.now());
 * 
 * const p1 = fetch('https://jsonplaceholder.typicode.com/posts/1');
 * console.log('fetch 1 called:', Date.now()); // ~1ms later
 * 
 * const p2 = fetch('https://jsonplaceholder.typicode.com/posts/2');
 * console.log('fetch 2 called:', Date.now()); // ~2ms later
 * 
 * const p3 = fetch('https://jsonplaceholder.typicode.com/posts/3');
 * console.log('fetch 3 called:', Date.now()); // ~3ms later
 * 
 * Promise.all([p1, p2, p3]).then(() => {
 *     console.log('All done:', Date.now()); // ~200ms later (NOT 600ms!)
 * });
 * 
 * OUTPUT TIMELINE:
 * Start: 1000
 * fetch 1 called: 1001  (1ms to call fetch)
 * fetch 2 called: 1002  (1ms to call fetch)
 * fetch 3 called: 1003  (1ms to call fetch)
 * All done: 1203        (200ms for slowest network request)
 * 
 * Total time: ~203ms (3ms for calls + 200ms for network)
 * NOT: ~603ms (if they were truly sequential)
 * 
 * 
 * 🎯 FINAL ANSWER:
 * ----------------
 * 
 * When you call fetch() multiple times:
 * 
 * 1. The fetch() FUNCTION CALLS are sequential (one after another in code)
 * 2. The fetch() calls INITIATE requests concurrently (all start within milliseconds)
 * 3. The NETWORK REQUESTS run in parallel (browser/OS handles them simultaneously)
 * 4. The RESPONSES arrive at different times (based on network speed)
 * 5. The CALLBACKS execute sequentially (Event Loop processes one at a time)
 * 
 * So the answer is: BOTH concurrent (in terms of timing) AND parallel (in terms of actual I/O),
 * but JavaScript code itself remains single-threaded and sequential!
 * 
 * This is the beauty of JavaScript's async model: You write sequential code, but the runtime
 * provides concurrency for I/O operations automatically!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════
 * EVENT LOOP'S ROLE IN FETCH() - DETAILED CLARIFICATION
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * COMMON MISCONCEPTION:
 * ---------------------
 * Does the Event Loop handle fetch() calls and manage concurrent requests?
 * 
 * ANSWER: NO! The Event Loop handles CALLBACKS, not the fetch() calls themselves.
 * 
 * 
 * WHAT THE EVENT LOOP ACTUALLY DOES:
 * -----------------------------------
 * 
 * ✅ Event Loop handles Promise response CALLBACKS (when responses arrive)
 * ✅ Event Loop executes callbacks SEQUENTIALLY (one at a time)
 * ✅ Event Loop processes them in ORDER they got resolved
 * ❌ Event Loop does NOT initiate fetch() calls
 * ❌ Event Loop does NOT manage network requests
 * 
 * 
 * PHASE 1: CALLING fetch() - NO EVENT LOOP INVOLVED
 * --------------------------------------------------
 * 
 * const promise = fetch('/api/data');
 * // This line executes SYNCHRONOUSLY on the call stack
 * // fetch() just says "Hey Web API, start this request"
 * // Returns Promise immediately
 * // Event Loop is NOT involved here!
 * 
 * What happens:
 * 1. JavaScript calls fetch() (synchronous call on Call Stack)
 * 2. fetch() delegates to Web API (browser/Node.js)
 * 3. Returns Promise object immediately
 * 4. Execution continues to next line
 * 5. Event Loop is idle at this point (nothing to do yet)
 * 
 * 
 * VISUAL - Phase 1: Initiating fetch() - NO Event Loop
 * -----------------------------------------------------
 * 
 *     ┌─────────────────────────────────────┐
 *     │       CALL STACK                    │
 *     │                                     │
 *     │  fetch('/users')  ← Executing       │
 *     │                                     │
 *     └─────────────────────────────────────┘
 *                ↓ Delegates to
 *     ┌─────────────────────────────────────┐
 *     │       WEB API                       │
 *     │                                     │
 *     │  Start network request              │
 *     │  Return Promise to JavaScript       │
 *     │                                     │
 *     └─────────────────────────────────────┘
 * 
 *     Event Loop: 😴 (Not involved yet)
 * 
 * 
 * PHASE 2: RESPONSE ARRIVES - EVENT LOOP TAKES OVER
 * --------------------------------------------------
 * 
 * fetch('/api/data').then(response => {
 *     console.log('Got response!');
 * });
 * 
 * When network response arrives:
 * 1. Web API: "Response ready!"
 * 2. Web API: Adds .then() callback to Microtask Queue
 * 3. Event Loop: "Call stack empty? Let me check queues..."
 * 4. Event Loop: Takes callback from Microtask Queue
 * 5. Event Loop: Pushes callback to Call Stack
 * 6. Callback executes!
 * 
 * 
 * VISUAL - Phase 2: Response Arrives - Event Loop Takes Over
 * -----------------------------------------------------------
 * 
 *     ┌─────────────────────────────────────┐
 *     │       WEB API                       │
 *     │                                     │
 *     │  Network response arrived! ✓        │
 *     │  Add .then() callback to queue →   │
 *     │                                     │
 *     └─────────────────────────────────────┘
 *                ↓
 *     ┌─────────────────────────────────────┐
 *     │    MICROTASK QUEUE                  │
 *     │                                     │
 *     │  [.then callback]  ← Waiting        │
 *     │                                     │
 *     └─────────────────────────────────────┘
 *                ↑
 *     ┌─────────────────────────────────────┐
 *     │      EVENT LOOP                     │
 *     │                                     │
 *     │  1. Check Call Stack (empty?)       │
 *     │  2. Take callback from queue        │
 *     │  3. Put on Call Stack               │
 *     │  4. Execute it!                     │
 *     │                                     │
 *     └─────────────────────────────────────┘
 *                ↓
 *     ┌─────────────────────────────────────┐
 *     │       CALL STACK                    │
 *     │                                     │
 *     │  .then(callback)  ← Executing       │
 *     │                                     │
 *     └─────────────────────────────────────┘
 * 
 * 
 * ORDER OF EXECUTION - RESPONSES PROCESSED AS THEY ARRIVE
 * --------------------------------------------------------
 * 
 * Scenario: Three fetch() calls
 * 
 * fetch('/users')    // Takes 200ms
 *     .then(() => console.log('Users done'));
 * 
 * fetch('/posts')    // Takes 150ms
 *     .then(() => console.log('Posts done'));
 * 
 * fetch('/comments') // Takes 180ms
 *     .then(() => console.log('Comments done'));
 * 
 * 
 * Timeline:
 * ---------
 * 0ms:    All three fetch() calls execute synchronously
 *         All three network requests start (Web API handles them)
 *         All three return Promises immediately
 *         Call Stack becomes empty
 * 
 * 150ms:  /posts response arrives FIRST
 *         → .then() callback added to Microtask Queue
 *         → Event Loop sees it
 *         → Moves to Call Stack
 *         → Executes: console.log('Posts done')
 * 
 * 180ms:  /comments response arrives SECOND
 *         → .then() callback added to Microtask Queue
 *         → Event Loop sees it
 *         → Moves to Call Stack
 *         → Executes: console.log('Comments done')
 * 
 * 200ms:  /users response arrives THIRD
 *         → .then() callback added to Microtask Queue
 *         → Event Loop sees it
 *         → Moves to Call Stack
 *         → Executes: console.log('Users done')
 * 
 * 
 * OUTPUT ORDER (based on resolution order):
 * Posts done       (150ms - resolved first)
 * Comments done    (180ms - resolved second)
 * Users done       (200ms - resolved third)
 * 
 * 
 * COMPLETE EXAMPLE WITH SYNC CODE:
 * ---------------------------------
 * 
 * console.log('1. Start');
 * 
 * fetch('/users')    // 200ms
 *     .then(() => console.log('4. Users done'));
 * 
 * fetch('/posts')    // 150ms
 *     .then(() => console.log('3. Posts done'));
 * 
 * console.log('2. Sync code continues');
 * 
 * 
 * EXECUTION TIMELINE:
 * -------------------
 * 0ms:    Execute console.log('1. Start')            → OUTPUT: "1. Start"
 * 1ms:    Call fetch('/users') - delegates to Web API
 * 2ms:    Call fetch('/posts') - delegates to Web API
 * 3ms:    Execute console.log('2. Sync code...')     → OUTPUT: "2. Sync code continues"
 * 4ms:    Call Stack empty, Event Loop waits...
 * 
 * 150ms:  /posts response arrives
 *         → Callback added to Microtask Queue
 *         → Event Loop moves it to Call Stack
 *         → Execute console.log('3. Posts done')     → OUTPUT: "3. Posts done"
 * 
 * 200ms:  /users response arrives
 *         → Callback added to Microtask Queue
 *         → Event Loop moves it to Call Stack
 *         → Execute console.log('4. Users done')     → OUTPUT: "4. Users done"
 * 
 * 
 * FINAL OUTPUT:
 * 1. Start
 * 2. Sync code continues
 * 3. Posts done          (resolved first)
 * 4. Users done          (resolved second)
 * 
 * 
 * KEY INSIGHTS:
 * -------------
 * 
 * 1. FETCH() CALL ITSELF:
 *    - Executes synchronously on Call Stack
 *    - Just delegates to Web API
 *    - Returns Promise immediately
 *    - Event Loop NOT involved
 * 
 * 2. PROMISE CALLBACKS (.then()):
 *    - Added to Microtask Queue when Promise resolves
 *    - Event Loop takes them from queue
 *    - Executes them ONE AT A TIME
 *    - In the ORDER they were queued (= order they resolved)
 * 
 * 3. EVENT LOOP'S ROLE:
 *    - NOT starting network requests
 *    - YES handling callbacks when responses arrive
 *    - YES coordinating sequential execution
 *    - YES managing concurrency of callback execution
 * 
 * 
 * CONCURRENCY MODEL BREAKDOWN:
 * ----------------------------
 * 
 * CONCURRENT PART (Web API/Browser):
 * - Multiple fetch() requests in-flight simultaneously
 * - Handled by Web API/Browser/OS (multi-threaded)
 * - Network I/O happens in parallel
 * - Event Loop is NOT managing this part
 * 
 * SEQUENTIAL PART (Event Loop):
 * - Promise callbacks execute ONE AT A TIME
 * - Event Loop coordinates this
 * - Even though responses arrived concurrently
 * - Callbacks processed in order they resolved
 * 
 * 
 * WHAT EVENT LOOP CARES ABOUT:
 * ----------------------------
 * 
 * // Event Loop doesn't care about this:
 * fetch('/api/data')  ← Just delegating to Web API
 * 
 * // Event Loop DOES care about this:
 * .then(response => {
 *     // This callback needs to be executed!
 *     // Event Loop moves it from queue to Call Stack
 *     console.log(response);
 * })
 * 
 * 
 * EVENT LOOP = TRAFFIC CONTROLLER ANALOGY:
 * -----------------------------------------
 * 
 * The Event Loop is like a traffic controller at an intersection:
 * 
 * ❌ Doesn't drive the cars (doesn't do network I/O)
 * ❌ Doesn't start the cars (doesn't initiate fetch calls)
 * ✅ Controls when each car can enter the intersection (Call Stack)
 * ✅ Ensures only one car at a time (sequential execution)
 * ✅ Manages the flow efficiently (concurrency coordination)
 * ✅ Prioritizes emergency vehicles (Microtasks over Macrotasks)
 * 
 * 
 * MULTIPLE FETCH CALLS - WHO DOES WHAT:
 * --------------------------------------
 * 
 * fetch('/users');    ← JavaScript: Synchronous call
 * fetch('/posts');    ← JavaScript: Synchronous call
 * fetch('/comments'); ← JavaScript: Synchronous call
 * 
 * ↓ Delegates to
 * 
 * Web API: Handles all three network requests in parallel
 * OS: Multiple threads, multiple TCP connections
 * Network: Packets sent/received simultaneously
 * 
 * ↓ When responses arrive
 * 
 * Microtask Queue: [posts callback] [comments callback] [users callback]
 * 
 * ↓ Event Loop takes over
 * 
 * Call Stack: Executes callbacks ONE AT A TIME in order
 * 
 * 
 * 🎯 FINAL UNDERSTANDING:
 * -----------------------
 * 
 * Q: Does Event Loop handle concurrent fetch() calls?
 * A: NO - Web API handles concurrent network requests
 * 
 * Q: What does Event Loop handle?
 * A: YES - Event Loop handles the callbacks when responses arrive
 * 
 * Q: Are callbacks executed concurrently?
 * A: NO - Event Loop executes them sequentially (one at a time)
 * 
 * Q: In what order are callbacks executed?
 * A: In the order Promises resolved (responses arrived)
 * 
 * Q: So what makes fetch() concurrent?
 * A: The Web API/Browser/OS handles multiple network requests simultaneously
 * 
 * 
 * THE BIG PICTURE:
 * ----------------
 * 
 * CONCURRENCY: Multiple network requests in-flight (Web API/OS handles this)
 * SEQUENTIAL: Callbacks execute one at a time (Event Loop handles this)
 * 
 * JavaScript achieves concurrency by:
 * 1. Delegating I/O to Web APIs (concurrent/parallel execution)
 * 2. Using Event Loop to coordinate callbacks (sequential execution)
 * 3. Never blocking the main thread
 * 
 * This is the genius of JavaScript's async model! 🚀
 * 
 */
