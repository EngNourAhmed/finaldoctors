# Bugfix Requirements Document

## Introduction

This document addresses three UI bugs in the admin cases page that affect user experience and functionality. The bugs include a JavaScript error in the dropdown toggle function, incorrect toast notification titles despite correct styling, and verification of the notifications dropdown size adjustments.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user interacts with the admin page THEN the system throws a JavaScript error "Cannot read properties of null (reading 'contains')" because the event listener at lines 689-693 tries to call .contains() on null elements (messagesBtn, messagesPopup, notificationsBtn, notificationsPopup that don't exist in the admin layout)

1.2 WHEN a case status is successfully updated with showToast('Success', message, 'success') THEN the toast notification displays the title as passed ('Success') but the user expects it to show 'SUCCESS' in uppercase to match the design pattern, or there may be a case where the validation logic incorrectly changes the title

1.3 WHEN the notifications dropdown is opened THEN the dropdown may not properly display with the intended w-[360px] max-h-[400px] dimensions with overflow-y scrolling

### Expected Behavior (Correct)

2.1 WHEN a user interacts with the admin page THEN the system SHALL check if elements exist before calling .contains() on them to prevent null reference errors

2.2 WHEN a case status is successfully updated THEN the toast notification SHALL display 'SUCCESS' as the title (uppercase) with green success styling to match the design pattern

2.3 WHEN the notifications dropdown is opened THEN the dropdown SHALL display with w-[360px] max-h-[400px] dimensions and overflow-y-auto scrolling enabled

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user updates a case status THEN the system SHALL CONTINUE TO update the status in the backend correctly

3.2 WHEN a toast notification is shown THEN the system SHALL CONTINUE TO display the correct color styling based on the notification type

3.3 WHEN dropdowns are closed by clicking outside THEN the system SHALL CONTINUE TO close all open dropdowns properly

3.4 WHEN the showToast function is called with different argument patterns THEN the system SHALL CONTINUE TO handle flexible argument patterns correctly

3.5 WHEN the notifications dropdown contains multiple notifications THEN the system SHALL CONTINUE TO display all notifications with proper styling and read/unread indicators
