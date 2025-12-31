// Test AI suggestions functionality
async function testAISuggestions() {
  console.log('🧪 Testing AI Suggestions System...\n');

  try {
    // Test 1: Get AI suggestions
    console.log('1. Fetching AI suggestions...');
    const suggestionsResponse = await fetch('http://localhost:3000/api/classroom-agent/suggestions?faculty_id=FAC2024001');
    const suggestionsData = await suggestionsResponse.json();
    
    console.log('✅ Suggestions Response:', JSON.stringify(suggestionsData, null, 2));
    
    if (suggestionsData.success && suggestionsData.data.suggestions.length > 0) {
      const suggestion = suggestionsData.data.suggestions[0];
      const firstOption = suggestion.suggestions[0];
      
      console.log('\n2. Testing approval of first suggestion...');
      
      // Test 2: Approve a suggestion
      const approvalResponse = await fetch('http://localhost:3000/api/classroom-agent/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: suggestion.request_id,
          faculty_id: 'FAC2024001',
          action: 'approve',
          selected_option: firstOption
        })
      });
      
      const approvalData = await approvalResponse.json();
      console.log('✅ Approval Response:', JSON.stringify(approvalData, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAISuggestions();