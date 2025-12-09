# Claude Skills Collection

A collection of custom Claude Skills for enhanced AI-assisted development, design, and planning workflows.

## What are Claude Skills?

Skills are specialized instruction sets that teach Claude how to perform specific tasks in a repeatable, high-quality way. They follow [Anthropic's official guidelines](https://github.com/anthropics/skills) for skill creation.

## Available Skills

| Skill | Description |
|-------|-------------|
| **frontend-design** | Create premium, production-grade UI with modern design principles and smooth animations |
| **code-review** | Comprehensive code reviews for security, performance, and quality |
| **creative-design** | Unleash creative freedom for artistic designs, animations, and generative art |
| **prompt-engineering** | Generate ultra-detailed, high-quality prompts for AI systems |
| **plan-mode** | Create detailed implementation plans with phases, tasks, and timelines |

## Installation

### For Claude Code

Copy the `.claude/skills` folder to your project:

```bash
# Clone this repo
git clone https://github.com/Saeedijaz69/ClaudeSkills.git

# Copy skills to your project
cp -r ClaudeSkills/.claude/skills /your-project/.claude/
```

Or add individual skills by copying specific skill folders.

### For Claude.ai

1. Go to **Settings > Capabilities**
2. Enable Skills
3. Upload the skill folder as a ZIP file

## Skills Structure

Each skill follows the Anthropic standard structure:

```
skill-name/
├── SKILL.md          # Main skill file with instructions
├── scripts/          # Optional executable scripts
├── resources/        # Templates, components, references
└── docs/             # Additional documentation
```

## Skills Overview

### 1. Frontend Design
- Premium UI design principles
- Modern animation patterns
- Component best practices
- Recommended libraries (Framer Motion, GSAP, shadcn/ui)

### 2. Code Review
- Security vulnerability detection
- Performance analysis
- Code quality checks
- Complexity analysis scripts

### 3. Creative Design
- Creative freedom with professional execution
- Animation libraries and techniques
- Generative art patterns
- SVG, Canvas, WebGL exploration

### 4. Prompt Engineering
- Structured prompt frameworks
- Templates for analysis, code, images
- Best practices and optimization
- Few-shot and chain-of-thought techniques

### 5. Plan Mode
- Project planning templates
- Feature implementation plans
- Phase-based task breakdown
- Risk assessment and timelines

## Contributing

Feel free to submit issues and pull requests to improve these skills!

## License

MIT License - Feel free to use and modify.

## Credits

Created following [Anthropic's Agent Skills guidelines](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
