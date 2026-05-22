/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VocabTerm, TechStackReason } from './types';

export const CATEGORIES = [
  'Product',
  'AI',
  'Backend',
  'Frontend',
  'Data',
  'Architecture',
  'Strategy'
] as const;

export type CategoryType = typeof CATEGORIES[number];

export const VOCAB_TERMS: VocabTerm[] = [
  // AI Category
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    category: 'AI',
    what: 'A technique that combines large language models with external resource retrieval to ground predictions in verified reference data.',
    why: 'Prevents model hallucinations, allows updating the system knowledge base dynamically without retraining, and respects enterprise access controls at the query boundaries.',
    where: 'Intelligent search, customer service chatbots running on internal wikis, and automated contract analyzers.',
    mental_model: 'The LLM is an open-book exam taker. Instead of answering from raw memory (hallucination risk), a search assistant fetches relevant library books (retrieval) and hands them to the student to write a precise, cited answer.',
    alternatives: 'Full model fine-tuning (costly, static, slow), Prompt Engineering with static context (limited by context window length and cost).',
    related: ['vector-db', 'context-window', 'agentic-workflows']
  },
  {
    id: 'vector-db',
    term: 'Vector Database',
    category: 'AI',
    what: 'A specialized database purpose-built to store, index, and query high-dimensional vector embeddings representing semantic meaning.',
    why: 'Enables rapid approximate nearest neighbor (ANN) search, essential for fetching semantically relevant document snippets in AI workflows.',
    where: 'Semantic search systems, recommendation engines, and context-retrieval steps in RAG-based LLM architectures.',
    mental_model: 'A multidimensional library map. Instead of organizing books strictly alphabetically (exact keywords), it groups them based on "about-ness" so books discussing similar themes sit on the exact same shelf, even if they use different words.',
    alternatives: 'PostgreSQL pgvector extension (simpler for low-scale, excellent alternative), Elasticsearch/Opensearch keyword + vector hybrid search.',
    related: ['rag', 'postgres']
  },
  {
    id: 'context-window',
    term: 'Context Window',
    category: 'AI',
    what: 'The maximum token limit of input and output text that a generative model can process or hold in working memory in a single interaction loop.',
    why: 'Governs how much background information, long-term history, or codebase code files the model can inspect simultaneously.',
    where: 'LLM prompt assembly, long-document summarizers, and terminal AI code-migration systems.',
    mental_model: 'A developer\'s desk workspace. A larger desk (huge context window) allows holding open ten books at once, whereas a tiny desk forces index-flipping and book-swapping (vector retrieval or pagination).',
    alternatives: 'Recursive summary loops, context compression algorithms, sliding word offsets.',
    related: ['rag', 'agentic-workflows']
  },
  {
    id: 'agentic-workflows',
    term: 'Agentic Workflows',
    category: 'AI',
    what: 'An architectural pattern where LLMs are designed as active decision-making loops executing tools and handling conditional flow, rather than linear chat responders.',
    why: 'Permits executing complex, multi-modal tasks which require error correction, validation, iterative refinement, or third-party service callbacks.',
    where: 'Autonomous coding assistants, multi-step customer support dispatchers, and automated competitive intelligence gatherers.',
    mental_model: 'Shifting from a simple smart search box to hired virtual experts who can run commands, verify the raw outcome, and try alternative scripts if something breaks.',
    alternatives: 'Deterministic state-machines, linear prompt chains, hardcoded microservice logic.',
    related: ['rag', 'fastapi', 'context-window']
  },

  // Product Category
  {
    id: 'feature-flagging',
    term: 'Feature Flagging',
    category: 'Product',
    what: 'A software engineering practice of using conditional gates to turn system features on or off dynamically at runtime without deploying code.',
    why: 'Decouples engineering deployments from product releases, allowing safe dark-launching, canary releases, and instantaneous rollbacks.',
    where: 'Progressive rolling out of high-impact dashboard redesigns, gating premium features for tier upgrades, and hot-swapping beta APIs.',
    mental_model: 'Circuit breakers in a home. Allows electrical technicians to live-test specific outlets or cut off dangerous loops instantly without turning off power to the entire neighborhood.',
    alternatives: 'Branch layouts (staging vs master environments), rapid-fire hotfixing pipelines.',
    related: ['local-first']
  },
  {
    id: 'product-led-growth',
    term: 'Product-Led Growth (PLG)',
    category: 'Product',
    what: 'A strategy where the product itself (user experience, self-serve adoption, automated value delivery) drives acquisition, expansion, and retention.',
    why: 'Lowers customer acquisition cost (CAC), drives organic virality, and creates highly qualified user leads through direct usage rather than standard sales pitches.',
    where: 'Freemium software tiers, interactive onboarding sandboxes, and in-app referral rewards.',
    mental_model: 'The free grocery sample. Rather than talking to a food sales representative about how tasty the cheese is, you taste it yourself immediately and decide to buy the whole block.',
    alternatives: 'Sales-Led Growth (SLG), Marketing-Led Growth (ad buying, performance loops).',
    related: ['retention-loop', 'north-star']
  },
  {
    id: 'retention-loop',
    term: 'Retention Loop',
    category: 'Product',
    what: 'A product mechanism where a user action triggers positive reinforcement or utility value that directly prompts the user to return.',
    why: 'Ensures long-term organic revenue growth and high lifetime value (LTV) without continuous paid user acquisition spend.',
    where: 'Personal dashboard configurations, custom developer profiles, push-notification daily digests, and team shared-canvases.',
    mental_model: 'An investment garden. The more seeds you plant and water (custom presets, saved history, workflows), the more beautiful and indispensable your garden becomes, making it painful to leave.',
    alternatives: 'Emailed drip-campaigns, heavy marketing popups, high-pressure contract renewals.',
    related: ['product-led-growth']
  },

  // Backend Category
  {
    id: 'fastapi',
    term: 'FastAPI',
    category: 'Backend',
    what: 'A modern, high-performance, asynchronous web framework for building APIs with Python based on standard Python type hints.',
    why: 'Provides automatic interactive documentation (Swagger), handles high concurrency out-of-the-box via asyncio, and supports ultra-fast data serialization using Pydantic.',
    where: 'Machine learning backend API proxy routing, rapid microservices, and AI-agent automation servers.',
    mental_model: 'Express highway lanes with automatic license plate scanning. Traffic flows without stopping at manual plazas because types and docs are checked and printed automatically while moving.',
    alternatives: 'Flask (simple but synchronous, manual docs), Django (powerful but heavy/opinionated), Node.js Express.',
    related: ['postgres', 'async-workers', 'rest-api']
  },
  {
    id: 'async-workers',
    term: 'Asynchronous Workers',
    category: 'Backend',
    what: 'Background processes that execute resource-intensive or long-running tasks out of the main request-response lifecycle loop.',
    why: 'Keeps user-facing API routes lightning fast by instantly ack-ing requests and delegating processing to a separate thread or worker node.',
    where: 'Generating heavy PDF invoices, exporting data spreadsheets, sending transactional email batches, or processing AI model outputs.',
    mental_model: 'The kitchen short-order ticket wheel. The front counter waiter writes down the order and pins it to the kitchen ticket wheel (queue), immediately returning to greet the next customer instead of waiting for the steak to fry.',
    alternatives: 'Synchronous execution (blocks UI), multithreading within the web process (runs risk of memory crashes).',
    related: ['fastapi', 'message-queue']
  },
  {
    id: 'message-queue',
    term: 'Message Queue',
    category: 'Backend',
    what: 'An asynchronous service-to-service communication block that stores messages in order until they can be securely processed by consumers.',
    why: 'Guarantees reliable message delivery, decouples producer and consumer systems, and smooths peak traffic surges.',
    where: 'Payment processing ingestion, AI job scheduling networks, and user activity logging frameworks.',
    mental_model: 'A secure post-office mailbox. Even if the delivery driver is busy or sleeping, letters pile up safely in the lockbox and will be processed immediately when they awaken.',
    alternatives: 'Direct HTTP webhooks (risky if destination is down), shared in-memory event emitters.',
    related: ['async-workers', 'event-driven']
  },
  {
    id: 'rest-api',
    term: 'REST API',
    category: 'Backend',
    what: 'An architectural style for designing networked applications using stateless HTTP methods, standard status codes, and JSON bodies.',
    why: 'Ensures universal compatibility across devices, easy caching at the edge, and human-readable, predictable endpoint layouts.',
    where: 'Third-party developer integrations, state transfers between frontend and server, and legacy service bindings.',
    mental_model: 'A restaurant menu with standard columns. You order via standardized commands (GET, POST, PUT, DELETE) and receive the exact course plates (resource collections) indicated.',
    alternatives: 'GraphQL (client-specified curves, complex setup), gRPC (binary ProtoBufs, incredibly fast but more complex for web clients).',
    related: ['fastapi', 'svelte-kit']
  },

  // Frontend Category
  {
    id: 'svelte-kit',
    term: 'SvelteKit',
    category: 'Frontend',
    what: 'An application framework built on top of Svelte that manages routing, server-side rendering, hot client hydration, and build compilation.',
    why: 'Provides an exceptionally fast developer loop, outputs highly optimized vanilla JS with minimal framework runtime overhead, and models reactive state natively.',
    where: 'Modern high-performance SaaS platforms, light marketing-product hybrids, and mobile-native hybrid layouts.',
    mental_model: 'A custom custom-tailored suit vs. a generic spacesuit. SvelteKit compiles your custom UI into minimal, lightweight code that fits perfectly instead of shipping a massive heavy framework container to the browser.',
    alternatives: 'Next.js (heavy runtime overhead, React-focused), analog/Vite SPA.',
    related: ['ssr', 'hydration', 'capacitor', 'fastapi']
  },
  {
    id: 'ssr',
    term: 'Server-Side Rendering (SSR)',
    category: 'Frontend',
    what: 'The process of rendering interactive web page HTML on the server on every request rather than waiting for browser JS to download and execute.',
    why: 'Substantially reduces First Contentful Paint times, optimizes search engine visibility (SEO), and allows secure backend operations during page load.',
    where: 'Content blogs, SaaS billing views, and landing conversion paths.',
    mental_model: 'Receiving a fully assembled furniture piece in the mail. You can look at it and use it immediately, rather than getting a massive flat-pack box with a 20-step assembly instructions manual (Client-Side Rendering).',
    alternatives: 'Single Page Application (SPA / CSR), Static Site Generation (SSG - pre-rendered but un-customizable per session).',
    related: ['svelte-kit', 'hydration']
  },
  {
    id: 'hydration',
    term: 'Hydration',
    category: 'Frontend',
    what: 'The client-side process where browser JavaScript reads a static, server-rendered HTML page and binds state handlers to make it interactive.',
    why: 'Bridges the gap between instant visual static loads and full single-page application reactivity.',
    where: 'Bootstrap phases of SvelteKit or Next.js SPAs.',
    mental_model: 'Bringing freeze-dried vegetables back to life. The server outputs light, dry structural shapes (HTML), and the browser adds fresh water (JavaScript) to rehydrate and make it edible and flexible.',
    alternatives: 'Vanilla multi-page apps (no client hydration, full page reloads), progressive enhancement without client routing.',
    related: ['ssr', 'svelte-kit']
  },
  {
    id: 'capacitor',
    term: 'Capacitor',
    category: 'Frontend',
    what: 'An open-source native runtime wrapper that deploys web assets directly inside a container to produce cross-platform iOS and Android apps.',
    why: 'Allows shipping a single, highly performant web codebase to App Stores, avoiding dual-team engineering overhead and enabling instant over-the-air (OTA) updates.',
    where: 'Mobile native releases of modern SaaS products, dashboard utilities, and responsive tool ecosystems.',
    mental_model: 'A premium, custom-fit luxury shipping container. Your beautiful web application sits comfortably inside a specialized mobile crate that has direct, safe plumbing and wiring (JS bridges) to the physical engine beneath (native device APIs).',
    alternatives: 'React Native (native component abstraction, slower styling loop), Flutter (Dart runtime, non-standard UI elements).',
    related: ['svelte-kit', 'local-first']
  },

  // Data Category
  {
    id: 'postgres',
    term: 'PostgreSQL',
    category: 'Data',
    what: 'A highly reliable, enterprise-grade, open-source object-relational SQL database known for extensibility, query optimization, and total compliance.',
    why: 'Ensures strict ACID-compliant transaction safety, supports JSON document processing, and handles custom extensions (like Vector search indices) seamlessly.',
    where: 'Core transactional user storage, billing ledger databases, and centralized relational models.',
    mental_model: 'A master Swiss watch. High-precision gear layout, built with zero compromises on absolute mechanical accuracy, and extensible with specialized magnifying lenses (extensions).',
    alternatives: 'MySQL (simpler replication, fewer features), MongoDB (NoSQL, flexible schema but loses complex join query speeds).',
    related: ['vector-db', 'fastapi', 'wal']
  },
  {
    id: 'wal',
    term: 'Write-Ahead Logging (WAL)',
    category: 'Data',
    what: 'A fundamental data management safety protocol where all changes are written to a sequential log before they are applied to the database files.',
    why: 'Guarantees transaction durability and crash recovery, enabling swift database replication and point-in-time restores.',
    where: 'Under-the-hood engine operations of advanced relational databases like PostgreSQL.',
    mental_model: 'A black-box flight recorder. Even if the entire power grid fails unexpectedly, we read the sequential tape of recorded flight intents to rebuild and reconstruct the exact absolute coordinate state.',
    alternatives: 'Shadow paging, direct-to-disk dirty writes (extremely prone to corruption).',
    related: ['postgres']
  },
  {
    id: 'relational-schema',
    term: 'Relational Schema',
    category: 'Data',
    what: 'The structural blueprint that defines the tables, columns, data types, and primary-to-foreign key associations within a SQL database.',
    why: 'Enforces rich data consistency, eliminates data duplication, and allows lightning-fast normalized data joins.',
    where: 'SQL entity definitions, database migrations, and schema validation layers.',
    mental_model: 'A rigid city blueprint layout. Houses (records) must belong to pre-surveyed streets (tables) and connect strictly via standard pre-mapped pipes (relations), preventing wild construction anarchy.',
    alternatives: 'Schemaless documents (NoSQL / MongoDB - highly mutable but leads to semantic drift and complex frontend validation).',
    related: ['postgres']
  },

  // Architecture Category
  {
    id: 'micro-frontends',
    term: 'Micro-Frontends',
    category: 'Architecture',
    what: 'An architectural pattern where a single large web client is broken into smaller, completely decoupled, independently deployable feature apps.',
    why: 'Enables large product divisions to scale without tripping over a single massive, fragile repo or merge queues.',
    where: 'Enterprise-scale portals (like SaaS dashboards or bank applications) where multiple cross-functional teams build separate tabs.',
    mental_model: 'A luxury food court. Instead of a single chef frantically cooking burger, sushi, and dessert in one kitchen, three independent kitchens run side-by-side sharing a unified dining space.',
    alternatives: 'Monolithic single-package layouts (faster to start, much simpler build steps, ideal for single-developer products).',
    related: ['svelte-kit']
  },
  {
    id: 'event-driven',
    term: 'Event-Driven Architecture',
    category: 'Architecture',
    what: 'A software architecture model where microservices communicate asynchronously by broadcasting and listening to discrete events.',
    why: 'Decouples service boundaries entirely, enabling system scaling without forcing synchronous HTTP request blocks.',
    where: 'Distributed IoT networks, complex e-commerce order workflows, and cloud-native serverless systems.',
    mental_model: 'A smart home notification network. When the front door opens (event), the hallway light turns on, a camera starts recording, and the speaker barks a greeting, without the door sensor knowing anything about those lights or speakers.',
    alternatives: 'Monolithic request-response models, RPC direct bindings.',
    related: ['message-queue', 'async-workers']
  },
  {
    id: 'local-first',
    term: 'Local-First Architecture',
    category: 'Architecture',
    what: 'An application paradigm where user data is read first and written directly to local on-device files or databases, then synced back to the clouds asynchronously.',
    why: 'Eliminates page-load network lag entirely, provides robust offline functionality, and removes immediate dependency on cloud server uptimes.',
    where: 'Modern high-productivity workspace systems like Linear, Obsidian, and Notion.',
    mental_model: 'A sketchbook in your backpack. You draw or write thoughts instantly in any location, then copy or scan the sketches to post online only when you get back to your home Wi-Fi.',
    alternatives: 'Cloud-First models (browser waits for API write-acks before updating the screen, causing layout spinners and latency).',
    related: ['postgres', 'capacitor']
  },

  // Strategy Category
  {
    id: 'north-star',
    term: 'North Star Metric',
    category: 'Strategy',
    what: 'The key performance indicator that best captures the core value your product delivers to customers, representing long-term structural health.',
    why: 'Aligns product, engineering, and marketing teams toward a single value conversion goal rather than surface revenue growth or vanity clicks.',
    where: 'Strategic quarterly planning, company-wide presentation boards, and epic-level roadmap evaluations.',
    mental_model: 'An actual maritime compass. Prevents the steering crew from arguing over which wave or visual landmark to follow, keeping the ship headed straight toward the true target destination.',
    alternatives: 'Quarterly MRR targets (purely financial, misses core user value), feature completion deadlines (volume over value delivered).',
    related: ['product-led-growth']
  },
  {
    id: 'tech-debt-budget',
    term: 'Tech Debt Budget',
    category: 'Strategy',
    what: 'A structured, agreed-upon allocation of engineering bandwidth (e.g. 20% of every sprint) dedicated solely to refactoring, library upgrades, and tool improvements.',
    why: 'Keeps team velocity predictable, prevents catastrophic architectural decay, and maintains developer satisfaction by preventing system stagnation.',
    where: 'Sprint planning agendas, engineering roadmap prioritization, and architectural review loops.',
    mental_model: 'Oil changes and tire rotations on a delivery truck trunk. Proactively spending a tiny bit of uptime in the garage preserves the truck engine from locking up on the highway.',
    alternatives: 'Rebuild from scratch every three years (incredibly costly and disruptive), emergency fire-fighting (unpredictable, stressful).',
    related: ['micro-frontends']
  },
  {
    id: 'build-vs-buy',
    term: 'Build vs. Buy Assessment',
    category: 'Strategy',
    what: 'A strategic framework to determine whether a product team should construct core custom code internally or license pre-existing external software.',
    why: 'Preserves rare developer focus for unique, proprietary competitive advantages rather than recreating commoditized utilities.',
    where: 'API integration scoping, user identity planning, and search engine infrastructure design.',
    mental_model: 'Building the house foundation vs. manufacturing the screws. You gladly purchase standard screws from the local builder store, saving your custom masonry skills for the unique arches and fireplaces of your home.',
    alternatives: 'NIH syndrome (Not Invented Here - building everything manually, resulting in massive operational support baggage).',
    related: ['product-led-growth']
  }
];

export const TECH_STACK_REASONS: TechStackReason[] = [
  {
    id: 'sveltekit',
    tech: 'SvelteKit',
    title: 'Why SvelteKit over React?',
    reasoning: [
      'Zero-Runtime Compiler Approach: Svelte shifts work from the browser runtime directly to the build step, resulting in drastically smaller JS bundles and much faster time-to-interactive visual scores.',
      'Native State Model: Direct reactive assignments (let count = 0) avoid complex state traps (useState hook dependencies or memoization boilerplate), maintaining pristine code clarity.',
      'Stateless Serverless Footprint: Built-in routing and endpoints integrate flawlessly with CDN-edge functions with negligible cold-start times compared to bulky React server bundles.',
      'Exceptional Developer Speed: Boilerplate-free components allow the core engineering team to ship features 2-3x quicker than managing deep React layouts and re-render cycles.'
    ],
    alternativesRejected: [
      {
        name: 'Next.js (React)',
        reason: 'Heavy framework runtime overhead, complex nesting conventions, and massive client bundle payloads of standard hydration frameworks.'
      },
      {
        name: 'Vanilla Single-Page App (SPA)',
        reason: 'Fails to provide server-side pre-rendering out-of-the-box, resulting in a blank initial screen load and sub-optimal search engine crawling indexing.'
      }
    ]
  },
  {
    id: 'fastapi',
    tech: 'FastAPI',
    title: 'Why FastAPI?',
    reasoning: [
      'High-Performance Async Architecture: Leveraging Pythons asyncio and standard Uvicorn servers, it handles high-concurrency requests comparable to Go and Node.js.',
      'Robust Python Ecosystem: Unlocks instant, native integration with machine learning packages (PyTorch, HuggingFace, NumPy) and modern vector database drivers.',
      'Automatic Interactive OpenAPI Docs: Generates sleek, immediately mock-run Swagger interfaces out-of-the-box based strictly on python typing, dramatically accelerating team coordinate cycles.',
      'Pydantic Data Schemas: Enforces strict, type-safe request parsing with exceptionally clean validation logging and rapid serialization pipelines.'
    ],
    alternativesRejected: [
      {
        name: 'Django',
        reason: 'Too heavy and opinionated, with an attached server-side admin paradigm that we do not need for a headless API microservices stack.'
      },
      {
        name: 'Express (Node.js)',
        reason: 'While extremely fast, Node requires complex runtime type-checking frameworks and makes direct integration with Python-dependent ML services cumbersome.'
      }
    ]
  },
  {
    id: 'postgresql',
    tech: 'PostgreSQL',
    title: 'Why PostgreSQL?',
    reasoning: [
      'Indestructible ACID Compliance: Guarantees rock-solid transaction integrity down to the hardware storage, ensuring user ledger data is never left in half-written states.',
      'Excellent Vector Extension Support (pgvector): Allows us to store and perform search operations on high-dimensional AI vector embeddings on the exact same database as our primary relational records, avoiding costly multi-database sync pipelines.',
      'Hybrid Relational + JSON Documents: Gives the development pair full freedom to query clean relational columns while storing mutable, flexible config objects inside native JSONB fields.',
      'Vibrant open-source development and massive ecosystem compatibility make PostgreSQL the ultimate low-risk data anchor.'
    ],
    alternativesRejected: [
      {
        name: 'MongoDB',
        reason: 'Schemaless by default, leading to complex and error-prone data-layer cleanup scripts down the line, and lacks optimal multi-row join speeds.'
      },
      {
        name: 'Pure Vector Databases (Pinecone/Milvus)',
        reason: 'Extremely powerful but adds significant cost, separate authentication hurdles, and operational synchronization overhead for single-service platforms.'
      }
    ]
  },
  {
    id: 'capacitor',
    tech: 'Capacitor',
    title: 'Why Capacitor?',
    reasoning: [
      'Pristine Codebase Consolidation: Allows deploying the identical high-performance, responsive SvelteKit web client straight inside Apple App Store and Google Play packages.',
      'Web-Standard Velocity: Developers build and live-reload using standard CSS and Tailwind classes, completely bypassing tedious mobile-native compile speeds and complex layout code.',
      'Reliable JS-Native Bridges: Provides immediate, standardized APIs to access native mobile hardware (camera, feedback haptics, geolocation, notifications) using pure JS.',
      'Instantly updates live features over-the-air in seconds without forcing users through manual mobile App Store update procedures.'
    ],
    alternativesRejected: [
      {
        name: 'React Native',
        reason: 'Requires writing mobile-specific element wrappers (View, Text) and demands managing fragile native dependency compilation packages on upgrade phases.',
      },
      {
        name: 'Pure Native (Swift / Kotlin)',
        reason: 'Forces maintaining two entirely separate source code libraries and doubling development team sizing with incompatible skill alignments.'
      }
    ]
  }
];
