"""
Database connection and operations for AI agents
"""
import mysql.connector
from mysql.connector import Error
import logging
from typing import List, Dict, Any, Optional
from config import Config

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.config = Config()
        self.connection = None
    
    def connect(self):
        """Establish database connection"""
        try:
            self.connection = mysql.connector.connect(
                host=self.config.DB_HOST,
                user=self.config.DB_USER,
                password=self.config.DB_PASSWORD,
                database=self.config.DB_NAME,
                autocommit=True
            )
            logger.info("Database connection established")
            return True
        except Error as e:
            logger.error(f"Database connection failed: {e}")
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            logger.info("Database connection closed")
    
    def execute_query(self, query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
        """Execute SELECT query and return results"""
        try:
            if not self.connection or not self.connection.is_connected():
                self.connect()
            
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            results = cursor.fetchall()
            cursor.close()
            return results
        except Error as e:
            logger.error(f"Query execution failed: {e}")
            return []
    
    def execute_update(self, query: str, params: Optional[tuple] = None) -> bool:
        """Execute INSERT/UPDATE/DELETE query"""
        try:
            if not self.connection or not self.connection.is_connected():
                self.connect()
            
            cursor = self.connection.cursor()
            cursor.execute(query, params or ())
            cursor.close()
            return True
        except Error as e:
            logger.error(f"Update execution failed: {e}")
            return False
    
    def get_conflicts(self, date: str = None) -> List[Dict[str, Any]]:
        """Get unresolved conflicts"""
        query = """
            SELECT * FROM allocation_conflicts 
            WHERE resolution_status = 'unresolved'
            ORDER BY severity DESC, created_at ASC
        """
        return self.execute_query(query)
    
    def get_available_rooms(self, date: str) -> List[Dict[str, Any]]:
        """Get available rooms with utilization data"""
        query = """
            SELECT c.*, 
                COALESCE(utilization.utilization_percentage, 0) as utilization_percentage,
                COALESCE(utilization.allocations_count, 0) as allocations_count
            FROM classrooms c
            LEFT JOIN (
                SELECT room_id,
                    COUNT(*) as allocations_count,
                    ROUND((SUM(TIMESTAMPDIFF(MINUTE, start_time, end_time)) / (8 * 60)) * 100, 2) as utilization_percentage
                FROM classroom_allocations 
                WHERE allocated_date = %s AND status IN ('scheduled', 'ongoing')
                GROUP BY room_id
            ) utilization ON c.room_id = utilization.room_id
            WHERE c.status = 'available'
            ORDER BY utilization_percentage ASC
        """
        return self.execute_query(query, (date,))
    
    def get_pending_requests(self, date: str) -> List[Dict[str, Any]]:
        """Get pending allocation requests"""
        query = """
            SELECT ar.*, 
                CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
                c.course_name
            FROM allocation_requests ar
            LEFT JOIN faculty f ON ar.faculty_id = f.faculty_id
            LEFT JOIN users u ON f.user_id = u.id
            LEFT JOIN courses c ON ar.course_code = c.course_code
            WHERE ar.status = 'pending' AND ar.requested_date = %s
            ORDER BY ar.priority DESC, ar.requested_at ASC
        """
        return self.execute_query(query, (date,))
    
    def get_existing_allocations(self, date: str) -> List[Dict[str, Any]]:
        """Get existing allocations for a date"""
        query = """
            SELECT * FROM classroom_allocations 
            WHERE allocated_date = %s AND status IN ('scheduled', 'ongoing')
            ORDER BY start_time ASC
        """
        return self.execute_query(query, (date,))
    
    def save_agent_decision(self, decision_data: Dict[str, Any]) -> bool:
        """Save AI agent decision to database"""
        query = """
            INSERT INTO agent_decisions (
                decision_id, request_id, decision_type, reasoning, 
                confidence_score, alternative_options, created_at
            ) VALUES (%s, %s, %s, %s, %s, %s, NOW())
        """
        params = (
            decision_data['decision_id'],
            decision_data['request_id'],
            decision_data['decision_type'],
            decision_data['reasoning'],
            decision_data['confidence_score'],
            decision_data['alternative_options']
        )
        return self.execute_update(query, params)
    
    def save_notification(self, notification_data: Dict[str, Any]) -> bool:
        """Save notification to database"""
        query = """
            INSERT INTO agent_notifications (
                notification_id, recipient_id, recipient_type, 
                notification_type, title, message, priority, created_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        """
        params = (
            notification_data['notification_id'],
            notification_data['recipient_id'],
            notification_data['recipient_type'],
            notification_data['notification_type'],
            notification_data['title'],
            notification_data['message'],
            notification_data['priority']
        )
        return self.execute_update(query, params)
    
    def create_allocation(self, allocation_data: Dict[str, Any]) -> bool:
        """Create new classroom allocation"""
        query = """
            INSERT INTO classroom_allocations (
                allocation_id, room_id, faculty_id, course_code, 
                allocated_date, start_time, end_time, status, 
                allocation_type, created_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, 'scheduled', 'ai_allocated', NOW())
        """
        params = (
            allocation_data['allocation_id'],
            allocation_data['room_id'],
            allocation_data['faculty_id'],
            allocation_data['course_code'],
            allocation_data['allocated_date'],
            allocation_data['start_time'],
            allocation_data['end_time']
        )
        return self.execute_update(query, params)
    
    def update_request_status(self, request_id: str, status: str) -> bool:
        """Update allocation request status"""
        query = """
            UPDATE allocation_requests 
            SET status = %s, processed_at = NOW() 
            WHERE request_id = %s
        """
        return self.execute_update(query, (status, request_id))