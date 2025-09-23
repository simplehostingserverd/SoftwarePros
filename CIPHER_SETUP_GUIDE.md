# Cipher Setup Guide for SoftwarePros Code Analysis

## Overview

Cipher is now configured for comprehensive code analysis of your SoftwarePros project. This guide will help you set up the required API keys and start using Cipher for code analysis.

## Required API Keys

### 1. OpenRouter API Key (Required)
- **Purpose**: Access to advanced AI models (Claude 3.5 Sonnet, GPT-4) for code analysis
- **Get API Key**: [https://openrouter.ai/keys](https://openrouter.ai/keys)
- **Environment Variable**: `OPENROUTER_API_KEY`
- **Models Used**:
  - `anthropic/claude-3.5-sonnet` - Main analysis model
  - `openai/gpt-4o-mini` - Evaluation model

### 2. Firecrawl API Key (Required)
- **Purpose**: Advanced web scraping for documentation research and best practices
- **Get API Key**: [https://firecrawl.dev/app/api-keys](https://firecrawl.dev/app/api-keys)
- **Environment Variable**: `FIRECRAWL_API_KEY`
- **Use Cases**:
  - Research documentation for libraries/frameworks
  - Find best practices and examples
  - Analyze security guidelines

### 3. OpenAI API Key (Required for Embeddings)
- **Purpose**: Text embeddings for memory and search functionality
- **Get API Key**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Environment Variable**: `OPENAI_API_KEY`
- **Model Used**: `text-embedding-3-small`

## Setup Instructions

### Step 1: Configure Environment Variables

Edit the `.env` file in the `cipher` directory:

```bash
cd cipher
nano .env
```

Add your API keys:

```bash
# Required API Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional fallback APIs
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Step 2: Install Dependencies

```bash
cd cipher
npm install
```

### Step 3: Build Cipher (if needed)

```bash
npm run build:no-ui
```

### Step 4: Run Cipher for Code Analysis

#### Interactive Mode (Recommended)
```bash
cipher
```

#### One-shot Analysis
```bash
cipher "Analyze the authentication system in my SoftwarePros project"
```

#### API Server Mode
```bash
cipher --mode api
```

#### Web UI Mode
```bash
cipher --mode ui
```

## Cipher Capabilities for Code Analysis

### 🔍 **Code Analysis Features**

1. **Security Analysis**
   - Vulnerability detection
   - Authentication flow review
   - Data validation checks
   - SQL injection prevention

2. **Architecture Review**
   - Component structure analysis
   - Database design evaluation
   - API endpoint security
   - Performance bottlenecks

3. **Best Practices**
   - Code quality assessment
   - TypeScript usage patterns
   - React/Next.js optimization
   - Error handling improvements

### 🧠 **Memory & Context**

Cipher maintains memory of:
- Previous analysis sessions
- Codebase knowledge
- Identified patterns and issues
- Recommended solutions

### 🔧 **Available Tools**

1. **Filesystem Access** - Read and analyze your code files
2. **Web Research** - Use Firecrawl to research best practices
3. **Memory Tools** - Store and recall analysis findings
4. **Knowledge Graph** - Map relationships in your codebase

## Example Usage Commands

### General Code Analysis
```bash
cipher "Perform a comprehensive security analysis of my authentication system"
```

### Specific File Analysis
```bash
cipher "Review the registration form validation and suggest improvements"
```

### Architecture Review
```bash
cipher "Analyze the database schema and suggest optimizations"
```

### Performance Analysis
```bash
cipher "Identify performance bottlenecks in the Next.js application"
```

## Configuration Details

- **Configuration File**: `memAgent/cipher.yml`
- **Environment File**: `.env`
- **Log Level**: Set `CIPHER_LOG_LEVEL=debug` for detailed logging
- **Memory Type**: Uses both knowledge and reflection memory
- **Vector Store**: In-memory (can be upgraded to Qdrant/Milvus for persistence)

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify API keys are correct and have sufficient credits
   - Check environment variable names match exactly

2. **MCP Server Errors**
   - Ensure Node.js 18+ is installed
   - Run: `npx -y @modelcontextprotocol/server-filesystem --help` to test

3. **Build Issues**
   - Try: `npm run build:no-ui` to skip UI build
   - Clear node_modules: `rm -rf node_modules && npm install`

### Debug Mode
```bash
CIPHER_LOG_LEVEL=debug cipher "your analysis request"
```

## Next Steps

1. **Set up API keys** using the links above
2. **Update the .env file** with your actual API keys
3. **Run Cipher** to start analyzing your SoftwarePros codebase
4. **Use memory features** to build knowledge over multiple sessions

Cipher will help you identify security issues, optimize performance, and maintain code quality across your entire SoftwarePros project! 🚀