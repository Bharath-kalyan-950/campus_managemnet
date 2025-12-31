"""
Python API server for classroom AI agent
This can be called from Node.js or used as a standalone service
"""
import sys
import json
import logging
from classroom_agent import ClassroomAIAgent

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No action specified"}))
        return
    
    action = sys.argv[1]
    date = sys.argv[2] if len(sys.argv) > 2 else None
    
    try:
        with ClassroomAIAgent() as agent:
            if action == "analyze_conflicts":
                result = agent.analyze_conflicts(date)
            elif action == "process_allocations":
                result = agent.process_allocations(date)
            elif action == "generate_notifications":
                result = agent.generate_notifications(date)
            elif action == "get_status":
                result = agent.get_agent_status(date)
            else:
                result = {"success": False, "error": f"Unknown action: {action}"}
            
            print(json.dumps(result))
    
    except Exception as e:
        logging.error(f"Agent execution failed: {e}")
        print(json.dumps({"success": False, "error": str(e)}))

if __name__ == "__main__":
    main()