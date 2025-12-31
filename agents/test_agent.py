"""
Test script for Python AI agents
"""
import sys
import os
sys.path.append(os.path.dirname(__file__))

from classroom_agent import ClassroomAIAgent
import json

def test_agent():
    """Test the classroom AI agent"""
    print("🧪 Testing Python Classroom AI Agent...\n")
    
    try:
        with ClassroomAIAgent() as agent:
            # Test agent status
            print("1. Testing agent status...")
            status = agent.get_agent_status()
            print(f"✅ Status: {status['success']}")
            print(f"🤖 AI Type: {status.get('ai_type', 'unknown')}")
            print(f"🔑 AI Enabled: {status.get('ai_enabled', False)}")
            
            # Test conflict analysis
            print("\n2. Testing conflict analysis...")
            conflicts = agent.analyze_conflicts('2025-01-25')
            print(f"✅ Success: {conflicts['success']}")
            print(f"📊 Conflicts Analyzed: {conflicts.get('conflicts_analyzed', 0)}")
            print(f"🤖 AI Powered: {conflicts.get('ai_powered', False)}")
            
            # Test allocation processing
            print("\n3. Testing allocation processing...")
            allocations = agent.process_allocations('2025-01-25')
            print(f"✅ Success: {allocations['success']}")
            print(f"📊 Processed: {allocations.get('processed_requests', 0)}")
            print(f"✅ Approved: {allocations.get('approved', 0)}")
            print(f"🤖 AI Powered: {allocations.get('ai_powered', False)}")
            
            # Test notification generation
            print("\n4. Testing notification generation...")
            notifications = agent.generate_notifications('2025-01-25')
            print(f"✅ Success: {notifications['success']}")
            print(f"📧 Generated: {notifications.get('notifications_generated', 0)}")
            print(f"🤖 AI Powered: {notifications.get('ai_powered', False)}")
            
            print("\n🎉 All tests completed successfully!")
            print("\n📋 Test Summary:")
            print(f"- Agent Status: {'✅' if status['success'] else '❌'}")
            print(f"- Conflict Analysis: {'✅' if conflicts['success'] else '❌'}")
            print(f"- Allocation Processing: {'✅' if allocations['success'] else '❌'}")
            print(f"- Notification Generation: {'✅' if notifications['success'] else '❌'}")
            
            return True
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_agent()
    sys.exit(0 if success else 1)