# Implementation Plan: Case Detail Tabs Enhancement

## Overview

This implementation plan breaks down the case detail tabs enhancement into discrete coding tasks. The feature adds a tabbed interface (Files, Case Notes, Client Chat) to case details, enables additional file uploads to existing cases with shareable links, and provides case-specific communication between clients and staff.

The implementation follows this sequence:
1. Database migration for batch_id in conversations table
2. Backend controllers and routes for case chat and file management
3. Frontend JavaScript components for tabs, file upload, and chat
4. Blade view templates for the tabbed interface
5. Property-based tests for all 32 correctness properties
6. Integration tests for end-to-end scenarios

## Tasks

- [x] 1. Database schema migration
  - [x] 1.1 Create migration to add batch_id to conversations table
    - Add nullable batch_id column with index
    - Update Conversation model with caseReports() relationship
    - Update Report model with caseConversation() relationship
    - _Requirements: 6.2, 8.5_

- [x] 2. Backend: Case Chat Controller
  - [x] 2.1 Create CaseChatController with messages endpoint
    - Implement GET /case/{batchId}/chat/messages route
    - Verify user access with canAccessCase() method
    - Return messages in JSON format with sender info
    - Support 'since' parameter for polling
    - _Requirements: 6.1, 6.3, 6.4, 8.1, 8.2, 9.1_
  
  - [x] 2.2 Implement send message endpoint in CaseChatController
    - Implement POST /case/{batchId}/chat/send route
    - Validate message content (required, max 5000 chars)
    - Create message associated with case conversation
    - Call notifyParticipants() to send notifications
    - _Requirements: 6.2, 6.5, 6.7, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 2.3 Implement access control methods in CaseChatController
    - Implement canAccessCase() for staff and case owner verification
    - Implement getOrCreateConversation() with type 'case_chat'
    - Implement notifyParticipants() using CaseActivity notification
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ]* 2.4 Write property test for message-case association
    - **Property 16: Message-Case Association**
    - **Validates: Requirements 6.2**
  
  - [ ]* 2.5 Write property test for message isolation between cases
    - **Property 20: Message Isolation Between Cases**
    - **Validates: Requirements 6.6, 8.3**
  
  - [ ]* 2.6 Write property test for case chat access control
    - **Property 25: Case Chat Access Control**
    - **Validates: Requirements 8.1, 8.2**

- [x] 3. Backend: Enhanced Report Controller methods
  - [x] 3.1 Add uploadAdditional method to User/ReportController
    - Implement POST /reports/{batchId}/upload-additional route
    - Verify case ownership
    - Validate files (max 512MB each)
    - Store files with random filenames in storage/app/public/reports
    - Create Report records with same batch_id
    - Notify staff users via CaseActivity notification
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 10.1, 10.2, 10.3, 10.4_
  
  - [x] 3.2 Add generateFileLink method to User/ReportController
    - Implement POST /reports/{reportId}/generate-link route
    - Verify user access (owner or staff)
    - Generate signed URL with batch_id and file_id
    - Return URL in JSON response
    - _Requirements: 4.1, 4.2, 4.7_
  
  - [x] 3.3 Add sharedFile method to User/ReportController
    - Implement GET /reports/shared/{batchId}/{fileId} route
    - Verify signature using verifySignature() method
    - Verify user has access to case
    - Return file download response
    - _Requirements: 4.5, 4.6_
  
  - [x] 3.4 Implement signature generation and verification helpers
    - Implement generateSignature() using HMAC-SHA256
    - Implement verifySignature() with hash_equals for timing-safe comparison
    - _Requirements: 4.5, 4.6_
  
  - [ ]* 3.5 Write property test for batch ID association
    - **Property 10: Batch ID Association**
    - **Validates: Requirements 3.4**
  
  - [ ]* 3.6 Write property test for file size validation
    - **Property 9: File Size Validation**
    - **Validates: Requirements 3.3, 3.6**
  
  - [ ]* 3.7 Write property test for file link access control
    - **Property 15: File Link Access Control**
    - **Validates: Requirements 4.5, 4.6**
  
  - [ ]* 3.8 Write property test for file upload notification creation
    - **Property 30: File Upload Notification Creation**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**

- [x] 4. Routes configuration
  - [x] 4.1 Add case chat routes to web.php
    - Add GET /case/{batchId}/chat/messages route
    - Add POST /case/{batchId}/chat/send route
    - Apply auth middleware
    - _Requirements: 6.1, 6.2_
  
  - [x] 4.2 Add file management routes to web.php
    - Add POST /reports/{batchId}/upload-additional route
    - Add POST /reports/{reportId}/generate-link route
    - Add GET /reports/shared/{batchId}/{fileId} route
    - Apply auth middleware
    - _Requirements: 3.1, 4.1, 4.5_

- [x] 5. Frontend: Tab Navigation Component
  - [x] 5.1 Create CaseDetailTabs.js component
    - Implement constructor with containerId and defaultTab parameters
    - Implement init() to bind events and show initial tab
    - Implement bindTabClicks() for tab click handlers
    - Implement switchTab() to update URL hash
    - Implement showTab() to toggle visibility and active classes
    - Implement getTabFromHash() to read URL hash
    - Implement handleHashChange() for browser back/forward
    - Start/stop chat polling based on active tab
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 11.1, 11.2, 11.4, 11.5_
  
  - [ ]* 5.2 Write property test for tab switching without reload
    - **Property 1: Tab Switching Without Reload**
    - **Validates: Requirements 1.2**
  
  - [ ]* 5.3 Write property test for active tab highlighting
    - **Property 2: Active Tab Highlighting**
    - **Validates: Requirements 1.3**
  
  - [ ]* 5.4 Write property test for tab selection persistence
    - **Property 3: Tab Selection Persistence (Round Trip)**
    - **Validates: Requirements 1.4, 11.1, 11.2**
  
  - [ ]* 5.5 Write property test for deep linking to specific tabs
    - **Property 31: Deep Linking to Specific Tabs**
    - **Validates: Requirements 11.4, 11.5**

- [x] 6. Frontend: File Upload Component
  - [x] 6.1 Create CaseFileUpload.js component
    - Implement constructor with formId and batchId parameters
    - Implement init() to bind form submit event
    - Implement handleSubmit() to send files via fetch API
    - Append batch_id to FormData
    - Handle success by reloading page
    - Implement showError() to display error messages
    - _Requirements: 3.1, 3.2, 3.5, 3.6_
  
  - [ ]* 6.2 Write property test for file list refresh after upload
    - **Property 11: File List Refresh After Upload**
    - **Validates: Requirements 3.5**

- [x] 7. Frontend: Case Chat Manager Component
  - [x] 7.1 Create CaseChatManager.js component
    - Implement constructor with batchId, messagesUrl, sendUrl parameters
    - Implement init() to bind form submit and load initial messages
    - Implement loadMessages() to fetch and render messages
    - Implement handleSend() to submit messages via fetch API
    - Implement renderMessages() to display message list
    - Implement createMessageElement() to build message HTML
    - Implement linkify() to convert URLs to clickable links
    - Implement scrollToBottom() for auto-scroll
    - _Requirements: 6.1, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5, 7.7, 9.5_
  
  - [x] 7.2 Implement polling mechanism in CaseChatManager
    - Implement startPolling() to begin 5-second interval
    - Implement stopPolling() to clear interval
    - Implement pollNewMessages() to fetch messages since lastMessageId
    - Append new messages to container without full re-render
    - Update lastMessageId after each poll
    - _Requirements: 9.1, 9.4_
  
  - [ ]* 7.3 Write property test for message chronological ordering
    - **Property 17: Message Chronological Ordering**
    - **Validates: Requirements 6.3**
  
  - [ ]* 7.4 Write property test for message metadata display
    - **Property 18: Message Metadata Display**
    - **Validates: Requirements 6.4**
  
  - [ ]* 7.5 Write property test for input field clearing after send
    - **Property 22: Input Field Clearing After Send**
    - **Validates: Requirements 7.4**
  
  - [ ]* 7.6 Write property test for message preservation on failure
    - **Property 23: Message Preservation on Failure**
    - **Validates: Requirements 7.5**
  
  - [ ]* 7.7 Write property test for URL linkification in messages
    - **Property 24: URL Linkification in Messages**
    - **Validates: Requirements 7.7**
  
  - [ ]* 7.8 Write property test for real-time message display
    - **Property 27: Real-Time Message Display**
    - **Validates: Requirements 9.1**
  
  - [ ]* 7.9 Write property test for auto-scroll to newest message
    - **Property 29: Auto-Scroll to Newest Message**
    - **Validates: Requirements 9.5**

- [x] 8. Blade view: Case detail page with tabs
  - [x] 8.1 Create or update case detail Blade template
    - Add tab navigation HTML with data-tab attributes
    - Create Files tab content section with data-tab-content="files"
    - Create Case Notes tab content section with data-tab-content="notes"
    - Create Client Chat tab content section with data-tab-content="chat"
    - Add hidden class to non-active tab contents
    - Include CSRF token meta tag
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 8.2 Implement Files tab content in Blade template
    - Display file list grouped by batch_id
    - Show filename, size, mime type, upload date for each file
    - Add download and view buttons for each file
    - Add "Copy Link" button for each file
    - Display upload form with file input
    - Show "No files available" message when empty
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 4.1_
  
  - [x] 8.3 Implement Case Notes tab content in Blade template
    - Display case title
    - Display case description with proper formatting
    - Show "No description available" when description is empty
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 8.4 Implement Client Chat tab content in Blade template
    - Add message container div with id="case-chat-messages"
    - Add message input form with id="case-chat-form"
    - Add textarea with id="case-chat-input"
    - Add send button
    - Include notification indicator element for unread messages
    - _Requirements: 6.1, 7.1, 9.2, 9.3_
  
  - [x] 8.5 Initialize JavaScript components in Blade template
    - Instantiate CaseDetailTabs with container ID
    - Instantiate CaseFileUpload with form ID and batch_id
    - Instantiate CaseChatManager with batch_id and route URLs
    - Pass Laravel routes to JavaScript using route() helper
    - _Requirements: 1.1, 3.1, 6.1_
  
  - [ ]* 8.6 Write property test for tab access control
    - **Property 4: Tab Access Control**
    - **Validates: Requirements 1.5, 5.5**
  
  - [ ]* 8.7 Write property test for file list completeness
    - **Property 5: File List Completeness**
    - **Validates: Requirements 2.1**
  
  - [ ]* 8.8 Write property test for file metadata display
    - **Property 6: File Metadata Display**
    - **Validates: Requirements 2.2, 2.3**
  
  - [ ]* 8.9 Write property test for file chronological ordering
    - **Property 7: File Chronological Ordering**
    - **Validates: Requirements 2.4**
  
  - [ ]* 8.10 Write property test for upload button presence
    - **Property 8: Upload Button Presence**
    - **Validates: Requirements 3.1**
  
  - [ ]* 8.11 Write property test for copy link action availability
    - **Property 12: Copy Link Action Availability**
    - **Validates: Requirements 4.1**

- [x] 9. CSS styling for tabbed interface
  - [x] 9.1 Add tab navigation styles
    - Style tab buttons with active state
    - Add hover effects
    - Implement horizontal scroll for mobile (<768px)
    - Add responsive breakpoints
    - _Requirements: 1.3, 12.1, 12.3_
  
  - [x] 9.2 Add file list styles
    - Style file cards with metadata
    - Add mobile-friendly card layout for small screens
    - Style action buttons (download, view, copy link)
    - _Requirements: 2.2, 12.5_
  
  - [x] 9.3 Add chat interface styles
    - Style message container with scrolling
    - Style individual messages with sender info
    - Style message input form
    - Add notification indicator badge styles
    - Optimize for mobile screens
    - _Requirements: 6.3, 6.4, 7.1, 9.2, 12.4_

- [x] 10. Checkpoint - Ensure all tests pass
  - Run database migrations
  - Test file upload functionality
  - Test case chat messaging
  - Test tab navigation and persistence
  - Ensure all tests pass, ask the user if questions arise

- [x] 10.5 Additional UI Enhancements (Post-MVP)
  - [x] 10.5.1 Add "Copy Case Link" button in Files tab
    - Button copies entire case URL to clipboard
    - Shows visual feedback on click
    - Implemented for both admin and user views
  - [x] 10.5.2 Improve Submit Response form styling
    - Enhanced labels and spacing
    - Better file upload interface
    - More descriptive response type options
    - Professional helper text
  - [x] 10.5.3 Verify patient name clickability
    - Patient names open case details in new tabs
    - Works for both single files and collections
  - [x] 10.5.4 Verify messages dropdown functionality
    - New Chat button displays all system users
    - Users can start conversations from dropdown
    - Search functionality included

- [ ] 11. Property-based tests for remaining properties
  - [ ]* 11.1 Write property test for shareable URL generation
    - **Property 13: Shareable URL Generation**
    - **Validates: Requirements 4.2, 4.7**
  
  - [ ]* 11.2 Write property test for clipboard copy operation
    - **Property 14: Clipboard Copy Operation**
    - **Validates: Requirements 4.3, 4.4**
  
  - [ ]* 11.3 Write property test for message sending permission
    - **Property 19: Message Sending Permission**
    - **Validates: Requirements 6.5**
  
  - [ ]* 11.4 Write property test for message notification creation
    - **Property 21: Message Notification Creation**
    - **Validates: Requirements 6.7**
  
  - [ ]* 11.5 Write property test for cascading delete for chat messages
    - **Property 26: Cascading Delete for Chat Messages**
    - **Validates: Requirements 8.5**
  
  - [ ]* 11.6 Write property test for unread message indicator
    - **Property 28: Unread Message Indicator**
    - **Validates: Requirements 9.2, 9.3**
  
  - [ ]* 11.7 Write property test for mobile tab functionality preservation
    - **Property 32: Mobile Tab Functionality Preservation**
    - **Validates: Requirements 12.2**

- [ ] 12. Integration tests for end-to-end scenarios
  - [ ]* 12.1 Write integration test for file upload and sharing workflow
    - Test: User uploads files → Staff receives notification → Staff views files → Staff generates shareable link → Staff sends link in chat → User clicks link and downloads file
    - _Requirements: 3.1, 3.5, 4.1, 4.2, 6.2, 6.7, 10.1_
  
  - [ ]* 12.2 Write integration test for chat notification workflow
    - Test: User sends chat message → Staff receives notification → Staff replies → User sees reply within 5 seconds → User navigates away and returns → Chat tab shows unread indicator
    - _Requirements: 6.2, 6.7, 9.1, 9.2, 9.3_
  
  - [ ]* 12.3 Write integration test for file link access control workflow
    - Test: User uploads additional files to existing case → Files appear in list → User generates link for new file → Link works for authorized users → Link fails for unauthorized users
    - _Requirements: 3.4, 3.5, 4.2, 4.5, 4.6_

- [ ] 13. Error handling implementation
  - [x] 13.1 Add error handling for file upload failures
    - Handle validation errors (file size, type)
    - Handle storage errors (disk space, permissions)
    - Handle database errors (batch_id not found)
    - Return appropriate HTTP status codes and messages
    - Display styled error notifications to users
    - _Requirements: 3.6_
  
  - [x] 13.2 Add error handling for chat message failures
    - Handle validation errors (empty message, too long)
    - Handle access control errors (unauthorized, case not found)
    - Handle network errors (polling timeout, send timeout)
    - Display user-friendly error messages
    - Preserve message content on failure
    - _Requirements: 7.5_
  
  - [x] 13.3 Add error handling for file link failures
    - Handle signature errors (invalid, missing)
    - Handle access errors (file not found, unauthorized)
    - Return appropriate HTTP status codes and messages
    - _Requirements: 4.5, 4.6_
  
  - [ ]* 13.4 Write unit tests for error handling scenarios
    - Test file size validation error messages
    - Test unauthorized access error responses
    - Test invalid signature error responses
    - Test empty message validation

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Run all property-based tests (minimum 100 iterations each)
  - Run all integration tests
  - Run all unit tests
  - Test on mobile devices and responsive breakpoints
  - Verify all 32 correctness properties pass
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Integration tests validate end-to-end workflows across multiple components
- The implementation uses Laravel 10 with Blade templates and vanilla JavaScript
- Chat polling uses 5-second intervals to balance real-time feel with server load
- File links use HMAC-SHA256 signatures for secure sharing without database lookups
- All file uploads are stored in storage/app/public/reports directory
- The batch_id field ties together multiple files and conversations for a single case
