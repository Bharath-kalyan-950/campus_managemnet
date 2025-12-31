"""
Google Gemini AI client for classroom allocation agent
"""
import google.generativeai as genai
import json
import logging
import time
from typing import Dict, Any, Optional
from config import Config

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self):
        self.config = Config()
        self.model = None
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize Gemini AI client"""
        try:
            if not self.config.GEMINI_API_KEY:
                logger.warning("Gemini API key not found")
                return False
            
            genai.configure(api_key=self.config.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(self.config.GEMINI_MODEL)
            logger.info("Gemini AI client initialized successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize Gemini client: {e}")
            return False
    
    def generate_response(self, prompt: str, max_retries: int = 3) -> Optional[str]:
        """Generate response from Gemini AI with retry logic"""
        if not self.model:
            logger.warning("Gemini model not available")
            return None
        
        for attempt in range(max_retries):
            try:
                response = self.model.generate_content(prompt)
                if response.text:
                    return response.text.strip()
                else:
                    logger.warning(f"Empty response from Gemini (attempt {attempt + 1})")
            except Exception as e:
                logger.error(f"Gemini API error (attempt {attempt + 1}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
        
        return None
    
    def parse_json_response(self, response_text: str) -> Optional[Dict[str, Any]]:
        """Parse JSON response from Gemini, handling markdown formatting"""
        if not response_text:
            return None
        
        try:
            # Remove markdown code blocks if present
            clean_text = response_text.replace('```json\n', '').replace('\n```', '').strip()
            return json.loads(clean_text)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            logger.debug(f"Response text: {response_text}")
            return None
    
    def analyze_conflicts(self, conflicts: list, available_rooms: list, requests: list) -> Optional[Dict[str, Any]]:
        """Use Gemini AI to analyze conflicts"""
        conflict_data = [
            {
                'id': c.get('conflict_id'),
                'type': c.get('conflict_type'),
                'description': c.get('description'),
                'severity': c.get('severity'),
                'request_id': c.get('request_id')
            } for c in conflicts
        ]
        
        room_data = [
            {
                'id': r.get('room_id'),
                'name': r.get('room_name'),
                'capacity': r.get('capacity'),
                'type': r.get('room_type'),
                'building': r.get('building'),
                'equipment': r.get('equipment'),
                'utilization': r.get('utilization_percentage', 0)
            } for r in available_rooms
        ]
        
        prompt = f"""
You are an expert classroom allocation system. Analyze the following conflicts and provide intelligent resolutions.

CONFLICTS TO ANALYZE:
{json.dumps(conflict_data, indent=2)}

AVAILABLE ROOMS:
{json.dumps(room_data, indent=2)}

Please provide a JSON response with the following structure:
{{
  "analysis": "Overall analysis summary",
  "conflicts": [
    {{
      "conflict_id": "conflict_id",
      "root_cause": "identified root cause",
      "resolution_strategy": "recommended strategy",
      "recommended_room": "best room ID or null",
      "alternative_rooms": ["room1", "room2", "room3"],
      "priority_score": 1-10,
      "risk_level": "low/medium/high",
      "estimated_resolution_time": "time estimate"
    }}
  ],
  "recommendations": ["overall recommendation 1", "overall recommendation 2"]
}}

Focus on:
1. Identifying root causes of conflicts
2. Suggesting optimal room assignments
3. Providing alternative options
4. Prioritizing based on urgency and impact
5. Estimating resolution complexity
"""
        
        response_text = self.generate_response(prompt)
        return self.parse_json_response(response_text)
    
    def make_allocation_decisions(self, pending_requests: list, available_rooms: list, existing_allocations: list) -> Optional[Dict[str, Any]]:
        """Use Gemini AI to make allocation decisions with enhanced conflict resolution"""
        request_data = [
            {
                'id': r.get('request_id'),
                'faculty': r.get('faculty_name'),
                'course': r.get('course_name') or r.get('course_code'),
                'date': r.get('requested_date'),
                'time': f"{r.get('start_time')} - {r.get('end_time')}",
                'capacity_needed': r.get('expected_strength'),
                'purpose': r.get('purpose'),
                'priority': r.get('priority'),
                'equipment_needed': r.get('required_equipment')
            } for r in pending_requests
        ]
        
        room_data = [
            {
                'id': r.get('room_id'),
                'name': r.get('room_name'),
                'capacity': r.get('capacity'),
                'type': r.get('room_type'),
                'building': r.get('building'),
                'equipment': r.get('equipment'),
                'utilization': r.get('utilization_percentage', 0)
            } for r in available_rooms
        ]
        
        allocation_data = [
            {
                'room_id': a.get('room_id'),
                'date': a.get('allocated_date'),
                'time': f"{a.get('start_time')} - {a.get('end_time')}",
                'course': a.get('course_code')
            } for a in existing_allocations
        ]
        
        prompt = f"""
You are an expert classroom allocation system with advanced conflict resolution capabilities. Analyze requests and provide intelligent solutions when conflicts occur.

PENDING REQUESTS:
{json.dumps(request_data, indent=2)}

AVAILABLE ROOMS:
{json.dumps(room_data, indent=2)}

EXISTING ALLOCATIONS:
{json.dumps(allocation_data, indent=2)}

Please provide a JSON response with the following structure:
{{
  "decisions": [
    {{
      "request_id": "request_id",
      "decision": "approve/suggest_alternative/require_approval/reject",
      "allocated_room": "room_id or null",
      "confidence_score": 0.0-1.0,
      "reasoning": "detailed explanation of the decision",
      "conflict_type": "time_conflict/capacity_mismatch/equipment_missing/no_rooms_available",
      "suggestions": [
        {{
          "type": "alternative_room",
          "room_id": "room_id",
          "room_name": "room_name",
          "reason": "why this room is suggested",
          "compromises": ["what faculty needs to accept"],
          "benefits": ["advantages of this option"]
        }},
        {{
          "type": "time_adjustment",
          "suggested_start_time": "HH:MM",
          "suggested_end_time": "HH:MM",
          "reason": "why this time is better",
          "impact": "minimal/moderate/significant"
        }},
        {{
          "type": "equipment_alternative",
          "missing_equipment": ["projector", "audio_system"],
          "available_alternatives": ["portable projector", "wireless mic"],
          "setup_required": "5-10 minutes before class"
        }}
      ],
      "faculty_approval_required": true/false,
      "approval_message": "message to show faculty for approval",
      "auto_approve_conditions": ["conditions under which this can be auto-approved"]
    }}
  ],
  "optimization_notes": "Overall strategy and recommendations",
  "utilization_impact": "Impact on campus room utilization"
}}

Enhanced Decision Logic:
1. **APPROVE**: Perfect match found (room, time, equipment, capacity)
2. **SUGGEST_ALTERNATIVE**: Good alternatives available with minor compromises
3. **REQUIRE_APPROVAL**: Suitable options exist but need faculty confirmation
4. **REJECT**: No viable options available

For conflicts, provide specific suggestions:
- Alternative rooms with similar capacity and equipment
- Time adjustments (±30 minutes) to avoid conflicts
- Equipment alternatives or workarounds
- Capacity adjustments (larger rooms if available)
- Building alternatives with justification

Make suggestions practical and faculty-friendly with clear benefits and minimal compromises.
"""
        
        response_text = self.generate_response(prompt)
        return self.parse_json_response(response_text)
    
    def generate_notifications(self, allocations: list, conflicts: list, decisions: list) -> Optional[Dict[str, Any]]:
        """Use Gemini AI to generate notifications"""
        allocation_data = [
            {
                'faculty': a.get('faculty_name'),
                'course': a.get('course_name') or a.get('course_code'),
                'room': a.get('room_name'),
                'building': a.get('building'),
                'date': a.get('allocated_date'),
                'time': f"{a.get('start_time')} - {a.get('end_time')}"
            } for a in allocations
        ]
        
        conflict_data = [
            {
                'type': c.get('conflict_type'),
                'description': c.get('description'),
                'severity': c.get('severity'),
                'faculty': c.get('faculty_name')
            } for c in conflicts
        ]
        
        decision_data = [
            {
                'type': d.get('decision_type'),
                'reasoning': d.get('reasoning'),
                'confidence': d.get('confidence_score')
            } for d in decisions
        ]
        
        prompt = f"""
You are an expert communication system for a classroom allocation platform. Generate appropriate notifications based on the following data.

RECENT ALLOCATIONS:
{json.dumps(allocation_data, indent=2)}

ACTIVE CONFLICTS:
{json.dumps(conflict_data, indent=2)}

RECENT DECISIONS:
{json.dumps(decision_data, indent=2)}

Please provide a JSON response with the following structure:
{{
  "notifications": [
    {{
      "recipient_type": "faculty/student/admin",
      "recipient_id": "specific_id or 'all'",
      "type": "allocation_approved/allocation_rejected/conflict_alert/room_changed",
      "title": "Clear, concise title",
      "message": "Detailed, professional message",
      "priority": "low/medium/high",
      "action_required": true/false
    }}
  ]
}}

Guidelines:
1. Faculty notifications: Professional, include all relevant details (room, time, building)
2. Student notifications: Clear, friendly, focus on what they need to know
3. Admin notifications: Technical details, actionable information
4. Conflict alerts: Urgent tone, clear next steps
5. Use appropriate priority levels based on urgency
6. Include specific room names, times, and dates
7. Be concise but informative
"""
        
        response_text = self.generate_response(prompt)
        return self.parse_json_response(response_text)