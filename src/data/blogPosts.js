const blogPosts = [
    {
      id: 'blog1',
      title: 'How I Built a Responsive E-Commerce Website with React',
      summary: 'A detailed walkthrough of creating a modern e-commerce platform from scratch using React, Redux, and Node.js.',
      coverImage: '/images/blog/ecommerce-blog.jpg',
      date: '2023-04-15',
      category: 'Web Development',
      tags: ['React', 'E-Commerce', 'Frontend', 'Redux'],
      content: `
  # How I Built a Responsive E-Commerce Website with React
  
  ![E-commerce website on multiple devices](/images/blog/ecommerce-blog.jpg)
  
  When I set out to build my first e-commerce platform, I knew I wanted to create something that was not only functional but also provided an excellent user experience across all devices. In this blog post, I'll share my journey, the challenges I faced, and the solutions I implemented.
  
  ## Planning the Architecture
  
  Before writing a single line of code, I spent time planning the structure of the application. I decided on:
  
  - **Frontend**: React with Redux for state management
  - **Backend**: Node.js with Express
  - **Database**: MongoDB for flexible product schemas
  - **Authentication**: JWT-based authentication system
  
  ![Architecture diagram](/images/blog/architecture.jpg)
  
  ## Setting Up the Development Environment
  
  I started by setting up a clean development environment using Create React App with a custom webpack configuration to optimize the build process. 
  
  \`\`\`javascript
  // webpack.config.js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.[contenthash].js',
      publicPath: '/'
    },
    // Additional configuration...
  }
  \`\`\`
  
  ## Designing the Product Catalog
  
  One of the most challenging aspects was designing a flexible product catalog that could handle different types of products with varying attributes. I implemented a component-based approach:
  
  ![Product catalog components](/images/blog/product-components.jpg)
  
  The \`ProductCard\` component became the building block for both the product listing and search results pages:
  
  \`\`\`jsx
  const ProductCard = ({ product, onAddToCart }) => {
    const { id, name, price, image, discount, rating } = product;
    
    return (
      <div className="product-card">
        {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          {discount > 0 ? (
            <>
              <span className="original-price">\${price.toFixed(2)}</span>
              <span className="final-price">
                \${(price - (price * discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="final-price">\${price.toFixed(2)}</span>
          )}
        </div>
        <div className="product-rating">
          <StarRating value={rating} />
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  \`\`\`
  
  ## Making It Responsive
  
  To ensure the site looked great on all devices, I implemented a mobile-first approach using CSS Grid and Flexbox:
  
  ![Responsive design examples](/images/blog/responsive.jpg)
  
  \`\`\`css
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .product-card {
      font-size: 0.9rem;
    }
  }
  \`\`\`
  
  ## Cart Functionality
  
  The shopping cart was implemented using Redux for state management, allowing for a persistent cart experience:
  
  ![Shopping cart interface](/images/blog/cart.jpg)
  
  \`\`\`javascript
  // redux/cartSlice.js
  import { createSlice } from '@reduxjs/toolkit';
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      total: 0,
      itemCount: 0
    },
    reducers: {
      addToCart: (state, action) => {
        // Add item logic
      },
      removeFromCart: (state, action) => {
        // Remove item logic
      },
      // Other reducers...
    }
  });
  \`\`\`
  
  ## Lessons Learned
  
  Building this e-commerce platform taught me several valuable lessons:
  
  1. **Plan your state management carefully** - A well-structured Redux store saves headaches later
  2. **Invest time in responsive design** - Mobile users make up a significant portion of e-commerce traffic
  3. **Performance optimization matters** - Lazy loading images and code splitting improved load times significantly
  4. **User testing is invaluable** - Getting feedback from real users helped identify pain points I hadn't considered
  
  I hope this walkthrough gives you some insights for your own projects. Feel free to reach out if you have any questions!
  
  ![Final project screenshot](/images/blog/final-project.jpg)
      `,
      readTime: '8 min'
    },
    {
      id: 'blog2',
      title: 'Understanding CSS Grid: A Complete Guide',
      summary: 'Learn how to master CSS Grid Layout with practical examples and tips for creating complex responsive layouts.',
      coverImage: '/images/blog/css-grid.jpg',
      date: '2023-03-10',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Web Design', 'Responsive'],
      content: `
  # Understanding CSS Grid: A Complete Guide
  
  ![CSS Grid illustration](/images/blog/css-grid.jpg)
  
  CSS Grid has revolutionized web layout design, making previously complex layouts achievable with clean, maintainable code. In this guide, I'll walk you through everything you need to know to master CSS Grid.
  
  ## The Basics of CSS Grid
  
  CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has many features that make building complex layouts straightforward.
  
  ![Basic grid structure](/images/blog/grid-basics.jpg)
  
  To create a grid container, you simply need to set the display property:
  
  \`\`\`css
  .container {
    display: grid;
  }
  \`\`\`
  
  ## Defining Grid Structure
  
  You can define your grid's rows and columns using the grid-template-rows and grid-template-columns properties:
  
  \`\`\`css
  .container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 300px auto;
    gap: 20px;
  }
  \`\`\`
  
  ![Grid template illustration](/images/blog/grid-template.jpg)
  
  ## The Power of Fractional Units
  
  One of the most powerful features of CSS Grid is the fr unit, which represents a fraction of the available space:
  
  \`\`\`css
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  \`\`\`
  
  This creates a three-column layout where the middle column takes up twice as much space as the first and third columns.
  
  ![Fractional units example](/images/blog/fr-units.jpg)
  
  ## Creating Responsive Layouts with minmax() and auto-fill
  
  The minmax() function allows you to set a minimum and maximum size for a grid track:
  
  \`\`\`css
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  \`\`\`
  
  This creates as many columns as can fit in the container, each with a minimum width of 200px and a maximum of 1fr.
  
  ![Responsive grid example](/images/blog/responsive-grid.jpg)
  
  ## Positioning Items on the Grid
  
  You can position items precisely on the grid using grid-column and grid-row:
  
  \`\`\`css
  .item {
    grid-column: 1 / 3; /* Start at column line 1, end at column line 3 */
    grid-row: 2 / 4; /* Start at row line 2, end at row line 4 */
  }
  \`\`\`
  
  ![Item positioning example](/images/blog/grid-positioning.jpg)
  
  ## Creating Complex Layouts
  
  Let's put it all together to create a complex magazine-style layout:
  
  \`\`\`css
  .magazine-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto;
    gap: 20px;
  }
  
  .main-story {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  
  .secondary-story {
    grid-column: 3 / 5;
    grid-row: 1 / 2;
  }
  
  .sidebar {
    grid-column: 3 / 5;
    grid-row: 2 / 4;
  }
  
  .feature {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }
  \`\`\`
  
  ![Complex layout example](/images/blog/complex-layout.jpg)
  
  ## Real-World Application: Portfolio Layout
  
  Here's how I used CSS Grid to create the Projects section of this portfolio:
  
  \`\`\`css
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
  \`\`\`
  
  ![Portfolio grid example](/images/blog/portfolio-grid.jpg)
  
  ## Conclusion
  
  CSS Grid has transformed how we approach web layouts. By understanding its fundamental concepts and capabilities, you can create sophisticated, responsive designs with clean, readable code.
  
  I hope this guide helps you on your CSS Grid journey! Next time, we'll explore how to combine CSS Grid with Flexbox for even more powerful layouts.
  
  ![Final CSS grid showcase](/images/blog/grid-showcase.jpg)
      `,
      readTime: '10 min'
    },
    {
      id: 'blog3',
      title: 'Optimizing React Applications for Performance',
      summary: 'Learn effective strategies to improve the performance of your React applications with practical code examples.',
      coverImage: '/images/blog/react-performance.jpg',
      date: '2023-02-05',
      category: 'React',
      tags: ['React', 'Performance', 'JavaScript', 'Optimization'],
      content: `
  # Optimizing React Applications for Performance
  
  ![React performance optimization](/images/blog/react-performance.jpg)
  
  React applications can become sluggish as they grow in complexity. In this post, I'll share practical techniques I've used to optimize React applications for better performance.
  
  ## Identifying Performance Issues
  
  Before optimizing, it's important to identify where the performance bottlenecks actually are. React DevTools Profiler is an excellent tool for this:
  
  ![React DevTools Profiler](/images/blog/react-profiler.jpg)
  
  ## 1. Memoization with React.memo, useMemo, and useCallback
  
  Memoization prevents unnecessary re-renders and recalculations by caching results.
  
  ### React.memo for Component Memoization
  
  \`\`\`jsx
  // Before optimization
  const UserCard = (props) => {
    /* Component logic */
    return <div>{/* JSX */}</div>;
  };
  
  // After optimization
  const UserCard = React.memo((props) => {
    /* Component logic */
    return <div>{/* JSX */}</div>;
  });
  \`\`\`
  
  ![Component memoization example](/images/blog/component-memo.jpg)
  
  ### useMemo for Value Memoization
  
  \`\`\`jsx
  // Before optimization
  const UserDashboard = ({ users }) => {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    
    return (
      <div>
        {sortedUsers.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    );
  };
  
  // After optimization
  const UserDashboard = ({ users }) => {
    const sortedUsers = useMemo(() => {
      return users.slice().sort((a, b) => a.name.localeCompare(b.name));
    }, [users]);
    
    return (
      <div>
        {sortedUsers.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    );
  };
  \`\`\`
  
  ### useCallback for Function Memoization
  
  \`\`\`jsx
  // Before optimization
  const ParentComponent = () => {
    const handleClick = (id) => {
      console.log('Item clicked:', id);
    };
    
    return <ChildComponent onClick={handleClick} />;
  };
  
  // After optimization
  const ParentComponent = () => {
    const handleClick = useCallback((id) => {
      console.log('Item clicked:', id);
    }, []);
    
    return <ChildComponent onClick={handleClick} />;
  };
  \`\`\`
  
  ![Function memoization example](/images/blog/function-memo.jpg)
  
  ## 2. Virtualizing Long Lists
  
  For long lists, virtualization can significantly improve performance by only rendering what's visible in the viewport:
  
  \`\`\`jsx
  import { FixedSizeList } from 'react-window';
  
  const VirtualizedList = ({ items }) => {
    const Row = ({ index, style }) => (
      <div style={style}>
        <ListItem data={items[index]} />
      </div>
    );
  
    return (
      <FixedSizeList
        height={500}
        width="100%"
        itemCount={items.length}
        itemSize={50}
      >
        {Row}
      </FixedSizeList>
    );
  };
  \`\`\`
  
  ![Virtualized list example](/images/blog/virtualized-list.jpg)
  
  ## 3. Code Splitting and Lazy Loading
  
  Code splitting allows you to break up your app into smaller chunks which can be loaded on demand:
  
  \`\`\`jsx
  import React, { lazy, Suspense } from 'react';
  
  // Instead of: import ExpensiveComponent from './ExpensiveComponent';
  const ExpensiveComponent = lazy(() => import('./ExpensiveComponent'));
  
  const App = () => (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ExpensiveComponent />
      </Suspense>
    </div>
  );
  \`\`\`
  
  ![Code splitting diagram](/images/blog/code-splitting.jpg)
  
  ## 4. Using Web Workers for CPU-Intensive Tasks
  
  Web Workers allow you to run JavaScript in background threads:
  
  \`\`\`jsx
  // worker.js
  self.addEventListener('message', (e) => {
    const result = complexCalculation(e.data);
    self.postMessage(result);
  });
  
  // Component.jsx
  const Component = () => {
    const [result, setResult] = useState(null);
    
    const handleCalculation = (data) => {
      const worker = new Worker('./worker.js');
      
      worker.postMessage(data);
      worker.onmessage = (e) => {
        setResult(e.data);
        worker.terminate();
      };
    };
    
    return (/* JSX */);
  };
  \`\`\`
  
  ![Web worker illustration](/images/blog/web-worker.jpg)
  
  ## 5. Optimizing Context API Usage
  
  Poorly structured Context can cause unnecessary re-renders:
  
  \`\`\`jsx
  // Before optimization
  const AppContext = createContext();
  
  const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([]);
    
    const value = {
      user, setUser,
      theme, setTheme,
      notifications, setNotifications
    };
    
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
  
  // After optimization: Split into multiple contexts
  const UserContext = createContext();
  const ThemeContext = createContext();
  const NotificationContext = createContext();
  
  const AppProvider = ({ children }) => {
    return (
      <UserProvider>
        <ThemeProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </UserProvider>
    );
  };
  \`\`\`
  
  ![Context optimization diagram](/images/blog/context-optimization.jpg)
  
  ## 6. Performance Measurement and Monitoring
  
  Use performance metrics to guide your optimization efforts:
  
  \`\`\`jsx
  // Measuring component render time
  class PerformanceMonitor extends React.Component {
    componentDidMount() {
      this.startTime = performance.now();
    }
    
    componentDidUpdate() {
      console.log(\`Component took \${performance.now() - this.startTime}ms to render\`);
      this.startTime = performance.now();
    }
    
    render() {
      return this.props.children;
    }
  }
  \`\`\`
  
  ![Performance monitoring dashboard](/images/blog/perf-dashboard.jpg)
  
  ## Real-World Results
  
  After applying these optimizations to a dashboard application I was working on:
  
  - Initial load time: 3.2s → 1.8s (44% improvement)
  - List rendering time: 850ms → 120ms (86% improvement)
  - Memory usage: 180MB → 110MB (39% reduction)
  
  ![Performance improvements chart](/images/blog/perf-improvements.jpg)
  
  ## Conclusion
  
  React performance optimization is an ongoing process rather than a one-time task. By applying these techniques systematically and measuring their impact, you can significantly improve the user experience of your React applications.
  
  Remember to focus on optimizing the bottlenecks first - don't waste time prematurely optimizing parts of your application that don't need it.
  
  ![Optimized React app example](/images/blog/optimized-app.jpg)
      `,
      readTime: '12 min'
    },
    {
      id: 'blog4',
      title: 'Creating Custom React Hooks for Reusable Logic',
      summary: 'Explore how to build your own custom React hooks to extract and reuse stateful logic across your applications.',
      coverImage: '/images/blog/custom-hooks.jpg',
      date: '2023-01-20',
      category: 'React',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      content: `
  # Creating Custom React Hooks for Reusable Logic
  
  ![Custom React hooks illustration](/images/blog/custom-hooks.jpg)
  
  React Hooks have transformed how we write React components, making it easier to reuse stateful logic between components. In this post, I'll show you how to create your own custom hooks and share some practical examples from my recent projects.
  
  ## The Power of Custom Hooks
  
  Custom hooks allow you to extract component logic into reusable functions, following a simple naming convention of starting with "use":
  
  \`\`\`jsx
  // A simple custom hook
  function useCustomHook(initialValue) {
    const [value, setValue] = useState(initialValue);
    
    const updateValue = (newValue) => {
      setValue(newValue);
    };
    
    return [value, updateValue];
  }
  \`\`\`
  
  ![Custom hook concept](/images/blog/hook-concept.jpg)
  
  ## Example 1: useLocalStorage Hook
  
  Let's create a hook that synchronizes state with localStorage:
  
  \`\`\`jsx
  function useLocalStorage(key, initialValue) {
    // Get stored value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
    
    // Update localStorage when state changes
    const setValue = (value) => {
      try {
        // Allow value to be a function
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };
    
    return [storedValue, setValue];
  }
  \`\`\`
  
  Using the hook in a component:
  
  \`\`\`jsx
  function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    return (
      <button onClick={toggleTheme}>
        Current theme: {theme}
      </button>
    );
  }
  \`\`\`
  
  ![LocalStorage hook example](/images/blog/localstorage-hook.jpg)
  
  ## Example 2: useFetch Hook
  
  Create a reusable data fetching hook:
  
  \`\`\`jsx
  function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      let isMounted = true;
      const fetchData = async () => {
        setLoading(true);
        
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          
          if (isMounted) {
            setData(result);
            setError(null);
          }
        } catch (error) {
          if (isMounted) {
            setError(error);
            setData(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
      
      fetchData();
      
      return () => {
        isMounted = false;
      };
    }, [url, JSON.stringify(options)]);
    
    return { data, error, loading };
  }
  \`\`\`
  
  Using the hook:
  
  \`\`\`jsx
  function UserProfile({ userId }) {
    const { data, error, loading } = useFetch(
      \`https://api.example.com/users/\${userId}\`
    );
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
      <div>
        <h2>{data.name}</h2>
        <p>{data.email}</p>
      </div>
    );
  }
  \`\`\`
  
  ![Fetch hook diagram](/images/blog/fetch-hook.jpg)
  
  ## Example 3: useMediaQuery Hook
  
  Create a hook for responsive designs:
  
  \`\`\`jsx
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      
      const listener = (event) => {
        setMatches(event.matches);
      };
      
      mediaQuery.addEventListener('change', listener);
      
      return () => {
        mediaQuery.removeEventListener('change', listener);
      };
    }, [query]);
    
    return matches;
  }
  \`\`\`
  
  Using the hook for responsive components:
  
  \`\`\`jsx
  function ResponsiveLayout() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
    const isDesktop = useMediaQuery('(min-width: 1025px)');
    
    return (
      <div>
        {isMobile && <MobileView />}
        {isTablet && <TabletView />}
        {isDesktop && <DesktopView />}
      </div>
    );
  }
  \`\`\`
  
  ![Media query hook example](/images/blog/media-query-hook.jpg)
  
  ## Example 4: useForm Hook
  
  A simple form management hook:
  
  \`\`\`jsx
  function useForm(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value
      });
    };
    
    const handleBlur = (event) => {
      const { name } = event.target;
      setTouched({
        ...touched,
        [name]: true
      });
    };
    
    const reset = () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    };
    
    return {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      reset
    };
  }
  \`\`\`
  
  Using the form hook:
  
  \`\`\`jsx
  function ContactForm() {
    const { values, handleChange, handleBlur, reset } = useForm({
      name: '',
      email: '',
      message: ''
    });
    
    const handleSubmit = (event) => {
      event.preventDefault();
      // Submit form logic
      console.log('Form submitted:', values);
      reset();
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
        />
        {/* Other fields */}
        <button type="submit">Submit</button>
      </form>
    );
  }
  \`\`\`
  
  ![Form hook example](/images/blog/form-hook.jpg)
  
  ## Example 5: useScrollPosition Hook
  
  Track scroll position with a custom hook:
  
  \`\`\`jsx
  function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState({
      x: 0,
      y: 0
    });
    
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY
        });
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    return scrollPosition;
  }
  \`\`\`
  
  Using the scroll hook:
  
  \`\`\`jsx
  function ScrollAwareHeader() {
    const { y } = useScrollPosition();
    
    return (
      <header className={y > 100 ? 'header-scrolled' : 'header'}>
        <h1>My Website</h1>
      </header>
    );
  }
  \`\`\`
  
  ![Scroll position hook visualization](/images/blog/scroll-hook.jpg)
  
  ## Combining Multiple Hooks
  
  The real power comes when you combine multiple hooks to create more complex behavior:
  
  \`\`\`jsx
  function useDataFetchingWithLocalStorage(url, storageKey) {
    const [cachedData, setCachedData] = useLocalStorage(storageKey, null);
    const { data, error, loading } = useFetch(url);
    
    useEffect(() => {
      if (data && !error) {
        setCachedData(data);
      }
    }, [data, error]);
    
    return {
      data: data || cachedData,
      loading,
      error,
      isCached: !data && cachedData
    };
  }
  \`\`\`
  
  ![Combined hooks diagram](/images/blog/combined-hooks.jpg)
  
  ## Best Practices for Custom Hooks
  
  1. **Keep them focused**: Each hook should do one thing well
  2. **Provide clear return values**: Use objects with named properties for clarity
  3. **Handle cleanup**: Use the effect cleanup function to prevent memory leaks
  4. **Consider dependencies**: Be careful about what triggers your hook to update
  5. **Document your hooks**: Add comments explaining the purpose and usage
  
  ![Hook best practices](/images/blog/hook-best-practices.jpg)
  
  ## Conclusion
  
  Custom hooks are one of the most powerful features of React, allowing you to create reusable, composable logic that stays synchronized with your component lifecycle. By extracting common patterns into custom hooks, you can make your code more readable, maintainable, and testable.
  
  I hope these examples inspire you to create your own custom hooks for your specific use cases!
  
  ![Custom hooks conclusion](/images/blog/hooks-conclusion.jpg)
      `,
      readTime: '15 min'
    }
  ];
  
  export default blogPosts;