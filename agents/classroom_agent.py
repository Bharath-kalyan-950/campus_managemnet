"""
Main Classroom AI Agent using Google Gemini
"""
import logging
import json
import time
from datetime import datetime
from typing import Dict, Any, List, Optional
from config import Config
from database import DatabaseManager
from gemini_client import GeminiClient
from fallback_logic import FallbackAgent

logger = logging.getLogger(__name__)

class ClassroomAIAgent:
    def __init__(self):
        self.config = Config()
        self.db = DatabaseManager()
        self.gemini = GeminiClient()
        self.fallback = FallbackAgent()
        
        # Initialize logging
        logging.basicConfig(
            level=getattr(logging, self.config.LOG_LEVEL),
            format=self.config.LOG_FORMAT
        )
        
        logger.info("Classroom AI Agent initialized")
    
    def __enter__(self):
        """Context manager entry"""
        self.db.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.db.disconnect()
    
    def analyze_conflicts(self, date: str = None) -> Dict[str, Any]:
        """Analyze allocation conflicts using Google Gemini AI"""
        try:
            logger.info("🔍 Analyzing conflicts with Google Gemini AI...")
            
            # Get data from database
            conflicts = self.db.get_conflicts(date)
            available_rooms = self.db.get_available_rooms(date) if date else []
            requests = self.db.get_pending_requests(date) if date else []
            
            logger.info(f"Found {len(conflicts)} conflicts to analyze")
            
            # Use Gemini AI for analysis
            ai_analysis = self.gemini.analyze_conflicts(conflicts, available_rooms, requests)
            
            if ai_analysis:
                logger.info("✅ Gemini AI analysis completed successfully")
                
                # Store AI analysis results
                self._store_conflict_analysis(ai_analysis, conflicts)
                
                return {
                    'success': True,
                    'conflicts_analyzed': len(conflicts),
                    'ai_analysis': ai_analysis,
                    'ai_powered': True
                }
            else:
                logger.warning("Gemini AI unavailable, using fallback logic")
                fallback_analysis = self.fallback.analyze_conflicts(conflicts, available_rooms, requests)
                
                return {
                    'success': True,
                    'conflicts_analyzed': len(conflicts),
                    'ai_analysis': fallback_analysis,
                    'ai_powered': False
                }
                
        except Exception as e:
            logger.error(f"Conflict analysis failed: {e}")
            return {
                'success': False,
                'error': str(e),
                'conflicts_analyzed': 0
            }
    
    def process_allocations(self, date: str) -> Dict[str, Any]:
        """Process allocation requests using Google Gemini AI"""
        try:
            logger.info("🤖 Processing allocations with Google Gemini AI...")
            
            # Get data from database
            pending_requests = self.db.get_pending_requests(date)
            available_rooms = self.db.get_available_rooms(date)
            existing_allocations = self.db.get_existing_allocations(date)
            
            logger.info(f"Processing {len(pending_requests)} pending requests")
            
            # Use Gemini AI for decisions
            ai_decisions = self.gemini.make_allocation_decisions(
                pending_requests, available_rooms, existing_allocations
            )
            
            if ai_decisions:
                logger.info("✅ Gemini AI decisions completed successfully")
                
                # Process AI decisions
                results = self._process_ai_decisions(ai_decisions, pending_requests)
                
                return {
                    'success': True,
                    'processed_requests': results['processed'],
                    'approved': results['approved'],
                    'rejected': results['rejected'],
                    'deferred': results['deferred'],
                    'ai_insights': {
                        'optimization_notes': ai_decisions.get('optimization_notes'),
                        'utilization_impact': ai_decisions.get('utilization_impact')
                    },
                    'ai_powered': True
                }
            else:
                logger.warning("Gemini AI unavailable, using fallback logic")
                fallback_results = self.fallback.process_allocations(
                    pending_requests, available_rooms, existing_allocations
                )
                
                return {
                    'success': True,
                    **fallback_results,
                    'ai_powered': False
                }
                
        except Exception as e:
            logger.error(f"Allocation processing failed: {e}")
            return {
                'success': False,
                'error': str(e),
                'processed_requests': 0
            }
    
    def generate_notifications(self, date: str) -> Dict[str, Any]:
        """Generate notifications using Google Gemini AI"""
        try:
            logger.info("📢 Generating notifications with Google Gemini AI...")
            
            # Get recent data
            recent_allocations = self._get_recent_allocations(date)
            active_conflicts = self.db.get_conflicts()
            recent_decisions = self._get_recent_decisions()
            
            logger.info(f"Generating notifications for {len(recent_allocations)} allocations")
            
            # Use Gemini AI for notifications
            ai_notifications = self.gemini.generate_notifications(
                recent_allocations, active_conflicts, recent_decisions
            )
            
            if ai_notifications:
                logger.info("✅ Gemini AI notifications generated successfully")
                
                # Store notifications
                notification_count = self._store_notifications(ai_notifications)
                
                return {
                    'success': True,
                    'notifications_generated': notification_count,
                    'allocations_processed': len(recent_allocations),
                    'conflicts_addressed': len(active_conflicts),
                    'ai_powered': True
                }
            else:
                logger.warning("Gemini AI unavailable, using fallback logic")
                fallback_notifications = self.fallback.generate_notifications(
                    recent_allocations, active_conflicts, recent_decisions
                )
                
                notification_count = self._store_notifications(fallback_notifications)
                
                return {
                    'success': True,
                    'notifications_generated': notification_count,
                    'allocations_processed': len(recent_allocations),
                    'conflicts_addressed': len(active_conflicts),
                    'ai_powered': False
                }
                
        except Exception as e:
            logger.error(f"Notification generation failed: {e}")
            return {
                'success': False,
                'error': str(e),
                'notifications_generated': 0
            }
    
    def process_faculty_approval(self, request_id: str, faculty_id: str, approval_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process faculty approval/rejection of AI suggestions"""
        try:
            logger.info(f"Processing faculty approval for request {request_id}")
            
            # Get the AI suggestion
            suggestion_query = """
                SELECT * FROM agent_decisions 
                WHERE request_id = %s AND decision_type = 'suggest_alternative' 
                ORDER BY created_at DESC LIMIT 1
            """
            suggestions = self.db.execute_query(suggestion_query, (request_id,))
            
            if not suggestions:
                return {
                    'success': False,
                    'error': 'No AI suggestions found for this request'
                }
            
            suggestion = suggestions[0]
            action = approval_data.get('action')  # 'approve', 'reject', 'request_manual'
            selected_option = approval_data.get('selected_option')
            
            if action == 'approve' and selected_option:
                # Faculty approved a specific suggestion
                success = self._apply_approved_suggestion(request_id, faculty_id, selected_option, suggestion)
                
                if success:
                    # Update request status
                    self.db.update_request_status(request_id, 'approved')
                    
                    # Log faculty approval
                    approval_log = {
                        'decision_id': f"APPROVAL_{int(time.time() * 1000)}_{request_id}",
                        'request_id': request_id,
                        'decision_type': 'faculty_approved',
                        'reasoning': f"Faculty approved AI suggestion: {selected_option.get('type', 'unknown')}",
                        'confidence_score': 1.0,
                        'alternative_options': json.dumps(selected_option)
                    }
                    self.db.save_agent_decision(approval_log)
                    
                    return {
                        'success': True,
                        'message': 'AI suggestion approved and allocation created',
                        'allocation_created': True
                    }
                else:
                    return {
                        'success': False,
                        'error': 'Failed to create allocation from approved suggestion'
                    }
            
            elif action == 'reject':
                # Faculty rejected all suggestions
                self.db.update_request_status(request_id, 'rejected')
                
                rejection_log = {
                    'decision_id': f"REJECTION_{int(time.time() * 1000)}_{request_id}",
                    'request_id': request_id,
                    'decision_type': 'faculty_rejected',
                    'reasoning': approval_data.get('rejection_reason', 'Faculty rejected AI suggestions'),
                    'confidence_score': 1.0,
                    'alternative_options': json.dumps({'faculty_feedback': approval_data.get('feedback', '')})
                }
                self.db.save_agent_decision(rejection_log)
                
                return {
                    'success': True,
                    'message': 'Request rejected by faculty',
                    'allocation_created': False
                }
            
            elif action == 'request_manual':
                # Faculty wants manual review
                self.db.update_request_status(request_id, 'manual_review')
                
                manual_log = {
                    'decision_id': f"MANUAL_{int(time.time() * 1000)}_{request_id}",
                    'request_id': request_id,
                    'decision_type': 'manual_review_requested',
                    'reasoning': 'Faculty requested manual review of classroom allocation',
                    'confidence_score': 1.0,
                    'alternative_options': json.dumps({'faculty_notes': approval_data.get('notes', '')})
                }
                self.db.save_agent_decision(manual_log)
                
                return {
                    'success': True,
                    'message': 'Request forwarded for manual review',
                    'allocation_created': False
                }
            
            else:
                return {
                    'success': False,
                    'error': 'Invalid approval action or missing selection'
                }
                
        except Exception as e:
            logger.error(f"Faculty approval processing failed: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _apply_approved_suggestion(self, request_id: str, faculty_id: str, selected_option: Dict[str, Any], suggestion: Dict[str, Any]) -> bool:
        """Apply the faculty-approved AI suggestion"""
        try:
            # Get original request details
            request_query = """
                SELECT * FROM allocation_requests 
                WHERE request_id = %s AND faculty_id = %s
            """
            requests = self.db.execute_query(request_query, (request_id, faculty_id))
            
            if not requests:
                logger.error(f"Request {request_id} not found for faculty {faculty_id}")
                return False
            
            request = requests[0]
            suggestion_type = selected_option.get('type')
            
            # Prepare allocation data based on suggestion type
            allocation_data = {
                'allocation_id': f"ALLOC_{int(time.time() * 1000)}_{request_id}",
                'faculty_id': faculty_id,
                'course_code': request['course_code'],
                'allocated_date': request['requested_date'],
                'start_time': request['start_time'],
                'end_time': request['end_time'],
                'room_id': request.get('preferred_room_id')  # default
            }
            
            if suggestion_type == 'alternative_room':
                # Use suggested room
                allocation_data['room_id'] = selected_option.get('room_id')
                
            elif suggestion_type == 'time_adjustment':
                # Use suggested time
                allocation_data['start_time'] = selected_option.get('suggested_start_time')
                allocation_data['end_time'] = selected_option.get('suggested_end_time')
                allocation_data['room_id'] = selected_option.get('room_id', request.get('preferred_room_id'))
                
            elif suggestion_type == 'equipment_alternative':
                # Use original room but note equipment alternatives
                allocation_data['room_id'] = selected_option.get('room_id', request.get('preferred_room_id'))
                allocation_data['special_notes'] = f"Equipment alternatives: {', '.join(selected_option.get('available_alternatives', []))}"
            
            # Create the allocation
            return self.db.create_allocation(allocation_data)
            
        except Exception as e:
            logger.error(f"Failed to apply approved suggestion: {e}")
            return False

    def get_faculty_suggestions(self, faculty_id: str, request_id: str = None) -> Dict[str, Any]:
        """Get AI suggestions pending faculty approval"""
        try:
            # Build query based on parameters
            if request_id:
                query = """
                    SELECT ad.*, ar.course_code, ar.purpose, ar.requested_date, ar.start_time, ar.end_time,
                           ar.expected_strength, ar.priority
                    FROM agent_decisions ad
                    JOIN allocation_requests ar ON ad.request_id = ar.request_id
                    WHERE ad.request_id = %s AND ar.faculty_id = %s 
                    AND ad.decision_type = 'suggest_alternative'
                    ORDER BY ad.created_at DESC
                """
                params = (request_id, faculty_id)
            else:
                query = """
                    SELECT ad.*, ar.course_code, ar.purpose, ar.requested_date, ar.start_time, ar.end_time,
                           ar.expected_strength, ar.priority
                    FROM agent_decisions ad
                    JOIN allocation_requests ar ON ad.request_id = ar.request_id
                    WHERE ar.faculty_id = %s AND ad.decision_type = 'suggest_alternative'
                    AND ar.status = 'pending_approval'
                    ORDER BY ad.created_at DESC
                """
                params = (faculty_id,)
            
            suggestions = self.db.execute_query(query, params)
            
            # Parse and format suggestions
            formatted_suggestions = []
            for suggestion in suggestions:
                try:
                    alternative_options = json.loads(suggestion.get('alternative_options', '{}'))
                    suggestions_data = alternative_options.get('suggestions', [])
                    
                    formatted_suggestions.append({
                        'request_id': suggestion['request_id'],
                        'course_code': suggestion['course_code'],
                        'purpose': suggestion['purpose'],
                        'requested_date': suggestion['requested_date'],
                        'requested_time': f"{suggestion['start_time']} - {suggestion['end_time']}",
                        'expected_strength': suggestion['expected_strength'],
                        'priority': suggestion['priority'],
                        'ai_reasoning': suggestion['reasoning'],
                        'confidence_score': suggestion['confidence_score'],
                        'conflict_type': alternative_options.get('conflict_type', 'general'),
                        'approval_message': alternative_options.get('approval_message', 'AI has suggestions for your request'),
                        'suggestions': suggestions_data,
                        'created_at': suggestion['created_at']
                    })
                except json.JSONDecodeError:
                    logger.warning(f"Failed to parse suggestions for request {suggestion['request_id']}")
                    continue
            
            return {
                'success': True,
                'suggestions': formatted_suggestions,
                'total_pending': len(formatted_suggestions)
            }
            
        except Exception as e:
            logger.error(f"Failed to get faculty suggestions: {e}")
            return {
                'success': False,
                'error': str(e),
                'suggestions': []
            }
        """Get AI agent status and statistics"""
        try:
            # Get processing statistics
            stats_query = """
                SELECT 
                    (SELECT COUNT(*) FROM agent_decisions WHERE DATE(created_at) = %s) as decisions_today,
                    (SELECT COUNT(*) FROM agent_decisions WHERE decision_type = 'approve' AND DATE(created_at) = %s) as approved_today,
                    (SELECT COUNT(*) FROM agent_decisions WHERE decision_type = 'reject' AND DATE(created_at) = %s) as rejected_today,
                    (SELECT AVG(confidence_score) FROM agent_decisions WHERE DATE(created_at) = %s) as avg_confidence,
                    (SELECT COUNT(*) FROM agent_notifications WHERE DATE(created_at) = %s) as notifications_sent
            """
            
            current_date = date or datetime.now().strftime('%Y-%m-%d')
            stats = self.db.execute_query(stats_query, (current_date,) * 5)
            
            return {
                'success': True,
                'ai_enabled': bool(self.config.GEMINI_API_KEY),
                'ai_type': 'gemini_ai',
                'processing_stats': stats[0] if stats else {},
                'last_processing': datetime.now().isoformat(),
                'capabilities': [
                    'Google Gemini AI-powered analysis',
                    'Intelligent conflict resolution',
                    'Multi-criteria room allocation',
                    'Automated notification generation',
                    'Natural language reasoning',
                    'Context-aware decision making'
                ]
            }
            
        except Exception as e:
            logger.error(f"Failed to get agent status: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _store_conflict_analysis(self, analysis: Dict[str, Any], conflicts: List[Dict[str, Any]]):
        """Store conflict analysis results in database"""
        for conflict_analysis in analysis.get('conflicts', []):
            if conflict_analysis.get('conflict_id'):
                # Find corresponding conflict
                conflict = next((c for c in conflicts if c['conflict_id'] == conflict_analysis['conflict_id']), None)
                if conflict:
                    decision_data = {
                        'decision_id': f"DECISION_{int(time.time() * 1000)}_{conflict['request_id']}",
                        'request_id': conflict['request_id'],
                        'decision_type': 'conflict_analysis',
                        'reasoning': conflict_analysis.get('resolution_strategy', 'AI analysis completed'),
                        'confidence_score': (conflict_analysis.get('priority_score', 5) / 10),
                        'alternative_options': json.dumps(conflict_analysis.get('alternative_rooms', []))
                    }
                    self.db.save_agent_decision(decision_data)
    
    def _process_ai_decisions(self, decisions: Dict[str, Any], requests: List[Dict[str, Any]]) -> Dict[str, int]:
        """Process AI allocation decisions with enhanced suggestion handling"""
        results = {'processed': 0, 'approved': 0, 'rejected': 0, 'deferred': 0, 'suggestions': 0}
        
        for decision in decisions.get('decisions', []):
            request = next((r for r in requests if r['request_id'] == decision['request_id']), None)
            if not request:
                continue
            
            results['processed'] += 1
            decision_type = decision.get('decision', 'defer')
            
            if decision_type == 'approve' and decision.get('allocated_room'):
                # Direct approval - create allocation
                allocation_data = {
                    'allocation_id': f"ALLOC_{int(time.time() * 1000)}_{request['request_id']}",
                    'room_id': decision['allocated_room'],
                    'faculty_id': request['faculty_id'],
                    'course_code': request['course_code'],
                    'allocated_date': request['requested_date'],
                    'start_time': request['start_time'],
                    'end_time': request['end_time']
                }
                
                if self.db.create_allocation(allocation_data):
                    self.db.update_request_status(request['request_id'], 'approved')
                    results['approved'] += 1
            
            elif decision_type == 'suggest_alternative' or decision_type == 'require_approval':
                # Store suggestions for faculty approval
                self._store_ai_suggestions(request, decision)
                self.db.update_request_status(request['request_id'], 'pending_approval')
                results['suggestions'] += 1
            
            elif decision_type == 'reject':
                self.db.update_request_status(request['request_id'], 'rejected')
                results['rejected'] += 1
            
            else:  # defer or unknown
                results['deferred'] += 1
            
            # Store AI decision with enhanced data
            decision_data = {
                'decision_id': f"DECISION_{int(time.time() * 1000)}_{request['request_id']}",
                'request_id': request['request_id'],
                'decision_type': decision_type,
                'reasoning': decision.get('reasoning', 'AI decision made'),
                'confidence_score': decision.get('confidence_score', 0.5),
                'alternative_options': json.dumps(decision.get('suggestions', [])),
                'conflict_type': decision.get('conflict_type'),
                'faculty_approval_required': decision.get('faculty_approval_required', False)
            }
            self.db.save_agent_decision(decision_data)
        
        return results
    
    def _store_ai_suggestions(self, request: Dict[str, Any], decision: Dict[str, Any]):
        """Store AI suggestions for faculty approval"""
        suggestions_data = {
            'suggestion_id': f"SUGG_{int(time.time() * 1000)}_{request['request_id']}",
            'request_id': request['request_id'],
            'faculty_id': request['faculty_id'],
            'suggestions': json.dumps(decision.get('suggestions', [])),
            'approval_message': decision.get('approval_message', 'AI has suggestions for your classroom request'),
            'conflict_type': decision.get('conflict_type', 'general'),
            'status': 'pending',
            'confidence_score': decision.get('confidence_score', 0.5)
        }
        
        # Store in agent_decisions table with special type
        decision_data = {
            'decision_id': f"SUGGESTION_{int(time.time() * 1000)}_{request['request_id']}",
            'request_id': request['request_id'],
            'decision_type': 'suggest_alternative',
            'reasoning': decision.get('approval_message', 'AI suggestions available'),
            'confidence_score': decision.get('confidence_score', 0.5),
            'alternative_options': json.dumps(suggestions_data),
            'requires_faculty_approval': True
        }
        self.db.save_agent_decision(decision_data)
    
    def _store_notifications(self, notifications: Dict[str, Any]) -> int:
        """Store generated notifications in database"""
        count = 0
        
        for notification in notifications.get('notifications', []):
            if notification.get('recipient_id') and notification.get('recipient_type'):
                notification_data = {
                    'notification_id': f"NOT_{int(time.time() * 1000)}_{count}",
                    'recipient_id': notification['recipient_id'],
                    'recipient_type': notification['recipient_type'],
                    'notification_type': notification.get('type', 'general'),
                    'title': notification.get('title', 'Notification'),
                    'message': notification.get('message', 'No message'),
                    'priority': notification.get('priority', 'medium')
                }
                
                if self.db.save_notification(notification_data):
                    count += 1
        
        return count
    
    def _get_recent_allocations(self, date: str) -> List[Dict[str, Any]]:
        """Get recent allocations with details"""
        query = """
            SELECT ca.*, c.room_name, c.building,
                CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
                co.course_name
            FROM classroom_allocations ca
            JOIN classrooms c ON ca.room_id = c.room_id
            LEFT JOIN faculty f ON ca.faculty_id = f.faculty_id
            LEFT JOIN users u ON f.user_id = u.id
            LEFT JOIN courses co ON ca.course_code = co.course_code
            WHERE ca.allocated_date = %s AND ca.created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
            ORDER BY ca.created_at DESC
        """
        return self.db.execute_query(query, (date,))
    
    def _get_recent_decisions(self) -> List[Dict[str, Any]]:
        """Get recent AI decisions"""
        query = """
            SELECT * FROM agent_decisions 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
            ORDER BY created_at DESC
        """
        return self.db.execute_query(query)