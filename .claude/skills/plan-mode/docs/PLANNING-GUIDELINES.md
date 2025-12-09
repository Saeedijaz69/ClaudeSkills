# Planning Guidelines

## The Art of Good Planning

### Why Plan?

1. **Reduces uncertainty** - Know what you're building before you build it
2. **Identifies risks early** - Find problems before they cost time
3. **Enables coordination** - Multiple people can work together effectively
4. **Provides accountability** - Clear ownership and expectations
5. **Tracks progress** - Know where you are and what's left

### When to Plan

| Situation | Planning Level |
|-----------|---------------|
| Quick bug fix | Mental plan only |
| Small feature (< 1 day) | Task list |
| Medium feature (1-5 days) | Feature plan |
| Large feature (1-4 weeks) | Detailed implementation plan |
| New project | Full project plan |
| Migration/Refactor | Detailed + rollback plan |

---

## Planning Process

### Step 1: Understand the Goal

Before planning, answer:
- What are we trying to achieve?
- Why is this important?
- Who will use this?
- What does success look like?
- What are the constraints?

### Step 2: Break Down the Work

**Top-Down Approach:**
1. Start with the end goal
2. Identify major phases
3. Break phases into milestones
4. Break milestones into tasks
5. Break tasks into sub-tasks (if complex)

**Task Granularity Guide:**
- Tasks should be 2-8 hours
- If > 8 hours, break it down further
- If < 1 hour, consider combining with related tasks

### Step 3: Identify Dependencies

```
Task A ─────┐
            ├───▶ Task C ───▶ Task E
Task B ─────┘              
                           ├───▶ Task F
Task D ────────────────────┘
```

- Which tasks can run in parallel?
- Which tasks block others?
- What external dependencies exist?

### Step 4: Estimate Time

**Estimation Techniques:**

1. **T-Shirt Sizing**
   - XS: < 2 hours
   - S: 2-4 hours
   - M: 4-8 hours
   - L: 1-2 days
   - XL: 3-5 days
   - XXL: > 1 week (needs breakdown)

2. **Three-Point Estimation**
   - Optimistic: Best case
   - Realistic: Normal case
   - Pessimistic: Worst case
   - Estimate = (O + 4R + P) / 6

3. **Reference-Based**
   - "Similar to [past task] which took [X]"
   - Adjust for differences

**Estimation Multipliers:**
- New technology: 1.5x
- Unclear requirements: 1.5x
- Integration with legacy: 1.5x
- First time doing this: 2x
- Multiple stakeholders: 1.3x

### Step 5: Identify Risks

For each risk:
1. What could go wrong?
2. How likely is it? (Probability)
3. How bad would it be? (Impact)
4. What can we do to prevent it? (Mitigation)
5. What's our backup plan? (Contingency)

### Step 6: Define Success Criteria

Good criteria are:
- **Specific** - Clear, unambiguous
- **Measurable** - Can verify completion
- **Achievable** - Realistic given constraints
- **Relevant** - Actually matters
- **Time-bound** - Has a deadline

---

## Common Planning Mistakes

### 1. Planning Too Much Detail Too Early
**Problem:** Spending days planning before understanding the problem
**Solution:** Plan in waves - high-level first, detail as you approach

### 2. Not Planning Enough
**Problem:** "Let's just start coding"
**Solution:** At minimum, list what you're building and rough order

### 3. Ignoring Dependencies
**Problem:** Assuming everything can be parallelized
**Solution:** Explicitly map dependencies in the plan

### 4. Optimistic Estimates
**Problem:** "This should only take an hour"
**Solution:** Add buffer, use historical data, consider complexity

### 5. Forgetting Non-Coding Tasks
**Problem:** Only estimating code writing time
**Solution:** Include: design, review, testing, documentation, deployment

### 6. Not Updating the Plan
**Problem:** Plan becomes outdated on day 1
**Solution:** Treat plan as living document, update as you learn

### 7. Planning Without Input
**Problem:** Planning in isolation
**Solution:** Involve stakeholders, get feedback early

---

## Plan Components Reference

### Essential Components (Every Plan)
- [ ] Goal/Objective
- [ ] Scope (in/out)
- [ ] Tasks with estimates
- [ ] Success criteria

### Recommended Components (Medium+ Plans)
- [ ] Phase breakdown
- [ ] Dependencies mapped
- [ ] Risk assessment
- [ ] Timeline/milestones
- [ ] Deliverables per phase

### Advanced Components (Large Plans)
- [ ] Resource allocation
- [ ] Communication plan
- [ ] Rollback strategy
- [ ] Quality gates
- [ ] Budget considerations

---

## Templates Quick Reference

| Template | Use When |
|----------|----------|
| Project Plan | Starting a new project/application |
| Feature Plan | Implementing a significant feature |
| Sprint Plan | Planning a 1-2 week iteration |
| Migration Plan | Moving/upgrading systems |
| Incident Response | Emergency situations |

---

## Agile Planning Integration

### Sprint Planning
```
1. Review backlog
2. Select items for sprint
3. Break into tasks
4. Estimate tasks
5. Commit to sprint goal
```

### Story Points vs Hours
- Story points: Relative complexity
- Hours: Actual time estimate
- Use what works for your team

### Definition of Ready
Before starting work:
- [ ] Requirements clear
- [ ] Acceptance criteria defined
- [ ] Dependencies identified
- [ ] Estimate provided
- [ ] No blockers

### Definition of Done
Before calling it complete:
- [ ] Code complete
- [ ] Tests passing
- [ ] Reviewed
- [ ] Documented
- [ ] Deployed
- [ ] Verified

---

## Planning Tools

### For Individual Work
- Markdown files (like these templates)
- TODO apps (Todoist, Things)
- Note apps (Notion, Obsidian)

### For Team Work
- Project management (Jira, Linear, Asana)
- Kanban boards (Trello)
- Docs (Confluence, Notion)

### For Visualization
- Gantt charts (Mermaid, Gantt Project)
- Mind maps (Miro, Whimsical)
- Flowcharts (Excalidraw, Lucidchart)

---

## Quick Planning Checklist

### Before Starting Any Work
- [ ] Do I know what I'm building?
- [ ] Do I know why it matters?
- [ ] Do I know what "done" looks like?
- [ ] Do I have what I need to start?

### For Features (1+ days)
- [ ] Requirements documented
- [ ] Approach chosen
- [ ] Tasks listed
- [ ] Estimates provided
- [ ] Risks considered

### For Projects (1+ weeks)
- [ ] Full project plan created
- [ ] Phases defined
- [ ] Resources identified
- [ ] Stakeholders informed
- [ ] Regular check-ins scheduled

---

## Remember

> "Plans are worthless, but planning is everything." - Dwight D. Eisenhower

The value of planning isn't the plan itself - it's the thinking you do to create it. Plans will change, but the understanding you gain will remain.

**The best plan is one that:**
1. You can actually follow
2. Helps you make decisions
3. Keeps you focused
4. Can be updated easily
5. Gets the job done
