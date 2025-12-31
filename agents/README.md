# Python AI Agents for Classroom Allocation

This folder contains the Python-based AI agents that power the intelligent classroom allocation system using Google Gemini AI.

## 🏗️ Architecture

```
agents/
├── __init__.py              # Package initialization
├── config.py                # Configuration management
├── database.py              # Database operations
├── gemini_client.py         # Google Gemini AI client
├── classroom_agent.py       # Main AI agent class
├── fallback_logic.py        # Rule-based fallback logic
├── api_server.py           # Command-line API interface
├── setup.py                # Setup and installation script
├── test_agent.py           # Testing script
├── requirements.txt        # Python dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Setup Python Environment

```bash
cd agents
python setup.py
```

This will:
- Install required Python packages
- Create `.env` file with configuration
- Test all imports

### 2. Test the Agent

```bash
python test_agent.py
```

### 3. Manual Testing

```bash
# Test agent status
python api_server.py get_status

# Test conflict analysis
python api_server.py analyze_conflicts 2025-01-25

# Test allocation processing
python api_server.py process_allocations 2025-01-25

# Test notification generation
python api_server.py generate_notifications 2025-01-25
```

## 🧠 AI Features

### Google Gemini Integration
- **Model**: `gemini-1.5-flash-latest`
- **Capabilities**: Natural language reasoning, JSON response parsing
- **Fallback**: Rule-based logic when AI unavailable

### Core Functions

1. **Conflict Analysis**
   - Analyzes scheduling conflicts
   - Provides resolution strategies
   - Suggests alternative rooms
   - Estimates resolution time

2. **Allocation Processing**
   - Makes intelligent room assignments
   - Considers capacity, equipment, utilization
   - Provides confidence scores
   - Optimizes campus-wide utilization

3. **Notification Generation**
   - Creates contextual messages
   - Tailored for faculty, students, admins
   - Appropriate priority levels
   - Action-required flags

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Google Gemini AI
GEMINI_API_KEY=your_api_key_here

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_campus_db
```

### Agent Settings (config.py)
- `MAX_RETRIES`: API retry attempts (default: 3)
- `TIMEOUT_SECONDS`: Request timeout (default: 30)
- `CONFIDENCE_THRESHOLD`: Decision confidence threshold (default: 0.7)

## 📊 Database Integration

The agent connects to MySQL database and performs:
- **Read Operations**: Conflicts, requests, rooms, allocations
- **Write Operations**: Decisions, notifications, allocations
- **Updates**: Request status changes

### Key Tables
- `allocation_conflicts`: Scheduling conflicts
- `allocation_requests`: Room requests
- `classrooms`: Available rooms
- `agent_decisions`: AI decisions log
- `agent_notifications`: Generated notifications

## 🔄 Integration with Node.js

The Python agent is called from Node.js via:
```javascript
// app/api/classroom-agent/ai-process/route.js
const result = await callPythonAgent(action, date);
```

### Communication Protocol
- **Input**: JSON via command line arguments
- **Output**: JSON to stdout
- **Error Handling**: stderr for errors, exit codes

## 🧪 Testing

### Unit Tests
```bash
python test_agent.py
```

### Integration Tests
```bash
# From Node.js server
curl -X POST http://localhost:3000/api/classroom-agent/ai-process \
  -H "Content-Type: application/json" \
  -d '{"action": "analyze_conflicts", "date": "2025-01-25"}'
```

## 🛠️ Development

### Adding New Features

1. **Extend ClassroomAIAgent** (`classroom_agent.py`)
2. **Add Gemini prompts** (`gemini_client.py`)
3. **Update fallback logic** (`fallback_logic.py`)
4. **Add API endpoints** (`api_server.py`)

### Error Handling
- Graceful degradation to rule-based logic
- Comprehensive logging
- Database transaction safety
- API timeout handling

## 📈 Performance

### Optimization Features
- Connection pooling for database
- Exponential backoff for API retries
- Efficient JSON parsing
- Context manager for resource cleanup

### Monitoring
- Detailed logging with timestamps
- Performance metrics tracking
- Error rate monitoring
- Confidence score analytics

## 🔒 Security

### Best Practices
- Environment variable for API keys
- SQL injection prevention
- Input validation and sanitization
- Error message sanitization

## 🚨 Troubleshooting

### Common Issues

1. **Python not found**
   ```bash
   # Ensure Python is in PATH
   python --version
   ```

2. **Module import errors**
   ```bash
   pip install -r requirements.txt
   ```

3. **Database connection failed**
   - Check MySQL server is running
   - Verify credentials in `.env`

4. **Gemini API errors**
   - Verify API key is valid
   - Check internet connection
   - Monitor API quotas

### Debug Mode
```bash
# Enable debug logging
export LOG_LEVEL=DEBUG
python test_agent.py
```

## 📝 Logs

Logs are output to console with format:
```
2025-01-25 10:30:45 - classroom_agent - INFO - Processing allocation request...
```

## 🤝 Contributing

1. Follow Python PEP 8 style guidelines
2. Add type hints for new functions
3. Include docstrings for all classes/methods
4. Add tests for new features
5. Update this README for significant changes

## 📄 License

This project is part of the Smart Campus Management system.