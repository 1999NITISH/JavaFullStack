export const fullStackQA = [

  // ─── JAVA CORE ──────────────────────────────────────────────────────────────
  {
    question: "Explain the difference between '==' and '.equals()' in Java.",
    answer: "In Java, '==' compares memory references (addresses), while '.equals()' compares the actual content of objects. For primitives, '==' compares values directly. For objects like String, always use '.equals()' to compare values."
  },
  {
    question: "What is the difference between an Abstract Class and an Interface in Java 8+?",
    answer: "An abstract class can have instance variables, constructors, and concrete methods. A class can only extend one abstract class. An Interface defines a contract; since Java 8 it can have default and static methods. A class can implement multiple interfaces, making them more flexible for design."
  },
  {
    question: "How does Garbage Collection work in Java?",
    answer: "The JVM automatically manages memory. The Garbage Collector identifies objects with no active references and reclaims their heap space. It uses a generational approach: Young Generation (Eden, Survivor spaces) handles short-lived objects, while the Old Generation holds long-lived ones. Major GC events that collect the Old Gen are called Full GC."
  },
  {
    question: "What is the difference between a HashMap and a ConcurrentHashMap?",
    answer: "HashMap is not thread-safe and can cause race conditions with concurrent access. ConcurrentHashMap is thread-safe and uses segment-level (or bucket-level in Java 8+) locking, allowing multiple threads to read and write without blocking the entire map, giving much better performance than a synchronized HashMap."
  },
  {
    question: "What are Java Streams? Give an example of when you would use them.",
    answer: "Java Streams (java.util.stream) allow functional-style operations on collections of objects. They support operations like filter, map, sorted, and collect. Example: list.stream().filter(s -> s.startsWith('A')).map(String::toUpperCase).collect(Collectors.toList()). They make data processing pipelines concise and readable."
  },
  {
    question: "What is the difference between 'throw' and 'throws' in Java?",
    answer: "'throw' is used inside a method body to explicitly throw an exception object (e.g., throw new IllegalArgumentException()). 'throws' is used in a method signature to declare that the method might throw a checked exception, requiring the caller to handle or propagate it."
  },
  {
    question: "Explain the concept of immutability in Java. How do you create an immutable class?",
    answer: "An immutable object's state cannot be modified after creation. To create one: declare the class as 'final', make all fields 'private final', do not provide setters, and if a field is a mutable object, return a deep copy in the getter. String in Java is a classic example of an immutable class."
  },
  {
    question: "What is the difference between Checked and Unchecked exceptions in Java?",
    answer: "Checked exceptions (e.g., IOException, SQLException) are checked at compile time; you must handle them with try-catch or declare them with 'throws'. Unchecked exceptions (e.g., NullPointerException, ArrayIndexOutOfBoundsException) extend RuntimeException and do not require mandatory handling."
  },
  {
    question: "What is a functional interface in Java 8? Give an example.",
    answer: "A functional interface has exactly one abstract method. It can be annotated with @FunctionalInterface. Examples include Runnable (run()), Callable (call()), and Comparator (compare()). They are the foundation for lambda expressions, e.g., Runnable r = () -> System.out.println('Hello')."
  },
  {
    question: "What is the difference between ArrayList and LinkedList in Java?",
    answer: "ArrayList uses a dynamic array internally. It provides O(1) random access but O(n) insertions/deletions in the middle. LinkedList uses a doubly-linked list, providing O(1) insertions/deletions at the head or tail but O(n) random access. Use ArrayList for frequent reads and LinkedList for frequent insertions/deletions."
  },
  {
    question: "What is the volatile keyword in Java?",
    answer: "The 'volatile' keyword ensures that a variable's value is always read from and written to main memory, not a CPU cache. It prevents thread-level visibility issues in a multi-threaded environment. It guarantees visibility but NOT atomicity, so for compound operations like i++, you still need synchronization or AtomicInteger."
  },
  {
    question: "Explain the SOLID principles.",
    answer: "SOLID: S = Single Responsibility (a class has one reason to change), O = Open/Closed (open for extension, closed for modification), L = Liskov Substitution (subtypes must be substitutable for their base types), I = Interface Segregation (prefer small, specific interfaces), D = Dependency Inversion (depend on abstractions, not concretions)."
  },

  // ─── SPRING BOOT ─────────────────────────────────────────────────────────────
  {
    question: "What is Dependency Injection and how does Spring implement it?",
    answer: "Dependency Injection (DI) is an Inversion of Control pattern where dependencies are provided to an object rather than the object creating them. Spring implements DI using the @Autowired annotation, injecting beans managed by the Spring IoC container via constructor injection (preferred), setter injection, or field injection."
  },
  {
    question: "What is the difference between @Component, @Service, and @Repository?",
    answer: "@Component is a generic stereotype. @Service is a specialization for business logic layers — it conveys intent to developers. @Repository is used for the data access layer (DAOs) and provides an additional benefit: it translates persistence-layer exceptions into Spring's unified DataAccessException hierarchy."
  },
  {
    question: "How does Spring Boot auto-configuration work?",
    answer: "When @SpringBootApplication is present, it enables @EnableAutoConfiguration. Spring Boot scans the classpath for specific libraries (e.g., spring-data-jpa) and uses @Conditional annotations to automatically create and configure beans only when certain conditions are met, eliminating the need for manual XML or Java configuration."
  },
  {
    question: "What is the purpose of Spring Security and how does JWT fit in?",
    answer: "Spring Security provides authentication (who are you?) and authorization (what can you do?). JWT fits as a stateless auth mechanism: after login, the server issues a signed JWT. On subsequent requests, a custom OncePerRequestFilter intercepts the token, validates its signature and expiry using a secret key, then sets the SecurityContext."
  },
  {
    question: "What is the difference between @RestController and @Controller?",
    answer: "@Controller is used in MVC apps to return view names (HTML pages rendered by a template engine). @RestController is a convenience annotation that combines @Controller and @ResponseBody, meaning every method automatically serializes its return value to JSON/XML and writes it to the HTTP response body."
  },
  {
    question: "What is Spring Data JPA and what problem does it solve?",
    answer: "Spring Data JPA eliminates boilerplate DAO code. By simply extending JpaRepository<Entity, ID>, you get CRUD operations (save, findById, findAll, delete) for free. You can also define custom queries using method names (findByEmail(String email)) or @Query annotations, without writing SQL or implementation code."
  },
  {
    question: "What is the difference between @Transactional(propagation = REQUIRED) and REQUIRES_NEW?",
    answer: "REQUIRED (default) joins an existing transaction if one is present; otherwise it creates a new one. REQUIRES_NEW always suspends any existing transaction and creates a completely new one. Use REQUIRES_NEW when you need a piece of logic (like logging) to commit independently of the outer transaction."
  },
  {
    question: "How do you handle exceptions globally in a Spring Boot REST API?",
    answer: "Use @ControllerAdvice (or @RestControllerAdvice) with @ExceptionHandler methods. This creates a centralized exception-handling component that intercepts exceptions thrown from any controller. You can map specific exceptions to specific HTTP status codes and return a structured error response body."
  },
  {
    question: "What is the Spring Bean lifecycle?",
    answer: "The lifecycle: 1) Container instantiates the bean, 2) Dependencies are injected, 3) @PostConstruct method runs (or InitializingBean.afterPropertiesSet()), 4) Bean is ready for use, 5) On shutdown, @PreDestroy method runs (or DisposableBean.destroy()). This allows custom initialization and cleanup logic."
  },
  {
    question: "What is application.properties vs application.yml in Spring Boot?",
    answer: "Both serve the same purpose — externalizing configuration. application.properties uses flat key=value pairs. application.yml uses YAML format with hierarchical, indented syntax which is more readable for nested configurations. Spring Boot supports both; YAML is preferred for complex configs."
  },

  // ─── REACT & FRONTEND ────────────────────────────────────────────────────────
  {
    question: "What is the Virtual DOM in React and how does it improve performance?",
    answer: "The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React re-renders components into the Virtual DOM, runs a 'diffing' algorithm to find the minimal changes, and then applies only those changes to the real DOM (reconciliation). This avoids costly full DOM re-renders."
  },
  {
    question: "Explain the useEffect hook. What does the dependency array do?",
    answer: "useEffect handles side effects (API calls, subscriptions, timers) in functional components. The dependency array controls when it runs: [] = only on mount, [var] = on mount and when 'var' changes, omitted = after every render. The returned cleanup function runs before the next effect or on component unmount."
  },
  {
    question: "What is Redux and how does it compare to Context API?",
    answer: "Redux is a standalone state management library with a single store, actions, and pure reducers. It's ideal for complex, high-frequency state updates and includes Redux DevTools for debugging. Context API is built into React and simpler to set up, but re-renders all consumers on every change — making it inefficient for large, frequently changing state."
  },
  {
    question: "What is the difference between useMemo and useCallback?",
    answer: "Both are optimization hooks. useMemo memoizes the result of a computation — it re-computes only when dependencies change. useCallback memoizes a function reference — the function is only recreated when dependencies change. useCallback is especially useful when passing callbacks to child components wrapped in React.memo to prevent unnecessary re-renders."
  },
  {
    question: "What are React keys and why are they important in lists?",
    answer: "Keys are special string attributes that help React identify which items in a list have changed, been added, or removed. They should be unique and stable (not array indexes). Without proper keys, React may re-render the wrong elements during reconciliation, causing bugs and performance issues."
  },
  {
    question: "What is the JavaScript Event Loop?",
    answer: "JavaScript is single-threaded. The Event Loop allows non-blocking async operations. Web APIs (like setTimeout) handle async tasks outside the main thread. Callbacks are placed in the Task Queue (macrotasks) or Microtask Queue (Promises). The Event Loop continuously checks if the Call Stack is empty, then processes microtasks first, then macrotasks."
  },
  {
    question: "What is the difference between 'null' and 'undefined' in JavaScript?",
    answer: "'undefined' means a variable has been declared but not assigned a value. 'null' is an explicit assignment representing the intentional absence of a value. typeof null returns 'object' (a historical bug), while typeof undefined returns 'undefined'. Use strict equality (===) to distinguish them."
  },
  {
    question: "What are React Hooks and why were they introduced?",
    answer: "Hooks (introduced in React 16.8) allow you to use state and other React features in functional components, eliminating the need for class components. useState, useEffect, useContext, useRef are core hooks. They solve issues with class components: confusing 'this', hard-to-reuse stateful logic, and complex lifecycle methods."
  },
  {
    question: "What is code splitting and lazy loading in React?",
    answer: "Code splitting breaks your app bundle into smaller chunks that are loaded on demand. React.lazy() and Suspense enable component-level lazy loading: const Dashboard = React.lazy(() => import('./Dashboard')). The chunk is only downloaded when the user navigates to that route, improving initial load time significantly."
  },
  {
    question: "Explain the concept of closures in JavaScript.",
    answer: "A closure is a function that has access to variables from its outer (enclosing) function scope, even after the outer function has returned. This happens because JavaScript functions maintain a reference to their lexical environment. Closures are used for data encapsulation, factory functions, and maintaining state in functional programming."
  },

  // ─── DATABASES ───────────────────────────────────────────────────────────────
  {
    question: "What is database normalization? Explain 1NF, 2NF, 3NF.",
    answer: "Normalization reduces data redundancy. 1NF: Atomic values only, no repeating groups. 2NF: Satisfies 1NF + every non-key attribute is fully dependent on the entire primary key (eliminates partial dependencies). 3NF: Satisfies 2NF + no non-key attribute depends on another non-key attribute (eliminates transitive dependencies)."
  },
  {
    question: "What is the difference between SQL and NoSQL databases?",
    answer: "SQL (relational): structured schema, ACID transactions, strong consistency, scales vertically. Examples: MySQL, PostgreSQL. NoSQL (non-relational): flexible schema, horizontal scaling, eventual consistency (often). Examples: MongoDB (documents), Cassandra (wide-column), Redis (key-value). NoSQL is better for massive scale and unstructured data."
  },
  {
    question: "What are database indexes and how do they impact performance?",
    answer: "An index (typically a B-Tree) speeds up data retrieval by creating a sorted pointer structure to rows. SELECT queries become much faster. However, indexes slow down INSERT, UPDATE, and DELETE because the index must be updated alongside the data. Only index columns frequently used in WHERE, JOIN, or ORDER BY clauses."
  },
  {
    question: "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?",
    answer: "INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right; unmatched right rows are NULL. FULL OUTER JOIN returns all rows from both tables; unmatched rows in either table appear as NULL."
  },
  {
    question: "What is a transaction? Explain ACID properties.",
    answer: "A transaction is a unit of work that must be completed entirely or not at all. ACID: Atomicity (all or nothing), Consistency (data remains valid before and after), Isolation (concurrent transactions don't interfere with each other), Durability (committed transactions survive system failures)."
  },
  {
    question: "What is the N+1 query problem in JPA/Hibernate?",
    answer: "The N+1 problem occurs when loading a list of N entities (1 query) and then fetching each entity's lazy-loaded associations one by one (N additional queries), causing N+1 total queries. Solution: use JOIN FETCH in JPQL, @EntityGraph, or Hibernate's @BatchSize annotation to load associations eagerly in one or a few queries."
  },
  {
    question: "What is Redis and what are its common use cases?",
    answer: "Redis is an in-memory key-value data store known for sub-millisecond latency. Common use cases: caching (store frequently accessed data), session management, rate limiting, pub/sub messaging, leaderboards (using sorted sets), and distributed locks. Its speed makes it ideal as a caching layer in front of a primary database."
  },

  // ─── MICROSERVICES & CLOUD ───────────────────────────────────────────────────
  {
    question: "How do microservices communicate? Explain synchronous vs asynchronous.",
    answer: "Synchronous: the caller sends a request and waits for a response. Done via HTTP/REST or gRPC. Simple but creates tight coupling and latency chains. Asynchronous: the caller publishes an event to a message broker (Kafka, RabbitMQ) and continues. The consumer processes the event independently. Better for resilience and scalability."
  },
  {
    question: "What is the Saga pattern in microservices?",
    answer: "Sagas manage distributed transactions without a global 2-phase commit. A Saga is a sequence of local transactions, each publishing an event. If a step fails, compensating transactions undo previous steps. Two types: Choreography (events trigger other services directly) and Orchestration (a central orchestrator commands each step)."
  },
  {
    question: "What is the difference between AWS EC2 and S3?",
    answer: "EC2 (Elastic Compute Cloud) provides resizable virtual servers (compute/processing power). You run your application code on EC2 instances. S3 (Simple Storage Service) is object storage for storing any amount of data (images, videos, backups, static files). EC2 is compute; S3 is storage."
  },
  {
    question: "What is Docker and why is it used?",
    answer: "Docker is a containerization platform that packages an application and all its dependencies (libraries, configs) into a portable container image. Containers run consistently across any environment (dev, staging, production). Benefits: fast startup, environment consistency, resource efficiency, and easy scaling."
  },
  {
    question: "What is Kubernetes and what problem does it solve?",
    answer: "Kubernetes (K8s) is a container orchestration system that automates the deployment, scaling, and management of containerized applications. It solves: scheduling containers across a cluster of nodes, load balancing, self-healing (restarting failed containers), rolling updates, and secret/config management."
  },
  {
    question: "What is an API Gateway in microservices?",
    answer: "An API Gateway is a single entry point for all client requests to backend microservices. It handles cross-cutting concerns like authentication/authorization, SSL termination, rate limiting, request routing, and response aggregation. Examples: AWS API Gateway, Kong, Netflix Zuul, Spring Cloud Gateway."
  },
  {
    question: "What is the Circuit Breaker pattern?",
    answer: "The Circuit Breaker prevents a failing downstream service from causing cascading failures. It has three states: Closed (requests flow normally), Open (requests fail immediately after a failure threshold is exceeded), Half-Open (a test request is sent to check if the service recovered). Resilience4j and Hystrix are popular implementations."
  },

  // ─── DSA ─────────────────────────────────────────────────────────────────────
  {
    question: "What is the time complexity of binary search and when can you use it?",
    answer: "Binary search has O(log n) time complexity. It works on sorted arrays by repeatedly halving the search space. Each step eliminates half the remaining elements. You can only use it when the data is sorted (or can be sorted). It's significantly faster than O(n) linear search for large datasets."
  },
  {
    question: "What is the difference between a Stack and a Queue?",
    answer: "A Stack is LIFO (Last In, First Out) — the last element pushed is the first popped. Operations: push, pop, peek. Used for function call stacks, undo operations. A Queue is FIFO (First In, First Out) — the first element enqueued is first dequeued. Operations: enqueue, dequeue. Used for task scheduling, BFS traversal."
  },
  {
    question: "How does a HashMap handle collisions internally in Java?",
    answer: "A HashMap maps keys to buckets using hashCode(). Collisions occur when multiple keys share a bucket. Pre-Java 8: chaining with a linked list. Java 8+: when a bucket's linked list exceeds 8 elements, it automatically converts to a Red-Black Tree, improving worst-case lookup from O(n) to O(log n)."
  },
  {
    question: "Explain Big O notation and give examples of O(1), O(n), and O(n²).",
    answer: "Big O describes the worst-case time or space complexity as input size (n) grows. O(1) — constant time: array access by index. O(n) — linear: iterating through a list. O(log n) — logarithmic: binary search. O(n log n) — merge sort. O(n²) — quadratic: nested loops like bubble sort. Lower is generally better."
  },
  {
    question: "What is the difference between BFS and DFS graph traversal?",
    answer: "BFS (Breadth-First Search) explores neighbors level by level using a Queue. It finds the shortest path in unweighted graphs. DFS (Depth-First Search) explores as far as possible down a branch before backtracking, using a Stack (or recursion). DFS is used for topological sort, cycle detection, and path finding."
  },
  {
    question: "What is dynamic programming? Give an example.",
    answer: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping sub-problems, solving each once, and storing results (memoization or tabulation). Classic example: Fibonacci — instead of recalculating fib(n-1) repeatedly, store computed values. Other examples: Knapsack problem, Longest Common Subsequence."
  },
  {
    question: "What is a binary search tree (BST) and what is its worst-case time complexity?",
    answer: "A BST is a binary tree where the left child is always less than the parent and the right child is always greater. Average case: O(log n) for search, insert, delete. Worst case: O(n), when the tree is completely unbalanced (e.g., inserting sorted data creates a linked list). AVL and Red-Black trees maintain O(log n) by self-balancing."
  },

  // ─── SYSTEM DESIGN ───────────────────────────────────────────────────────────
  {
    question: "How would you design a URL shortener like bit.ly?",
    answer: "Key components: 1) Generate a short unique key (Base62 encoding of an auto-increment ID or MD5 hash), 2) Store the mapping in a DB (short_key -> original_url), 3) Cache hot URLs in Redis, 4) On redirect, look up the key and return HTTP 301/302. For scale: use consistent hashing, CDN for redirects, and sharding the DB."
  },
  {
    question: "How do you scale a database when it can no longer handle the load?",
    answer: "Strategies: 1) Read Replicas (offload read traffic), 2) Caching with Redis/Memcached (reduce DB hits), 3) Connection Pooling (HikariCP), 4) Vertical Scaling (bigger server), 5) Database Sharding (horizontal partitioning of data across multiple DB instances), 6) CQRS (separate read and write models)."
  },
  {
    question: "What is the CAP theorem?",
    answer: "CAP Theorem states that a distributed system can only guarantee two of three properties simultaneously: Consistency (all nodes see the same data), Availability (every request gets a response), Partition Tolerance (the system works despite network partitions). Since network partitions always happen, you choose between CP (e.g., HBase) or AP (e.g., Cassandra)."
  },
  {
    question: "What is load balancing and what are different load balancing algorithms?",
    answer: "A load balancer distributes incoming traffic across multiple servers to prevent overload. Algorithms: Round Robin (requests distributed sequentially), Least Connections (routes to server with fewest active connections), IP Hash (same client always hits same server, for session stickiness), Weighted Round Robin (servers get traffic proportional to their capacity)."
  },
  {
    question: "What is an event-driven architecture?",
    answer: "In event-driven architecture, services communicate by producing and consuming events through a message broker (Kafka, RabbitMQ). Producers publish events without knowing who will consume them. This creates loose coupling, high scalability, and resilience. Events can be replayed for auditing or recovery. Common in microservices and real-time processing."
  },

  // ─── GENERAL / BEHAVIORAL ────────────────────────────────────────────────────
  {
    question: "What is the difference between REST and GraphQL?",
    answer: "REST uses fixed endpoints (e.g., GET /users/1), each returning a predefined shape of data. This can lead to over-fetching (too much data) or under-fetching (multiple requests needed). GraphQL uses a single endpoint where the client specifies exactly what data it needs in a query, preventing over/under-fetching."
  },
  {
    question: "What is CI/CD and what tools are commonly used?",
    answer: "CI (Continuous Integration) automates building and testing code on every commit. CD (Continuous Delivery/Deployment) automates releasing tested code to staging or production. Common tools: Jenkins, GitHub Actions, GitLab CI, CircleCI for pipelines; Docker for containerization; Kubernetes for deployment; SonarQube for code quality."
  },
  {
    question: "What is the difference between authentication and authorization?",
    answer: "Authentication is verifying WHO you are (e.g., login with username/password, JWT). Authorization is determining WHAT you are allowed to do (e.g., Role-Based Access Control — an admin can delete users, a regular user cannot). Authentication always happens before authorization."
  },
  {
    question: "What is a deadlock and how do you prevent it?",
    answer: "A deadlock occurs when two or more threads are blocked forever, each waiting for a resource held by another. Prevention strategies: 1) Lock ordering (always acquire locks in the same order), 2) Lock timeouts (tryLock with a timeout), 3) Avoid nested locks, 4) Use higher-level concurrency tools like java.util.concurrent instead of raw synchronized blocks."
  },
  {
    question: "What is HTTPS and how does TLS/SSL work?",
    answer: "HTTPS is HTTP over TLS/SSL for secure communication. TLS handshake: 1) Client sends 'ClientHello' with supported TLS versions, 2) Server responds with its SSL certificate (containing its public key), 3) Client validates the certificate with a trusted CA, 4) They use asymmetric encryption to exchange a symmetric session key, 5) All subsequent data is encrypted with the fast symmetric key."
  },
  {
    question: "What are the main differences between monolithic and microservices architecture?",
    answer: "Monolith: all components in one deployable unit. Simple to develop initially but becomes hard to scale and maintain. A bug can take down the whole app. Microservices: independent, loosely coupled services. Each can be deployed, scaled, and developed independently. More complex to manage (networking, distributed transactions) but highly scalable."
  },
  {
    question: "Explain the MVC design pattern.",
    answer: "MVC (Model-View-Controller) separates concerns: Model holds the data and business logic. View is the presentation layer (UI). Controller handles user input, processes it using the Model, and determines which View to render. It decouples UI from business logic, making the code more maintainable and testable."
  },
  {
    question: "What is caching and what are the common caching strategies?",
    answer: "Caching stores frequently accessed data in fast storage (memory) to reduce latency and database load. Strategies: Cache-Aside (app checks cache first, loads from DB on miss), Read-Through (cache handles fetching), Write-Through (writes go to cache and DB simultaneously), Write-Behind (writes go to cache, DB updated asynchronously). TTL (Time-To-Live) handles cache invalidation."
  }
];
