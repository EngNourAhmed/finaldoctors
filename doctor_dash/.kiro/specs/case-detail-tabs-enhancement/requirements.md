# Requirements Document

## Introduction

This document specifies requirements for enhancing the case management system with a tabbed interface for case details. The enhancement introduces three distinct tabs (Files, Case Notes, and Client Chat) to organize case information, enable additional file uploads to existing cases with shareable links, and provide case-specific communication between clients and staff.

## Glossary

- **Case_Detail_System**: The enhanced case viewing interface that displays case information in a tabbed layout
- **File_Tab**: The tab interface displaying all files associated with a case
- **Case_Notes_Tab**: The tab interface displaying case title and description
- **Client_Chat_Tab**: The tab interface displaying case-specific messages between client and staff
- **File_Manager**: The component responsible for uploading, storing, and managing case files
- **Link_Generator**: The component that creates shareable URLs for individual case files
- **Chat_System**: The messaging component that handles case-specific communication
- **Staff_User**: A user with role admin, assistant, or admin_assistant
- **Client_User**: A user with role user (doctor/client)
- **Case**: A report or group of reports identified by batch_id
- **File_Link**: A shareable URL that provides access to a specific case file

## Requirements

### Requirement 1: Tabbed Case Detail Interface

**User Story:** As a user, I want to view case details in a tabbed interface, so that I can easily navigate between files, notes, and chat without leaving the case view

#### Acceptance Criteria

1. WHEN a user opens a case, THE Case_Detail_System SHALL display three tabs: Files, Case Notes, and Client Chat
2. WHEN a user clicks on a tab, THE Case_Detail_System SHALL display the corresponding content without page reload
3. THE Case_Detail_System SHALL highlight the currently active tab
4. THE Case_Detail_System SHALL preserve the selected tab when the user refreshes the page
5. THE Case_Detail_System SHALL be accessible to both Staff_User and Client_User roles

### Requirement 2: File Tab Display and Management

**User Story:** As a user, I want to view and manage all files in a case, so that I can access case documentation efficiently

#### Acceptance Criteria

1. WHEN the Files tab is active, THE File_Tab SHALL display all files associated with the Case grouped by batch_id
2. FOR EACH file displayed, THE File_Tab SHALL show the original filename, file size, upload date, and mime type
3. WHEN a user clicks on a file, THE File_Tab SHALL provide options to download or view the file
4. THE File_Tab SHALL display files in chronological order with newest files first
5. WHEN a Case has no files, THE File_Tab SHALL display a message indicating no files are available

### Requirement 3: Additional File Upload to Existing Cases

**User Story:** As a user, I want to upload additional files to an existing case, so that I can add supplementary documentation as the case progresses

#### Acceptance Criteria

1. WHEN viewing the Files tab, THE File_Manager SHALL display an upload button for both Staff_User and Client_User
2. WHEN a user clicks the upload button, THE File_Manager SHALL present a file selection interface
3. WHEN a user selects files for upload, THE File_Manager SHALL validate file size does not exceed 512000 KB
4. WHEN files are uploaded, THE File_Manager SHALL associate them with the existing Case using the same batch_id
5. WHEN files are successfully uploaded, THE File_Manager SHALL refresh the file list to display the new files
6. WHEN file upload fails, THE File_Manager SHALL display an error message with the reason for failure

### Requirement 4: Shareable File Links

**User Story:** As a user, I want to generate shareable links for case files, so that I can reference specific files in chat or external communication

#### Acceptance Criteria

1. FOR EACH file in the Files tab, THE Link_Generator SHALL provide a "Copy Link" action
2. WHEN a user clicks "Copy Link", THE Link_Generator SHALL generate a unique shareable URL for that file
3. WHEN a user clicks "Copy Link", THE Link_Generator SHALL copy the URL to the system clipboard
4. WHEN a user clicks "Copy Link", THE Link_Generator SHALL display a confirmation message
5. WHEN a File_Link is accessed, THE Case_Detail_System SHALL verify the user has permission to view the Case
6. WHEN an unauthorized user accesses a File_Link, THE Case_Detail_System SHALL return an access denied error
7. THE Link_Generator SHALL create URLs that include the file identifier and remain valid for the lifetime of the file

### Requirement 5: Case Notes Display

**User Story:** As a user, I want to view case title and description in a dedicated tab, so that I can review case details without distraction

#### Acceptance Criteria

1. WHEN the Case Notes tab is active, THE Case_Notes_Tab SHALL display the Case title
2. WHEN the Case Notes tab is active, THE Case_Notes_Tab SHALL display the Case description
3. WHEN the Case has no description, THE Case_Notes_Tab SHALL display a message indicating no description is available
4. THE Case_Notes_Tab SHALL display content in a readable format with proper text formatting
5. THE Case_Notes_Tab SHALL be accessible to both Staff_User and Client_User roles

### Requirement 6: Case-Specific Chat System

**User Story:** As a Client_User, I want to communicate with staff about a specific case, so that all case-related discussions are centralized and contextual

#### Acceptance Criteria

1. WHEN the Client Chat tab is active, THE Chat_System SHALL display all messages associated with the specific Case
2. WHEN a user sends a message, THE Chat_System SHALL associate the message with the current Case
3. THE Chat_System SHALL display messages in chronological order with oldest messages first
4. FOR EACH message, THE Chat_System SHALL display the sender name, timestamp, and message content
5. THE Chat_System SHALL allow both Staff_User and Client_User to send messages
6. THE Chat_System SHALL prevent messages from being visible in other Cases
7. WHEN a new message is sent, THE Chat_System SHALL notify the other party through the existing notification system

### Requirement 7: Chat Message Input and Submission

**User Story:** As a user, I want to compose and send messages in the case chat, so that I can communicate about case-specific matters

#### Acceptance Criteria

1. WHEN the Client Chat tab is active, THE Chat_System SHALL display a message input field
2. WHEN a user types in the input field, THE Chat_System SHALL allow multi-line text entry
3. WHEN a user clicks the send button, THE Chat_System SHALL submit the message
4. WHEN a message is submitted, THE Chat_System SHALL clear the input field
5. WHEN a message submission fails, THE Chat_System SHALL display an error message and preserve the message text
6. THE Chat_System SHALL allow users to paste File_Link URLs into chat messages
7. WHEN a File_Link is pasted in a message, THE Chat_System SHALL render it as a clickable link

### Requirement 8: Chat Access Control

**User Story:** As a system administrator, I want to ensure chat messages are only visible to case participants, so that case confidentiality is maintained

#### Acceptance Criteria

1. THE Chat_System SHALL restrict chat access to the Client_User who owns the Case and all Staff_User roles
2. WHEN a user attempts to access a Case they do not own and is not a Staff_User, THE Chat_System SHALL deny access
3. THE Chat_System SHALL prevent messages from being sent outside the case context
4. THE Chat_System SHALL not display a general chat interface outside of case tabs
5. WHEN a Case is deleted, THE Chat_System SHALL also delete all associated chat messages

### Requirement 9: Real-Time Chat Updates

**User Story:** As a user, I want to see new messages without refreshing the page, so that I can have a fluid conversation

#### Acceptance Criteria

1. WHEN a new message is sent by another user, THE Chat_System SHALL display the message within 5 seconds without page refresh
2. WHEN the Client Chat tab is not active and a new message arrives, THE Chat_System SHALL display a notification indicator on the tab
3. WHEN a user switches to the Client Chat tab, THE Chat_System SHALL clear the notification indicator
4. THE Chat_System SHALL use polling or websockets to check for new messages
5. WHEN the user is viewing the Client Chat tab, THE Chat_System SHALL automatically scroll to the newest message

### Requirement 10: File Upload Notifications

**User Story:** As a user, I want to be notified when files are added to a case, so that I am aware of case updates

#### Acceptance Criteria

1. WHEN a file is uploaded to a Case, THE File_Manager SHALL notify all case participants through the existing notification system
2. THE File_Manager SHALL include the filename and uploader name in the notification
3. WHEN a Staff_User uploads a file, THE File_Manager SHALL notify the Client_User who owns the Case
4. WHEN a Client_User uploads a file, THE File_Manager SHALL notify all Staff_User roles
5. THE File_Manager SHALL use the existing CaseActivity notification class for consistency

### Requirement 11: Tab Navigation Persistence

**User Story:** As a user, I want the system to remember which tab I was viewing, so that I can return to the same context after navigating away

#### Acceptance Criteria

1. WHEN a user selects a tab, THE Case_Detail_System SHALL store the tab selection in the browser session
2. WHEN a user navigates away and returns to the same Case, THE Case_Detail_System SHALL display the previously selected tab
3. WHEN a user opens a Case for the first time in a session, THE Case_Detail_System SHALL default to the Files tab
4. THE Case_Detail_System SHALL use URL hash or query parameters to enable direct linking to specific tabs
5. WHEN a user shares a URL with a tab parameter, THE Case_Detail_System SHALL open the specified tab for the recipient

### Requirement 12: Responsive Tab Interface

**User Story:** As a user, I want the tabbed interface to work on mobile devices, so that I can access cases from any device

#### Acceptance Criteria

1. WHEN viewed on a mobile device, THE Case_Detail_System SHALL display tabs in a horizontally scrollable layout
2. WHEN viewed on a mobile device, THE Case_Detail_System SHALL maintain full functionality of all tabs
3. THE Case_Detail_System SHALL adapt tab content layout for screens smaller than 768px width
4. THE Chat_System SHALL optimize message display for mobile screens
5. THE File_Tab SHALL display file information in a mobile-friendly card layout on small screens
