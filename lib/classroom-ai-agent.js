/**
 * AI-powered classroom allocation agent using Google Gemini
 * Provides intelligent conflict resolution and allocation decisions
 */
export class ClassroomAIAgent {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }
  
  /**
   * Call Google Gemini API for AI processing
   */
  async callGeminiAPI(prompt) {
    try {
      if (!this.apiKey) {
        console.warn('Gemini API key not found, falling back to rule-based logic');
        return null;
      }

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        console.error('Gemini API error:', response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      }
      
      return null;
    } catch (error) {
      console.error('Gemini API call failed:', error);
      return null;
    }
  }

  /**
   * Analyze allocation conflicts using Google Gemini AI
   */
  async analyzeConflicts(conflicts, availableRooms, requests) {
    try {
      console.log('🔍 Analyzing conflicts with Google Gemini AI...');
      
      // Prepare data for AI analysis
      const conflictData = conflicts.map(c => ({
        id: c.conflict_id,
        type: c.conflict_type,
        description: c.description,
        severity: c.severity,
        date: c.requested_date,
        time: `${c.start_time} - ${c.end_time}`
      }));

      const roomData = availableRooms.map(r => ({
        id: r.room_id,
        name: r.room_name,
        capacity: r.capacity,
        type: r.room_type,
        building: r.building,
        equipment: r.equipment,
        utilization: r.utilization_percentage || 0
      }));

      const prompt = `
You are an expert classroom allocation system. Analyze the following conflicts and provide intelligent resolutions.

CONFLICTS TO ANALYZE:
${JSON.stringify(conflictData, null, 2)}

AVAILABLE ROOMS:
${JSON.stringify(roomData, null, 2)}

Please provide a JSON response with the following structure:
{
  "analysis": "Overall analysis summary",
  "conflicts": [
    {
      "conflict_id": "conflict_id",
      "root_cause": "identified root cause",
      "resolution_strategy": "recommended strategy",
      "recommended_room": "best room ID or null",
      "alternative_rooms": ["room1", "room2", "room3"],
      "priority_score": 1-10,
      "risk_level": "low/medium/high",
      "estimated_resolution_time": "time estimate"
    }
  ],
  "recommendations": ["overall recommendation 1", "overall recommendation 2"]
}

Focus on:
1. Identifying root causes of conflicts
2. Suggesting optimal room assignments
3. Providing alternative options
4. Prioritizing based on urgency and impact
5. Estimating resolution complexity
`;

      const aiResponse = await this.callGeminiAPI(prompt);
      
      if (aiResponse) {
        try {
          // Try to parse JSON response
          const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
          const analysis = JSON.parse(cleanResponse);
          return analysis;
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          // Fall back to rule-based analysis
          return this.fallbackConflictResolution(conflicts, availableRooms);
        }
      } else {
        // Fall back to rule-based analysis
        return this.fallbackConflictResolution(conflicts, availableRooms);
      }
    } catch (error) {
      console.error('AI conflict analysis failed:', error);
      return this.fallbackConflictResolution(conflicts, availableRooms);
    }
  }

  /**
   * Make intelligent allocation decisions using Google Gemini AI
   */
  async makeAllocationDecisions(pendingRequests, availableRooms, existingAllocations) {
    try {
      console.log('🤖 Making allocation decisions with Google Gemini AI...');
      
      // Prepare data for AI analysis
      const requestData = pendingRequests.map(r => ({
        id: r.request_id,
        faculty: r.faculty_name,
        course: r.course_name || r.course_code,
        date: r.requested_date,
        time: `${r.start_time} - ${r.end_time}`,
        capacity_needed: r.expected_strength,
        purpose: r.purpose,
        priority: r.priority,
        equipment_needed: r.required_equipment
      }));

      const roomData = availableRooms.map(r => ({
        id: r.room_id,
        name: r.room_name,
        capacity: r.capacity,
        type: r.room_type,
        building: r.building,
        equipment: r.equipment,
        utilization: r.utilization_percentage || 0
      }));

      const allocationData = existingAllocations.map(a => ({
        room_id: a.room_id,
        date: a.allocated_date,
        time: `${a.start_time} - ${a.end_time}`,
        course: a.course_code
      }));

      const prompt = `
You are an expert classroom allocation system. Analyze the following requests and make optimal allocation decisions.

PENDING REQUESTS:
${JSON.stringify(requestData, null, 2)}

AVAILABLE ROOMS:
${JSON.stringify(roomData, null, 2)}

EXISTING ALLOCATIONS:
${JSON.stringify(allocationData, null, 2)}

Please provide a JSON response with the following structure:
{
  "decisions": [
    {
      "request_id": "request_id",
      "decision": "approve/reject/defer",
      "allocated_room": "room_id or null",
      "confidence_score": 0.0-1.0,
      "reasoning": "detailed explanation",
      "alternative_options": ["room1", "room2"],
      "conditions": ["condition1", "condition2"]
    }
  ],
  "optimization_notes": "Overall optimization strategy applied",
  "utilization_impact": "Impact on room utilization"
}

Decision criteria:
1. Room capacity must accommodate expected strength (with 10% buffer)
2. No time conflicts with existing allocations
3. Equipment requirements must be met
4. Optimize room utilization across the campus
5. Prioritize high-priority requests
6. Consider building proximity for related courses
7. Balance workload across rooms

For each decision:
- "approve": Room allocated successfully
- "reject": No suitable room available
- "defer": Suitable room exists but conflicts need resolution
`;

      const aiResponse = await this.callGeminiAPI(prompt);
      
      if (aiResponse) {
        try {
          const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
          const decisions = JSON.parse(cleanResponse);
          return decisions;
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          return this.fallbackAllocation(pendingRequests, availableRooms);
        }
      } else {
        return this.fallbackAllocation(pendingRequests, availableRooms);
      }
    } catch (error) {
      console.error('AI allocation decision failed:', error);
      return this.fallbackAllocation(pendingRequests, availableRooms);
    }
  }

  /**
   * Generate intelligent notifications using Google Gemini AI
   */
  async generateNotifications(allocations, conflicts, decisions) {
    try {
      console.log('📢 Generating intelligent notifications with Google Gemini AI...');
      
      const allocationData = allocations.map(a => ({
        faculty: a.faculty_name,
        course: a.course_name || a.course_code,
        room: a.room_name,
        building: a.building,
        date: a.allocated_date,
        time: `${a.start_time} - ${a.end_time}`
      }));

      const conflictData = conflicts.map(c => ({
        type: c.conflict_type,
        description: c.description,
        severity: c.severity,
        faculty: c.faculty_name
      }));

      const decisionData = decisions.map(d => ({
        type: d.decision_type,
        reasoning: d.reasoning,
        confidence: d.confidence_score
      }));

      const prompt = `
You are an expert communication system for a classroom allocation platform. Generate appropriate notifications based on the following data.

RECENT ALLOCATIONS:
${JSON.stringify(allocationData, null, 2)}

ACTIVE CONFLICTS:
${JSON.stringify(conflictData, null, 2)}

RECENT DECISIONS:
${JSON.stringify(decisionData, null, 2)}

Please provide a JSON response with the following structure:
{
  "notifications": [
    {
      "recipient_type": "faculty/student/admin",
      "recipient_id": "specific_id or 'all'",
      "type": "allocation_approved/allocation_rejected/conflict_alert/room_changed",
      "title": "Clear, concise title",
      "message": "Detailed, professional message",
      "priority": "low/medium/high",
      "action_required": true/false
    }
  ]
}

Guidelines:
1. Faculty notifications: Professional, include all relevant details (room, time, building)
2. Student notifications: Clear, friendly, focus on what they need to know
3. Admin notifications: Technical details, actionable information
4. Conflict alerts: Urgent tone, clear next steps
5. Use appropriate priority levels based on urgency
6. Include specific room names, times, and dates
7. Be concise but informative
`;

      const aiResponse = await this.callGeminiAPI(prompt);
      
      if (aiResponse) {
        try {
          const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
          const notifications = JSON.parse(cleanResponse);
          return notifications;
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          return this.fallbackNotifications(allocations, conflicts);
        }
      } else {
        return this.fallbackNotifications(allocations, conflicts);
      }
    } catch (error) {
      console.error('AI notification generation failed:', error);
      return this.fallbackNotifications(allocations, conflicts);
    }
  }

  /**
   * Analyze individual conflict using rule-based logic
   */
  analyzeIndividualConflict(conflict, availableRooms, requests) {
    const conflictAnalysis = {
      conflict_id: conflict.conflict_id,
      root_cause: this.identifyRootCause(conflict),
      resolution_strategy: this.determineResolutionStrategy(conflict, availableRooms),
      recommended_room: this.findBestAlternativeRoom(conflict, availableRooms),
      alternative_rooms: this.findAlternativeRooms(conflict, availableRooms, 3),
      priority_score: this.calculatePriorityScore(conflict),
      risk_level: this.assessRiskLevel(conflict),
      estimated_resolution_time: this.estimateResolutionTime(conflict)
    };

    return conflictAnalysis;
  }

  /**
   * Prioritize requests based on multiple factors
   */
  prioritizeRequests(requests) {
    return requests.sort((a, b) => {
      // Priority order: high > medium > low
      const priorityWeight = { 'high': 3, 'medium': 2, 'low': 1 };
      const aPriority = priorityWeight[a.priority] || 1;
      const bPriority = priorityWeight[b.priority] || 1;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority; // Higher priority first
      }
      
      // If same priority, sort by request date (earlier first)
      return new Date(a.created_at || a.request_date) - new Date(b.created_at || b.request_date);
    });
  }

  /**
   * Make individual allocation decision using intelligent rules
   */
  makeIndividualDecision(request, availableRooms, existingAllocations) {
    const decision = {
      request_id: request.request_id,
      decision: "defer",
      allocated_room: null,
      confidence_score: 0.5,
      reasoning: "Analyzing request...",
      alternative_options: [],
      conditions: []
    };

    // Find suitable rooms based on requirements
    const suitableRooms = this.findSuitableRooms(request, availableRooms);
    
    if (suitableRooms.length === 0) {
      decision.decision = "reject";
      decision.reasoning = "No suitable rooms available that meet the requirements";
      decision.confidence_score = 0.9;
      decision.alternative_options = this.findPartialMatches(request, availableRooms);
      return decision;
    }

    // Check for time conflicts
    const conflictFreeRooms = this.filterConflictFreeRooms(suitableRooms, request, existingAllocations);
    
    if (conflictFreeRooms.length === 0) {
      decision.decision = "defer";
      decision.reasoning = "Suitable rooms found but time conflicts exist";
      decision.confidence_score = 0.6;
      decision.alternative_options = suitableRooms.slice(0, 3).map(r => r.room_id);
      decision.conditions = ["Resolve time conflicts", "Consider alternative time slots"];
      return decision;
    }

    // Select best room using scoring algorithm
    const bestRoom = this.selectBestRoom(conflictFreeRooms, request);
    
    decision.decision = "approve";
    decision.allocated_room = bestRoom.room_id;
    decision.confidence_score = this.calculateConfidenceScore(bestRoom, request);
    decision.reasoning = `Optimal room match found: ${bestRoom.room_name} (${bestRoom.building})`;
    decision.alternative_options = conflictFreeRooms.slice(1, 4).map(r => r.room_id);
    
    return decision;
  }

  /**
   * Find suitable rooms based on request requirements
   */
  findSuitableRooms(request, availableRooms) {
    return availableRooms.filter(room => {
      // Check capacity (with 10% buffer)
      const requiredCapacity = request.expected_strength * 1.1;
      if (room.capacity < requiredCapacity) return false;

      // Check room type compatibility
      if (request.purpose && request.purpose.toLowerCase().includes('lab')) {
        if (room.room_type !== 'lab') return false;
      }

      // Check equipment requirements
      if (request.required_equipment) {
        const requiredEquipment = typeof request.required_equipment === 'string' 
          ? JSON.parse(request.required_equipment) 
          : request.required_equipment;
        
        const roomEquipment = typeof room.equipment === 'string' 
          ? JSON.parse(room.equipment) 
          : room.equipment;

        for (const [equipment, required] of Object.entries(requiredEquipment)) {
          if (required && !roomEquipment[equipment]) {
            return false;
          }
        }
      }

      return true;
    });
  }

  /**
   * Filter rooms that don't have time conflicts
   */
  filterConflictFreeRooms(rooms, request, existingAllocations) {
    return rooms.filter(room => {
      const requestStart = new Date(`${request.requested_date} ${request.start_time}`);
      const requestEnd = new Date(`${request.requested_date} ${request.end_time}`);

      // Check for conflicts with existing allocations
      const hasConflict = existingAllocations.some(allocation => {
        if (allocation.room_id !== room.room_id) return false;
        if (allocation.allocated_date !== request.requested_date) return false;

        const allocStart = new Date(`${allocation.allocated_date} ${allocation.start_time}`);
        const allocEnd = new Date(`${allocation.allocated_date} ${allocation.end_time}`);

        // Check for time overlap
        return (requestStart < allocEnd && requestEnd > allocStart);
      });

      return !hasConflict;
    });
  }

  /**
   * Select the best room using multi-criteria scoring
   */
  selectBestRoom(rooms, request) {
    let bestRoom = rooms[0];
    let bestScore = 0;

    for (const room of rooms) {
      let score = 0;

      // Capacity efficiency (prefer rooms closer to required capacity)
      const capacityRatio = request.expected_strength / room.capacity;
      score += (capacityRatio > 0.7 && capacityRatio < 0.9) ? 30 : 
               (capacityRatio > 0.5 && capacityRatio < 1.0) ? 20 : 10;

      // Room utilization (prefer less utilized rooms)
      const utilization = room.utilization_percentage || 0;
      score += utilization < 50 ? 25 : utilization < 70 ? 15 : 5;

      // Equipment match bonus
      if (request.required_equipment) {
        const requiredEquipment = typeof request.required_equipment === 'string' 
          ? JSON.parse(request.required_equipment) 
          : request.required_equipment;
        
        const roomEquipment = typeof room.equipment === 'string' 
          ? JSON.parse(room.equipment) 
          : room.equipment;

        const equipmentMatches = Object.keys(requiredEquipment).filter(eq => roomEquipment[eq]).length;
        score += equipmentMatches * 10;
      }

      // Room type preference
      if (request.purpose && request.purpose.toLowerCase().includes('lab') && room.room_type === 'lab') {
        score += 20;
      }

      // Building preference (same building as course department)
      if (room.building && request.course_code && request.course_code.startsWith('CS') && 
          room.building.toLowerCase().includes('it')) {
        score += 15;
      }

      if (score > bestScore) {
        bestScore = score;
        bestRoom = room;
      }
    }

    return bestRoom;
  }

  /**
   * Calculate confidence score for allocation decision
   */
  calculateConfidenceScore(room, request) {
    let confidence = 0.5; // Base confidence

    // Capacity match
    const capacityRatio = request.expected_strength / room.capacity;
    if (capacityRatio > 0.7 && capacityRatio < 0.9) confidence += 0.3;
    else if (capacityRatio > 0.5 && capacityRatio < 1.0) confidence += 0.2;

    // Equipment match
    if (request.required_equipment) {
      const requiredEquipment = typeof request.required_equipment === 'string' 
        ? JSON.parse(request.required_equipment) 
        : request.required_equipment;
      
      const roomEquipment = typeof room.equipment === 'string' 
        ? JSON.parse(room.equipment) 
        : room.equipment;

      const totalRequired = Object.keys(requiredEquipment).length;
      const matched = Object.keys(requiredEquipment).filter(eq => roomEquipment[eq]).length;
      
      if (totalRequired > 0) {
        confidence += (matched / totalRequired) * 0.2;
      }
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Helper methods for conflict analysis
   */
  identifyRootCause(conflict) {
    if (conflict.conflict_type === 'time_overlap') {
      return "Multiple requests for the same time slot";
    } else if (conflict.conflict_type === 'room_capacity') {
      return "Room capacity insufficient for requested group size";
    } else if (conflict.conflict_type === 'equipment_unavailable') {
      return "Required equipment not available in requested room";
    }
    return "General scheduling conflict detected";
  }

  determineResolutionStrategy(conflict, availableRooms) {
    const strategies = [
      "Reassign to alternative room with similar capacity",
      "Adjust time slot to avoid conflicts",
      "Split large groups into multiple sessions",
      "Upgrade to larger room if available",
      "Provide alternative equipment setup"
    ];
    
    return strategies[Math.floor(Math.random() * strategies.length)];
  }

  findBestAlternativeRoom(conflict, availableRooms) {
    const suitableRooms = availableRooms.filter(room => room.status === 'available');
    return suitableRooms.length > 0 ? suitableRooms[0].room_id : "Manual assignment required";
  }

  findAlternativeRooms(conflict, availableRooms, count) {
    return availableRooms
      .filter(room => room.status === 'available')
      .slice(0, count)
      .map(room => room.room_id);
  }

  calculatePriorityScore(conflict) {
    const priorityScores = { 'high': 9, 'medium': 6, 'low': 3 };
    return priorityScores[conflict.priority] || 5;
  }

  assessRiskLevel(conflict) {
    if (conflict.priority === 'high') return 'high';
    if (conflict.conflict_type === 'time_overlap') return 'medium';
    return 'low';
  }

  estimateResolutionTime(conflict) {
    const timeEstimates = {
      'time_overlap': '10-15 minutes',
      'room_capacity': '15-20 minutes',
      'equipment_unavailable': '20-30 minutes'
    };
    return timeEstimates[conflict.conflict_type] || '15 minutes';
  }

  generateConflictRecommendations(conflicts, availableRooms) {
    const recommendations = [
      "Review high-priority conflicts first",
      "Consider alternative time slots for flexible requests",
      "Optimize room utilization by balancing allocations"
    ];

    if (conflicts.length > 5) {
      recommendations.push("High conflict volume detected - consider batch processing");
    }

    if (availableRooms.length < conflicts.length) {
      recommendations.push("Limited room availability - prioritize essential requests");
    }

    return recommendations;
  }

  calculateUtilizationImpact(decisions, availableRooms) {
    const approvedCount = decisions.filter(d => d.decision === 'approve').length;
    const totalRooms = availableRooms.length;
    
    if (totalRooms === 0) return "No rooms available";
    
    const utilizationRate = (approvedCount / totalRooms) * 100;
    
    if (utilizationRate > 80) return "High utilization - excellent room usage";
    if (utilizationRate > 60) return "Good utilization - balanced allocation";
    if (utilizationRate > 40) return "Moderate utilization - room for optimization";
    return "Low utilization - many rooms available";
  }

  updateRoomAvailability(availableRooms, roomId, request) {
    const room = availableRooms.find(r => r.room_id === roomId);
    if (room) {
      room.allocations_count = (room.allocations_count || 0) + 1;
      room.utilization_percentage = Math.min((room.utilization_percentage || 0) + 10, 100);
    }
  }

  findPartialMatches(request, availableRooms) {
    return availableRooms
      .filter(room => room.capacity >= request.expected_strength * 0.8) // 80% capacity match
      .slice(0, 3)
      .map(room => room.room_id);
  }

  /**
   * Fallback conflict resolution without external AI
   */
  fallbackConflictResolution(conflicts, availableRooms) {
    return {
      analysis: "Using rule-based conflict resolution",
      conflicts: conflicts.map(conflict => ({
        conflict_id: conflict.conflict_id,
        root_cause: this.identifyRootCause(conflict),
        resolution_strategy: this.determineResolutionStrategy(conflict, availableRooms),
        recommended_room: availableRooms[0]?.room_id || "Manual assignment needed",
        alternative_rooms: availableRooms.slice(1, 3).map(r => r.room_id),
        priority_score: this.calculatePriorityScore(conflict),
        risk_level: this.assessRiskLevel(conflict),
        estimated_resolution_time: this.estimateResolutionTime(conflict)
      })),
      recommendations: this.generateConflictRecommendations(conflicts, availableRooms)
    };
  }

  /**
   * Fallback allocation without external AI
   */
  fallbackAllocation(pendingRequests, availableRooms) {
    const decisions = [];
    
    for (const req of pendingRequests) {
      const suitableRoom = availableRooms.find(room => 
        room.capacity >= req.expected_strength && 
        room.status === 'available'
      );
      
      decisions.push({
        request_id: req.request_id,
        decision: suitableRoom ? "approve" : "defer",
        allocated_room: suitableRoom?.room_id || null,
        confidence_score: suitableRoom ? 0.8 : 0.3,
        reasoning: suitableRoom ? 
          `Room capacity and availability match: ${suitableRoom.room_name}` : 
          "No suitable room available with required capacity",
        alternative_options: availableRooms.slice(0, 2).map(r => r.room_id),
        conditions: suitableRoom ? [] : ["Increase room capacity", "Consider alternative time slots"]
      });
    }

    return {
      decisions,
      optimization_notes: "Rule-based allocation with capacity matching applied",
      utilization_impact: this.calculateUtilizationImpact(decisions, availableRooms)
    };
  }

  /**
   * Fallback notifications without external AI
   */
  fallbackNotifications(allocations, conflicts) {
    const notifications = [];

    // Notifications for allocations
    allocations.forEach(alloc => {
      notifications.push({
        recipient_type: "faculty",
        recipient_id: alloc.faculty_id,
        type: "allocation_approved",
        title: "Classroom Allocated",
        message: `Your request for ${alloc.course_code} has been allocated to ${alloc.room_name || alloc.room_id}`,
        priority: "medium",
        action_required: false
      });
    });

    // Notifications for conflicts
    conflicts.forEach(conflict => {
      notifications.push({
        recipient_type: "admin",
        recipient_id: "admin",
        type: "conflict_alert",
        title: "Allocation Conflict Detected",
        message: `${conflict.conflict_type}: ${conflict.description}`,
        priority: conflict.priority,
        action_required: true
      });
    });

    return { notifications };
  }
}

export default ClassroomAIAgent;