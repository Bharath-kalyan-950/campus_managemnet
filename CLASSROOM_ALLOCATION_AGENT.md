# 🤖 Classroom Allocation Agent

## Overview

The Classroom Allocation Agent is an AI-powered system that automates classroom allocation and management for the Smart Campus Management System. It intelligently processes allocation requests, detects conflicts, suggests alternatives, and maintains optimal room utilization.

## 🎯 Key Features

### For Administrators
- **Real-time Dashboard**: Monitor all allocation activities, conflicts, and agent decisions
- **Automated Processing**: AI agent handles 80%+ of requests automatically
- **Conflict Resolution**: Intelligent detection and resolution of scheduling conflicts
- **Room Utilization Analytics**: Track and optimize classroom usage
- **Manual Override**: Admin can override agent decisions when needed
- **Maintenance Scheduling**: Coordinate room maintenance with allocations

### For Faculty
- **Easy Request System**: Simple form-based classroom requests
- **AI-Powered Suggestions**: Get intelligent room and time recommendations
- **Real-time Status**: Track request status with detailed reasoning
- **Equipment Matching**: Specify required equipment and get suitable rooms
- **Priority Handling**: Urgent requests get faster processing

### For Students
- **Live Schedule**: Real-time classroom schedule with locations
- **Change Notifications**: Instant alerts for room changes or updates
- **Campus Navigation**: Integration with room locations and directions
- **Weekly View**: Comprehensive weekly schedule overview

## 🏗️ System Architecture

### Database Tables

1. **classrooms** - Room inventory with capacity and equipment
2. **allocation_requests** - Faculty requests for classroom allocation
3. **classroom_allocations** - Approved and scheduled allocations
4. **agent_decisions** - AI agent decision logs with reasoning
5. **allocation_conflicts** - Detected conflicts and resolutions
6. **agent_notifications** - System notifications for all users
7. **maintenance_schedule** - Room maintenance scheduling

### AI Agent Logic

The agent processes requests through multiple stages:

1. **Conflict Detection**
   - Room availability conflicts
   - Faculty schedule conflicts
   - Maintenance schedule conflicts

2. **Room Matching**
   - Capacity requirements
   - Equipment availability
   - Room type suitability

3. **Decision Making**
   - Auto-approve (high confidence, no conflicts)
   - Suggest alternatives (conflicts detected, alternatives available)
   - Manual review (complex conflicts or no suitable options)
   - Conflict detected (no viable solutions)

4. **Notification System**
   - Real-time notifications to all stakeholders
   - Different notification types for different scenarios

## 📊 Agent Performance Metrics

- **Auto-approval Rate**: Percentage of requests automatically approved
- **Conflict Detection**: Number of conflicts identified and resolved
- **Response Time**: Average time from request to decision
- **Utilization Optimization**: Room usage efficiency improvements
- **User Satisfaction**: Faculty and student feedback scores

## 🚀 Getting Started

### 1. Setup Database

```bash
node scripts/setup-classroom-agent.js
```

This will:
- Create all necessary database tables
- Insert sample classroom data
- Add test requests and allocations
- Set up initial notifications

### 2. Access Interfaces

#### Admin Dashboard
- **URL**: `/dashboard/admin/classroom-agent`
- **Features**: 
  - Overview of all agent activities
  - Pending requests requiring manual review
  - Conflict resolution interface
  - Room utilization analytics
  - Agent performance metrics

#### Faculty Interface
- **URL**: `/dashboard/faculty/classroom-request`
- **Features**:
  - Submit new allocation requests
  - Track request status and agent decisions
  - View suggested alternatives
  - Browse available rooms and equipment

#### Student Interface
- **URL**: `/dashboard/student/classroom-schedule`
- **Features**:
  - View daily and weekly schedules
  - Receive room change notifications
  - Access campus navigation
  - Track class locations

## 🔧 API Endpoints

### Requests Management
```
GET    /api/classroom-agent/requests      # Fetch allocation requests
POST   /api/classroom-agent/requests      # Create new request
```

### Allocations Management
```
GET    /api/classroom-agent/allocations   # Fetch allocations
POST   /api/classroom-agent/allocations   # Create manual allocation
PUT    /api/classroom-agent/allocations   # Update allocation
DELETE /api/classroom-agent/allocations   # Cancel allocation
```

### Room Management
```
GET    /api/classroom-agent/rooms         # Fetch rooms with availability
POST   /api/classroom-agent/rooms         # Add new room
PUT    /api/classroom-agent/rooms         # Update room details
```

### Dashboard & Analytics
```
GET    /api/classroom-agent/dashboard     # Fetch dashboard data
POST   /api/classroom-agent/dashboard     # Process admin actions
```

### Notifications
```
GET    /api/classroom-agent/notifications # Fetch notifications
POST   /api/classroom-agent/notifications # Create notification
PUT    /api/classroom-agent/notifications # Mark as read
```

## 🤖 Agent Decision Types

### 1. Auto Approve
- **Trigger**: No conflicts, suitable room available
- **Confidence**: 90-100%
- **Action**: Automatically create allocation and notify faculty

### 2. Suggest Alternative
- **Trigger**: Conflicts detected but alternatives exist
- **Confidence**: 60-89%
- **Action**: Suggest different room or time, await admin/faculty decision

### 3. Conflict Detected
- **Trigger**: Conflicts with no suitable alternatives
- **Confidence**: 20-59%
- **Action**: Flag for manual review, provide conflict details

### 4. Manual Review
- **Trigger**: Complex scenarios, low confidence
- **Confidence**: 0-19%
- **Action**: Require admin intervention

## 📋 Sample Workflows

### Faculty Request Workflow
1. Faculty submits classroom request via web interface
2. Agent immediately analyzes request for conflicts
3. Agent checks available rooms matching requirements
4. Agent makes decision based on analysis
5. If auto-approved: allocation created, notifications sent
6. If conflicts: admin notified for manual review
7. Faculty receives status update with reasoning

### Admin Oversight Workflow
1. Admin views dashboard with pending requests
2. Reviews agent decisions and reasoning
3. For manual review items: approves, rejects, or modifies
4. Resolves conflicts by reassigning or finding alternatives
5. Monitors room utilization and agent performance
6. Adjusts agent parameters if needed

### Student Information Workflow
1. Student accesses schedule interface
2. Views real-time classroom assignments
3. Receives notifications for any changes
4. Can access room details and navigation
5. Provides feedback on room assignments

## 🔧 Configuration Options

### Agent Sensitivity Settings
- **Auto-approval threshold**: Confidence level for automatic approval
- **Conflict detection sensitivity**: How strict conflict checking should be
- **Alternative suggestion count**: Number of alternatives to suggest
- **Notification preferences**: Which events trigger notifications

### Room Matching Criteria
- **Capacity buffer**: Percentage over/under required capacity
- **Equipment matching**: Strict vs. flexible equipment requirements
- **Building preferences**: Prioritize certain buildings or floors
- **Room type preferences**: Prefer certain room types for specific courses

## 📈 Analytics & Reporting

### Utilization Metrics
- Room occupancy rates by time of day
- Peak usage periods identification
- Underutilized room identification
- Equipment usage statistics

### Agent Performance
- Decision accuracy over time
- Conflict resolution success rate
- User satisfaction scores
- Processing time improvements

### Operational Insights
- Most requested time slots
- Popular room features
- Frequent conflict patterns
- Maintenance impact on scheduling

## 🔒 Security & Permissions

### Role-Based Access
- **Admin**: Full access to all features and overrides
- **Faculty**: Can create requests and view own allocations
- **Student**: Read-only access to their schedule and notifications

### Data Protection
- All requests logged with timestamps
- Agent decisions include full reasoning
- Audit trail for all manual overrides
- Secure API endpoints with authentication

## 🚀 Future Enhancements

### Planned Features
- **Predictive Analytics**: Forecast room demand patterns
- **Mobile App**: Native mobile interface for all users
- **Integration**: Connect with calendar systems and LMS
- **Smart Suggestions**: Learn from usage patterns for better recommendations
- **Resource Optimization**: Automatic load balancing across buildings

### AI Improvements
- **Machine Learning**: Improve decision accuracy over time
- **Natural Language**: Process requests in natural language
- **Preference Learning**: Adapt to individual faculty preferences
- **Seasonal Patterns**: Account for semester and exam patterns

## 📞 Support & Troubleshooting

### Common Issues
1. **Agent not processing requests**: Check database connection and API endpoints
2. **Notifications not sending**: Verify notification service configuration
3. **Conflicts not detected**: Review conflict detection logic and thresholds
4. **Poor room suggestions**: Adjust matching criteria and equipment requirements

### Monitoring
- Check agent decision logs for unusual patterns
- Monitor API response times and error rates
- Review user feedback and satisfaction scores
- Track room utilization trends

### Maintenance
- Regular database cleanup of old requests and logs
- Update room information and equipment status
- Review and adjust agent parameters based on performance
- Backup decision logs and analytics data

---

## 🎉 Success Metrics

The Classroom Allocation Agent aims to achieve:
- **90%+ Auto-approval Rate**: Most requests processed without manual intervention
- **<5 minute Response Time**: Fast processing of all requests
- **95%+ Room Utilization**: Optimal use of available classroom space
- **Zero Double-bookings**: Complete elimination of scheduling conflicts
- **High User Satisfaction**: Positive feedback from faculty and students

This intelligent system transforms classroom management from a manual, error-prone process into an automated, efficient, and user-friendly experience for everyone in the campus community.