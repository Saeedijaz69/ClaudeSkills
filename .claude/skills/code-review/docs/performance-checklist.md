# Performance Review Checklist

## Quick Reference

Use this checklist to identify performance issues during code reviews.

---

## 1. Database Performance

### Query Optimization
- [ ] No N+1 query problems
- [ ] Appropriate indexes exist
- [ ] Only necessary columns selected (avoid SELECT *)
- [ ] Query pagination implemented for large datasets
- [ ] Complex queries analyzed with EXPLAIN

### Connection Management
- [ ] Connection pooling configured
- [ ] Connections properly closed/returned
- [ ] Transaction scope minimized
- [ ] Read replicas used for read-heavy workloads

### Caching Strategy
- [ ] Frequently accessed data cached
- [ ] Cache invalidation implemented correctly
- [ ] Cache TTL appropriate for data freshness needs
- [ ] Cache stampede prevention in place

---

## 2. Algorithm Complexity

### Time Complexity
- [ ] No unnecessary O(n²) or worse operations
- [ ] Appropriate data structures used
- [ ] Early termination where possible
- [ ] Lazy evaluation when beneficial

### Space Complexity
- [ ] Memory usage bounded
- [ ] Large objects streamed, not loaded entirely
- [ ] Unnecessary copies avoided
- [ ] Generators/iterators used for large sequences

### Common Issues
```
❌ Nested loops over same data → O(n²)
❌ Repeated lookups in list → Use dict/set O(1)
❌ String concatenation in loop → Use join() or StringBuilder
❌ Sorting for min/max → Use min()/max() O(n)
```

---

## 3. Memory Management

### Memory Leaks
- [ ] Event listeners cleaned up
- [ ] Subscriptions unsubscribed
- [ ] Timers/intervals cleared
- [ ] Large objects dereferenced when done
- [ ] Circular references avoided or handled

### Memory Efficiency
- [ ] Appropriate data types used
- [ ] Object pooling for frequent allocations
- [ ] Lazy loading for large resources
- [ ] Weak references where appropriate

---

## 4. Network & I/O

### API Calls
- [ ] Batch requests when possible
- [ ] Parallel requests for independent data
- [ ] Appropriate timeouts configured
- [ ] Retry logic with exponential backoff
- [ ] Response compression enabled

### File Operations
- [ ] Large files streamed
- [ ] Async I/O used where available
- [ ] File handles properly closed
- [ ] Buffered I/O for small reads/writes

---

## 5. Frontend Performance

### Loading Performance
- [ ] Critical CSS inlined
- [ ] JavaScript deferred/async
- [ ] Images lazy loaded
- [ ] Resources preloaded/prefetched appropriately
- [ ] Bundle size minimized

### Runtime Performance
- [ ] No layout thrashing
- [ ] Animations use transform/opacity
- [ ] Event handlers debounced/throttled
- [ ] Virtual scrolling for long lists
- [ ] Web Workers for heavy computation

### React-Specific
- [ ] useMemo/useCallback used appropriately
- [ ] React.memo for pure components
- [ ] Key props stable and unique
- [ ] State updates batched
- [ ] Context not overused

---

## 6. Async Operations

### Concurrency
- [ ] Appropriate parallelism level
- [ ] Promise.all for independent operations
- [ ] Concurrent limits for resource-intensive operations
- [ ] No unnecessary sequential awaits

### Blocking Operations
- [ ] No sync operations on main thread
- [ ] CPU-intensive work offloaded
- [ ] Blocking I/O avoided in event loop
- [ ] Long operations chunked/yielded

---

## 7. Caching Strategies

### Application Caching
- [ ] Computed values memoized
- [ ] API responses cached appropriately
- [ ] Static assets cached with versioning
- [ ] Cache size bounded

### HTTP Caching
- [ ] Cache-Control headers set
- [ ] ETags implemented
- [ ] CDN utilized for static assets
- [ ] Service Worker caching strategy defined

---

## 8. Resource Loading

### Code Splitting
- [ ] Route-based code splitting
- [ ] Dynamic imports for large modules
- [ ] Shared chunks extracted
- [ ] Preloading for predicted navigation

### Asset Optimization
- [ ] Images optimized and properly sized
- [ ] Modern formats used (WebP, AVIF)
- [ ] Fonts subsetted and preloaded
- [ ] SVGs optimized

---

## 9. Backend Optimization

### Request Processing
- [ ] Expensive operations async
- [ ] Response streaming where applicable
- [ ] Compression enabled
- [ ] Keep-alive connections used

### Background Jobs
- [ ] Long tasks moved to background
- [ ] Job queues properly configured
- [ ] Batch processing for bulk operations
- [ ] Resource limits on workers

---

## 10. Monitoring & Profiling

### Metrics
- [ ] Response time tracked
- [ ] Error rates monitored
- [ ] Resource usage measured
- [ ] Database query times logged

### Profiling
- [ ] Bottlenecks identified with profiler
- [ ] Memory profiling done
- [ ] Load testing performed
- [ ] Performance budgets defined

---

## Performance Patterns

### Good Patterns

```python
# Batch database operations
User.objects.bulk_create(users)

# Use generators for large data
def process_large_file(path):
    with open(path) as f:
        for line in f:
            yield process_line(line)

# Parallel async operations
results = await asyncio.gather(*tasks)

# Dictionary for O(1) lookup
user_map = {u.id: u for u in users}
```

### Anti-Patterns

```python
# N+1 Query Problem
for post in posts:
    print(post.author.name)  # Query per post!

# String concatenation in loop
result = ""
for item in items:
    result += str(item)  # O(n²)!

# Sequential when parallel possible
a = await fetch_a()
b = await fetch_b()  # Could be parallel!

# List lookup instead of set
if item in large_list:  # O(n) each time!
```

---

## Performance Metrics Reference

### Response Time Guidelines
| Type | Target | Acceptable |
|------|--------|------------|
| API Response | < 100ms | < 500ms |
| Page Load (LCP) | < 2.5s | < 4s |
| First Input Delay | < 100ms | < 300ms |
| Time to Interactive | < 3.8s | < 7.3s |

### Database Query Guidelines
| Type | Target | Warning |
|------|--------|---------|
| Simple SELECT | < 10ms | > 50ms |
| JOIN Query | < 50ms | > 200ms |
| Complex Analytics | < 500ms | > 2s |

### Memory Guidelines
| Metric | Target | Warning |
|--------|--------|---------|
| Heap Usage | < 70% | > 85% |
| GC Frequency | < 1/min | > 5/min |
| Memory Growth | Stable | Increasing |

---

## Tools

### Profiling
- **Node.js**: node --inspect, clinic.js
- **Python**: cProfile, py-spy, memory_profiler
- **Browser**: Chrome DevTools Performance tab

### Load Testing
- k6
- Apache JMeter
- Locust

### Monitoring
- New Relic
- Datadog
- Prometheus + Grafana

### Frontend
- Lighthouse
- WebPageTest
- Bundle Analyzer

---

## Red Flags to Watch For

1. **Unbounded Growth** - Lists/caches that grow without limits
2. **Synchronous I/O** - Blocking operations in async context
3. **Missing Indexes** - Database queries without index hints
4. **Eager Loading** - Loading data that might not be needed
5. **No Pagination** - Returning unlimited results
6. **Repeated Computation** - Same calculation done multiple times
7. **Large Bundle Size** - All code loaded upfront
8. **No Error Boundaries** - Failed operations not contained
