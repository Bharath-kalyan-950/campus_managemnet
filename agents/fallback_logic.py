"""
Fallback logic for when AI is unavailable
"""
import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class FallbackAgent:
    """Rule-based fallback logic when Gemini AI is unavailable"""
    
    def analyze_conflicts(self, conflicts: List[Dict[str, Any]], available_rooms: List[Dict[str, Any]], requests: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyze conflicts using rule-based logic"""
        logger.info("Using rule-based conflict analysis")
        
        analysis = {
            "analysis": "Rule-based conflict analysis completed",
            "conflicts": [],
            "recommendations": []
        }
        
        for conflict in conflicts:
            conflict_analysis = {
                "conflict_id": conflict.get('conflict_id'),
                "root_cause": self._identify_root_cause(conflict),
                "resolution_strategy": self._determine_resolution_strategy(conflict, available_rooms),
                "recommended_room": self._find_best_alternative_room(conflict, available_rooms),
                "alternative_rooms": self._find_alternative_rooms(conflict, available_rooms, 3),
                "priority_score": self._calculate_priority_score(conflict),
                "risk_level": self._assess_risk_level(conflict),
                "estimated_resolution_time": self._estimate_resolution_time(conflict)
            }
            analysis["conflicts"].append(conflict_analysis)
        
        analysis["recommendations"] = self._generate_conflict_recommendations(conflicts, available_rooms)
        return analysis
    
    def process_allocations(self, pending_requests: List[Dict[str, Any]], available_rooms: List[Dict[str, Any]], existing_allocations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Process allocations using rule-based logic"""
        logger.info("Using rule-based allocation processing")
        
        decisions = []
        processed = approved = rejected = deferred = 0
        
        # Sort requests by priority
        sorted_requests = sorted(pending_requests, key=lambda x: self._get_priority_weight(x.get('priority', 'low')), reverse=True)
        
        for request in sorted_requests:
            processed += 1
            
            # Find suitable room
            suitable_room = self._find_suitable_room(request, available_rooms, existing_allocations)
            
            if suitable_room:
                decision = {
                    "request_id": request['request_id'],
                    "decision": "approve",
                    "allocated_room": suitable_room['room_id'],
                    "confidence_score": 0.8,
                    "reasoning": f"Rule-based allocation: {suitable_room['room_name']} matches requirements",
                    "alternative_options": [r['room_id'] for r in available_rooms[:2] if r['room_id'] != suitable_room['room_id']],
                    "conditions": []
                }
                approved += 1
            else:
                decision = {
                    "request_id": request['request_id'],
                    "decision": "defer",
                    "allocated_room": None,
                    "confidence_score": 0.3,
                    "reasoning": "No suitable room available with required capacity and equipment",
                    "alternative_options": [r['room_id'] for r in available_rooms[:2]],
                    "conditions": ["Increase room capacity", "Consider alternative time slots"]
                }
                deferred += 1
            
            decisions.append(decision)
        
        return {
            "processed_requests": processed,
            "approved": approved,
            "rejected": rejected,
            "deferred": deferred,
            "ai_insights": {
                "optimization_notes": "Rule-based allocation with capacity matching applied",
                "utilization_impact": self._calculate_utilization_impact(decisions, available_rooms)
            }
        }
    
    def generate_notifications(self, allocations: List[Dict[str, Any]], conflicts: List[Dict[str, Any]], decisions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate notifications using rule-based logic"""
        logger.info("Using rule-based notification generation")
        
        notifications = []
        
        # Notifications for allocations
        for allocation in allocations:
            notifications.append({
                "recipient_type": "faculty",
                "recipient_id": allocation.get('faculty_id'),
                "type": "allocation_approved",
                "title": "Classroom Allocated",
                "message": f"Your request for {allocation.get('course_code')} has been allocated to {allocation.get('room_name')}",
                "priority": "medium",
                "action_required": False
            })
        
        # Notifications for conflicts
        for conflict in conflicts:
            notifications.append({
                "recipient_type": "admin",
                "recipient_id": "admin",
                "type": "conflict_alert",
                "title": "Allocation Conflict Detected",
                "message": f"{conflict.get('conflict_type')}: {conflict.get('description')}",
                "priority": conflict.get('severity', 'medium'),
                "action_required": True
            })
        
        return {"notifications": notifications}
    
    def _identify_root_cause(self, conflict: Dict[str, Any]) -> str:
        """Identify root cause of conflict"""
        conflict_type = conflict.get('conflict_type', '')
        
        if conflict_type == 'room_overlap':
            return "Multiple requests for the same time slot"
        elif conflict_type == 'faculty_clash':
            return "Faculty member assigned to multiple overlapping sessions"
        elif conflict_type == 'equipment_unavailable':
            return "Required equipment not available in requested room"
        else:
            return "General scheduling conflict detected"
    
    def _determine_resolution_strategy(self, conflict: Dict[str, Any], available_rooms: List[Dict[str, Any]]) -> str:
        """Determine resolution strategy"""
        strategies = [
            "Reassign to alternative room with similar capacity",
            "Adjust time slot to avoid conflicts",
            "Split large groups into multiple sessions",
            "Upgrade to larger room if available",
            "Provide alternative equipment setup"
        ]
        
        # Simple rule-based selection
        conflict_type = conflict.get('conflict_type', '')
        if conflict_type == 'room_overlap':
            return strategies[0]
        elif conflict_type == 'equipment_unavailable':
            return strategies[4]
        else:
            return strategies[1]
    
    def _find_best_alternative_room(self, conflict: Dict[str, Any], available_rooms: List[Dict[str, Any]]) -> str:
        """Find best alternative room"""
        suitable_rooms = [room for room in available_rooms if room.get('status') == 'available']
        return suitable_rooms[0]['room_id'] if suitable_rooms else "Manual assignment required"
    
    def _find_alternative_rooms(self, conflict: Dict[str, Any], available_rooms: List[Dict[str, Any]], count: int) -> List[str]:
        """Find alternative rooms"""
        return [room['room_id'] for room in available_rooms[:count] if room.get('status') == 'available']
    
    def _calculate_priority_score(self, conflict: Dict[str, Any]) -> int:
        """Calculate priority score"""
        severity_scores = {'critical': 10, 'high': 8, 'medium': 6, 'low': 3}
        return severity_scores.get(conflict.get('severity', 'medium'), 5)
    
    def _assess_risk_level(self, conflict: Dict[str, Any]) -> str:
        """Assess risk level"""
        severity = conflict.get('severity', 'medium')
        if severity in ['critical', 'high']:
            return 'high'
        elif severity == 'medium':
            return 'medium'
        else:
            return 'low'
    
    def _estimate_resolution_time(self, conflict: Dict[str, Any]) -> str:
        """Estimate resolution time"""
        time_estimates = {
            'room_overlap': '10-15 minutes',
            'faculty_clash': '15-20 minutes',
            'equipment_unavailable': '20-30 minutes'
        }
        return time_estimates.get(conflict.get('conflict_type'), '15 minutes')
    
    def _generate_conflict_recommendations(self, conflicts: List[Dict[str, Any]], available_rooms: List[Dict[str, Any]]) -> List[str]:
        """Generate conflict recommendations"""
        recommendations = [
            "Review high-priority conflicts first",
            "Consider alternative time slots for flexible requests",
            "Optimize room utilization by balancing allocations"
        ]
        
        if len(conflicts) > 5:
            recommendations.append("High conflict volume detected - consider batch processing")
        
        if len(available_rooms) < len(conflicts):
            recommendations.append("Limited room availability - prioritize essential requests")
        
        return recommendations
    
    def _get_priority_weight(self, priority: str) -> int:
        """Get priority weight for sorting"""
        weights = {'urgent': 4, 'high': 3, 'medium': 2, 'low': 1}
        return weights.get(priority, 1)
    
    def _find_suitable_room(self, request: Dict[str, Any], available_rooms: List[Dict[str, Any]], existing_allocations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Find suitable room for request"""
        required_capacity = request.get('expected_strength', 0)
        
        for room in available_rooms:
            # Check capacity
            if room.get('capacity', 0) < required_capacity:
                continue
            
            # Check availability (simplified - no time conflict checking in fallback)
            if room.get('status') == 'available':
                return room
        
        return None
    
    def _calculate_utilization_impact(self, decisions: List[Dict[str, Any]], available_rooms: List[Dict[str, Any]]) -> str:
        """Calculate utilization impact"""
        approved_count = len([d for d in decisions if d['decision'] == 'approve'])
        total_rooms = len(available_rooms)
        
        if total_rooms == 0:
            return "No rooms available"
        
        utilization_rate = (approved_count / total_rooms) * 100
        
        if utilization_rate > 80:
            return "High utilization - excellent room usage"
        elif utilization_rate > 60:
            return "Good utilization - balanced allocation"
        elif utilization_rate > 40:
            return "Moderate utilization - room for optimization"
        else:
            return "Low utilization - many rooms available"