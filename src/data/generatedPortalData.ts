// This file is generated from ../pendu-mobile/devportal/data.js
// Run: node scripts/generate-portal-data.mjs

export const PROJECT = {
  "name": "Pendu",
  "tagline": "Chat · Calls · Communities · Tournaments",
  "startedAt": "2025-10-01",
  "platform": "Flutter (Android primary, iOS)",
  "package": "com.pendo.app",
  "stack": [
    "Flutter / Dart",
    "Provider",
    "socket.io",
    "SQLite",
    "Dio",
    "WebRTC",
    "FCM"
  ]
} as const;

export const LAYERS = [
  {
    "id": "layer-0",
    "name": "Core Messaging",
    "description": "The foundation — DMs, group chats, media, calls, auth.",
    "color": "#22c55e"
  },
  {
    "id": "layer-1",
    "name": "Group Foundation",
    "description": "Moderation, system events, invite links, group controls.",
    "color": "#3b82f6"
  },
  {
    "id": "layer-2",
    "name": "Group Engagement",
    "description": "Pinned messages, slow mode, message permissions, polls.",
    "color": "#8b5cf6"
  },
  {
    "id": "layer-3",
    "name": "Monetisation",
    "description": "Freemium tiers, activity insights, AI recap, group boosts.",
    "color": "#f59e0b"
  },
  {
    "id": "layer-4",
    "name": "Deep Links & Growth",
    "description": "Universal links, invite sharing, referrals, profile links.",
    "color": "#ec4899"
  },
  {
    "id": "layer-5",
    "name": "Tournaments & Communities",
    "description": "Community containers, brackets, standings, match results.",
    "color": "#14b8a6"
  },
  {
    "id": "layer-6",
    "name": "Live Events & Streaming",
    "description": "Watch parties, POV tournament streams, screen share, LiveKit SFU.",
    "color": "#f97316"
  }
] as const;

export const FEATURES = [
  {
    "id": "f-dm",
    "layerId": "layer-0",
    "name": "Direct Messages",
    "status": "done",
    "startedAt": "2025-10-01",
    "completedAt": "2025-11-01",
    "timeSpentHours": null,
    "notes": "Text, images, video, audio, files. Offline-first with SQLite.",
    "files": [
      "lib/presentation/screens/chat/chat_detail_screen.dart",
      "lib/data/repositories/chat_repository.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-group-chat",
    "layerId": "layer-0",
    "name": "Group Chats",
    "status": "done",
    "startedAt": "2025-11-01",
    "completedAt": "2025-12-01",
    "timeSpentHours": null,
    "notes": "Create group, add/remove members, change avatar, leave/delete group.",
    "files": [
      "lib/presentation/screens/chat/group_info_screen.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-media",
    "layerId": "layer-0",
    "name": "Media Sharing (Images, Video, Audio, Files)",
    "status": "done",
    "startedAt": "2025-11-15",
    "completedAt": "2026-01-20",
    "timeSpentHours": null,
    "notes": "Collage bubbles, video thumbnails, voice waveform, offline queue. See docs/core/media/.",
    "files": [
      "lib/presentation/widgets/chat/image_collage_bubble.dart",
      "lib/presentation/widgets/chat/video_collage_bubble.dart",
      "lib/data/services/audio_recorder_service.dart"
    ],
    "bugs": [
      {
        "id": "b-001",
        "description": "markMessageSynced stripped 'temp_' prefix → UPDATE matched nothing → localFilePath lost",
        "status": "fixed",
        "severity": "critical",
        "fixedAt": "2026-02-24"
      },
      {
        "id": "b-002",
        "description": "Media dedup matched by text+type → two concurrent images caused duplicate bubbles",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-02-24"
      },
      {
        "id": "b-003",
        "description": "markMessageSynced deleted row when oldId == newServerId → localFilePath permanently lost",
        "status": "fixed",
        "severity": "critical",
        "fixedAt": "2026-02-24"
      },
      {
        "id": "b-022",
        "description": "setState() called after dispose() crash in AudioMessageBubble — scrubber 30s timeout fired after widget was unmounted; seek() is async so mounted check after await was missing",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-24"
      }
    ]
  },
  {
    "id": "f-calls",
    "layerId": "layer-0",
    "name": "Voice & Video Calls (WebRTC P2P)",
    "status": "done",
    "startedAt": "2026-01-01",
    "completedAt": "2026-02-01",
    "timeSpentHours": null,
    "notes": "1-to-1 WebRTC calls, CallKit integration, call sync service.",
    "files": [
      "lib/features/call/",
      "lib/data/repositories/calls_repository.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-auth",
    "layerId": "layer-0",
    "name": "Authentication (JWT + Google Sign-In)",
    "status": "done",
    "startedAt": "2025-10-01",
    "completedAt": "2025-11-01",
    "timeSpentHours": null,
    "notes": "Login, signup, OTP verify, forgot password 3-step, token refresh with lock.",
    "files": [
      "lib/presentation/providers/auth_provider.dart",
      "lib/data/repositories/auth_repository.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-session-security",
    "layerId": "layer-0",
    "name": "Session Security (Revocation + Change Password)",
    "status": "done",
    "startedAt": "2026-03-01",
    "completedAt": "2026-03-15",
    "timeSpentHours": null,
    "notes": "2FA challenge before revoke (password or OTP). Force logout on session_revoked socket event. Change password 3-step flow.",
    "files": [
      "lib/presentation/screens/settings/tabs/account_tab.dart",
      "lib/presentation/providers/auth_provider.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-reactions",
    "layerId": "layer-0",
    "name": "Message Reactions",
    "status": "done",
    "startedAt": "2026-01-15",
    "completedAt": "2026-02-10",
    "timeSpentHours": null,
    "notes": "Emoji reactions, toggle on/off, FCM reaction notifications, chat-list preview.",
    "files": [
      "lib/presentation/providers/chat_provider.dart",
      "docs/core/REACTIONS.md"
    ],
    "bugs": []
  },
  {
    "id": "f-notifications",
    "layerId": "layer-0",
    "name": "Push Notifications (FCM)",
    "status": "done",
    "startedAt": "2026-01-01",
    "completedAt": "2026-02-01",
    "timeSpentHours": null,
    "notes": "Foreground + background handlers, deep link to settings:sessions for revocation.",
    "files": [
      "lib/data/services/notification_service.dart",
      "lib/data/services/fcm_background_handler.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-socket",
    "layerId": "layer-0",
    "name": "Socket Connection Stability",
    "status": "done",
    "startedAt": "2026-03-01",
    "completedAt": "2026-03-18",
    "timeSpentHours": null,
    "notes": "Fixed disconnect loop: connect() no longer destroys socket.io's own reconnection cycle. Rooms de-duplicated with _joinedRooms set. Background sync throttled to 2min.",
    "files": [
      "lib/data/datasources/remote/socket_service.dart",
      "lib/data/repositories/chat_repository.dart"
    ],
    "bugs": [
      {
        "id": "b-004",
        "description": "connect() disposed socket when _socket != null && !connected → killed socket.io reconnection → infinite loop",
        "status": "fixed",
        "severity": "critical",
        "fixedAt": "2026-03-18"
      },
      {
        "id": "b-005",
        "description": "loadConversations() called _joinAllConversationRooms() on every navigation → duplicate join events on every screen switch",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-18"
      },
      {
        "id": "b-006",
        "description": "_syncConversationsInBackground() fired GET /api/conversations on every screen navigation — no throttle",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-18"
      }
    ]
  },
  {
    "id": "f-forward",
    "layerId": "layer-0",
    "name": "Forward Message",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "Single forward from context menu + bulk forward from multi-select mode. Conversation picker sheet: multi-destination (checkboxes), group mosaic avatars, cached DM avatars, excludes current conversation. forwardedFromId persisted to SQLite (DB v10 migration). 'Forwarded' label shown on all bubble types (MessageBubble, ImageCollageBubble, VideoCollageBubble). API response parsing fixed (reads data.data not data.message). AppToast replaces ScaffoldMessenger throughout chat screen.",
    "files": [
      "lib/data/datasources/remote/chat_api.dart",
      "lib/data/repositories/chat_repository.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/widgets/chat/message_context_menu.dart",
      "lib/data/models/message.dart",
      "lib/data/datasources/local/message_dao.dart",
      "lib/data/datasources/local/database_helper.dart",
      "lib/data/services/database_service.dart",
      "lib/presentation/screens/chat/chat_detail_screen.dart"
    ],
    "bugs": [
      {
        "id": "b-016",
        "description": "forwardMessage parsed data['message'] but backend returns {success, data: {...}} — always threw, showing 'Failed to forward' despite HTTP 201",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-20"
      },
      {
        "id": "b-017",
        "description": "forwardedFromId not in SQLite schema — 'Forwarded' label vanished after navigating away (loaded from DB with null forwardedFromId)",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-20"
      }
    ]
  },
  {
    "id": "f-multiselect",
    "layerId": "layer-0",
    "name": "Multi-Select Messages",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "Telegram/WhatsApp-style multi-select. Entry: long-press context menu 'Select' or three-dot header 'Select Messages'. Header transforms to selection variant (✕, count, delete/forward/share icons). Checkbox overlay on each bubble. Bulk delete with confirmation dialog. Bulk forward to multiple conversations via _ForwardSheet. Exit via ✕ or back. Fixed gesture arena conflict — inner GestureDetector onTap added to MessageBubble so outer wrapper tap wasn't swallowed.",
    "files": [
      "lib/presentation/screens/chat/chat_detail_screen.dart",
      "lib/presentation/widgets/chat/chat_header.dart",
      "lib/presentation/widgets/chat/message_bubble.dart",
      "lib/presentation/widgets/chat/message_context_menu.dart"
    ],
    "bugs": [
      {
        "id": "b-018",
        "description": "Tap to select/deselect bubble didn't work — inner GestureDetector had onDoubleTap which caused Flutter to delay+consume single taps before our outer wrapper saw them",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-20"
      }
    ]
  },
  {
    "id": "f-launch-perf",
    "layerId": "layer-0",
    "name": "App Launch Performance (Sync Endpoint + Deferred API Calls)",
    "status": "done",
    "startedAt": "2026-03-25",
    "completedAt": "2026-03-25",
    "timeSpentHours": null,
    "notes": "Replaced POST /api/auth/refresh on every launch with a single GET /api/auth/sync call that returns user + session info without burning a token rotation. Heavy API calls (conversations, presence) moved from SplashScreen into MainAppShell.initState() so the splash resolves instantly and the app shell loads data. StorageService.savePreferences() fixed to write both the blob key and individual flat keys that SettingsProvider reads — user preferences now survive restarts. Unused imports removed from main.dart and auth_provider.dart.",
    "files": [
      "lib/presentation/screens/splash/splash_screen.dart",
      "lib/presentation/screens/main_app_shell.dart",
      "lib/data/services/storage_service.dart",
      "lib/presentation/providers/auth_provider.dart",
      "lib/main.dart"
    ],
    "bugs": [
      {
        "id": "b-023",
        "description": "savePreferences() wrote to blob key 'preferences' but SettingsProvider._loadSettings() reads individual flat keys (theme_mode, sounds_enabled, etc.) — preferences reset to defaults on every cold launch",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-25"
      }
    ]
  },
  {
    "id": "f-message-cache",
    "layerId": "layer-0",
    "name": "In-Memory LRU Message Cache + SQLite Index",
    "status": "done",
    "startedAt": "2026-03-25",
    "completedAt": "2026-03-25",
    "timeSpentHours": null,
    "notes": "WhatsApp-style in-memory LRU cache in ChatProvider. Cache holds the last 10 opened conversations (configurable). setActiveConversation() serves from cache instantly (no DB round-trip) on re-open; first open still loads from SQLite then populates cache. Background socket messages update the cache for non-active conversations so re-opening them is instant too. preloadRecentConversations() preloads top-5 conversations by recency on shell mount. Cache invalidated on loadMoreMessages() (older page fetched) and cleared fully on reset()/logout. SQLite composite index added on messages(conversationId, createdAt DESC) as DB v12 migration to speed up initial DB loads. _patchCacheMessage() wired into messageUpdatesStream for background conversations.",
    "files": [
      "lib/presentation/providers/chat_provider.dart",
      "lib/data/datasources/local/database_helper.dart",
      "lib/data/services/database_service.dart"
    ],
    "bugs": [
      {
        "id": "b-024",
        "description": "_updateConversationInList always called _chatRepository.getConversation() which always hit the API (GET /api/conversations/:id) on every received message — double API call on every chat open",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-25"
      }
    ]
  },
  {
    "id": "f-pinned-messages-cache",
    "layerId": "layer-0",
    "name": "Pinned Messages — Local Cache + Correct Model",
    "status": "done",
    "startedAt": "2026-03-25",
    "completedAt": "2026-03-25",
    "timeSpentHours": null,
    "notes": "PinnedMessageEntry model created (wraps Message + pinnedBy + pinnedAt metadata). PinnedBy model with name getter. PinnedMessageDao with SQLite table (DB v11 migration). ChatRepository.getPinnedMessages() is now offline-first: reads from DB instantly, syncs from API once per session per conversation, emits 'synced' event to ChatProvider. Socket events message_pinned/message_unpinned now persist to/delete from DB. ChatApi.getPinnedMessages() fixed to read data['data'] (was data['pinnedMessages'] — wrong key, always null). ChatProvider and ChatDetailScreen updated to use PinnedMessageEntry throughout.",
    "files": [
      "lib/data/models/pinned_message.dart",
      "lib/data/datasources/local/pinned_message_dao.dart",
      "lib/data/datasources/local/database_helper.dart",
      "lib/data/services/database_service.dart",
      "lib/data/datasources/remote/chat_api.dart",
      "lib/data/repositories/chat_repository.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/screens/chat/chat_detail_screen.dart"
    ],
    "bugs": [
      {
        "id": "b-025",
        "description": "getPinnedMessages parsed response as List<Message> but server returns PinnedMessageEntry wrappers with pinnedBy/pinnedAt metadata — type cast threw 'Null is not a subtype of String'",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-25"
      },
      {
        "id": "b-026",
        "description": "ChatApi read data['pinnedMessages'] but server response envelope is { success, data: [...] } — field was always null, pinned messages never loaded",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-25"
      }
    ]
  },
  {
    "id": "f-ban",
    "layerId": "layer-1",
    "name": "Ban / Unban Members",
    "status": "done",
    "startedAt": "2026-02-15",
    "completedAt": "2026-03-01",
    "timeSpentHours": null,
    "notes": "POST /groups/:id/members/:userId/ban. Banned members sheet in group info. GroupBan model.",
    "files": [
      "lib/data/models/group_ban.dart",
      "lib/data/datasources/remote/chat_api.dart",
      "lib/presentation/screens/chat/group_info_screen.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-mute-member",
    "layerId": "layer-1",
    "name": "Mute Member (Moderation)",
    "status": "done",
    "startedAt": "2026-02-15",
    "completedAt": "2026-03-01",
    "timeSpentHours": null,
    "notes": "Duration options: 10m, 1h, 24h, forever. MuteMemberSheet bottom sheet.",
    "files": [
      "lib/presentation/widgets/chat/mute_member_sheet.dart",
      "lib/presentation/screens/chat/group_info_screen.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-promote",
    "layerId": "layer-1",
    "name": "Promote / Demote Members (Admin Role)",
    "status": "done",
    "startedAt": "2026-02-15",
    "completedAt": "2026-03-01",
    "timeSpentHours": null,
    "notes": "Make Admin / Remove Admin toggle in member list. Socket events member_promoted/demoted handled.",
    "files": [
      "lib/presentation/screens/chat/group_info_screen.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-system-events",
    "layerId": "layer-1",
    "name": "System Event Logs in Chat",
    "status": "done",
    "startedAt": "2026-02-20",
    "completedAt": "2026-03-10",
    "timeSpentHours": null,
    "notes": "SystemEventBubble renders all event types as centred pills. Tappable actor/target names navigate to profiles.",
    "files": [
      "lib/presentation/widgets/chat/system_event_bubble.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-invite-links",
    "layerId": "layer-1",
    "name": "Invite Link System",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "InviteLink + GroupPreview models done. ChatApi (create/get/revoke/preview/join), ChatRepository, ChatProvider all wired. InviteLinksSheet UI built (active links, copy/share/revoke, create form with expiry+uses chips, animations). share_plus v12 integrated. Backend added isMember field to preview endpoint — JoinGroupScreen now fully wired. URL domain fixed to web.penduu.com. group:member_joined socket event fully wired in ChatProvider — adds participant to _activeConversation and notifies listeners so member sheet and invite link usage count update reactively.",
    "files": [
      "lib/data/models/invite_link.dart",
      "lib/data/models/group_preview.dart",
      "lib/data/datasources/remote/chat_api.dart",
      "lib/data/repositories/chat_repository.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/widgets/chat/invite_links_sheet.dart",
      "lib/presentation/screens/chat/group_info_screen.dart",
      "lib/presentation/screens/chat/join_group_screen.dart"
    ],
    "bugs": [
      {
        "id": "b-010",
        "description": "system_event_bubble MESSAGE_PERMISSION_CHANGED read p['permission'] but payload key is 'newValue' → always showed 'all members' text",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-20"
      },
      {
        "id": "b-011",
        "description": "Socket handler read data['conversationId'] but server sends data['groupId'] → _patchConversationSettings(null) → state never updated from socket",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-20"
      }
    ]
  },
  {
    "id": "f-slow-mode",
    "layerId": "layer-2",
    "name": "Slow Mode Controls",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "PATCH /api/groups/:id/settings wired through ChatApi → ChatRepository → ChatProvider. Optimistic local patch via _patchConversationSettings. Toggle in Group Settings section (admin only). Duration picker sheet: 10s/30s/1min/5min/1hr. Offline guard. Chat input enforcement (countdown timer, disabled state). Socket event corrects state. Backend fixed to store slowModeSeconds as a permanent config (not a timed expiry).",
    "files": [
      "lib/data/datasources/remote/chat_api.dart",
      "lib/data/repositories/chat_repository.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/screens/chat/group_info_screen.dart",
      "lib/presentation/screens/chat/chat_detail_screen.dart",
      "lib/presentation/widgets/chat/system_event_bubble.dart"
    ],
    "bugs": [
      {
        "id": "b-012",
        "description": "SLOW_MODE_CHANGED event payload uses newValue key but SystemEventBubble was reading seconds key — always null → always showed 'disabled'",
        "severity": "medium",
        "status": "fixed",
        "fixedAt": "2026-03-20"
      },
      {
        "id": "b-013",
        "description": "Backend treated slowModeSeconds as a timed expiry (like mutedUntil) instead of a permanent config — auto-disabled after N seconds",
        "severity": "high",
        "status": "fixed",
        "fixedAt": "2026-03-20"
      }
    ]
  },
  {
    "id": "f-message-permission",
    "layerId": "layer-2",
    "name": "Message Permission (Admins-Only Mode)",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "PATCH /api/groups/:id/settings wired. Optimistic toggle in Group Settings section (admin only). Offline guard. Socket event group:message_permission_changed corrects state. System event bubble text fixed (reads newValue not permission key). Chat input enforcement done — non-admins see locked banner when admins_only is active.",
    "files": [
      "lib/data/datasources/remote/chat_api.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/screens/chat/group_info_screen.dart",
      "lib/presentation/screens/chat/chat_detail_screen.dart",
      "lib/presentation/widgets/chat/system_event_bubble.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-pinned-messages",
    "layerId": "layer-2",
    "name": "Pinned Messages",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "Full pin/unpin flow. API: POST/DELETE /api/conversations/:id/messages/:messageId/pin, GET /api/conversations/:id/pinned. Socket events: message_pinned/message_unpinned wired via SocketService → ChatRepository (pinChangedStream) → ChatProvider. Pinned messages ephemeral (no SQLite) — loaded fresh on setActiveConversation. UI: pin/unpin in message context menu, pinned banner at top of chat (tappable → scrolls to message), full pinned messages sheet (all pins, tap to scroll, unpin from sheet). MESSAGE_PINNED/UNPINNED system events render in chat timeline via SystemEventBubble.",
    "files": [
      "lib/core/constants/api_endpoints.dart",
      "lib/data/datasources/remote/chat_api.dart",
      "lib/data/datasources/remote/socket_service.dart",
      "lib/data/repositories/chat_repository.dart",
      "lib/presentation/providers/chat_provider.dart",
      "lib/presentation/widgets/chat/message_context_menu.dart",
      "lib/presentation/screens/chat/chat_detail_screen.dart"
    ],
    "bugs": []
  },
  {
    "id": "f-polls",
    "layerId": "layer-2",
    "name": "Polls",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Nothing built. Need: Poll model, PollVote model, poll bubble in chat, vote UI, create poll sheet, API endpoints wired.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-freemium",
    "layerId": "layer-3",
    "name": "Freemium Tier Enforcement",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Group size limits: Free=256, Premium=2000, Pro=10000. Feature gates for insights, AI recap, themes.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-insights",
    "layerId": "layer-3",
    "name": "Activity Insights",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "GET /groups/:id/insights. Premium gate. No model, no screen, no API call.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-ai-recap",
    "layerId": "layer-3",
    "name": "AI Chat Recap",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "POST /groups/:id/recap. Free: 3/day. Premium: unlimited. Nothing built.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-boosts",
    "layerId": "layer-3",
    "name": "Group Boost System",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Spend Pendu Points to boost group (member slots, theme, insights). Nothing built.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-pendu-points",
    "layerId": "layer-3",
    "name": "Pendu Points (Reward Currency)",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Earn via activity, daily login, referrals, events. Spend on boosts, AI recap packs, discovery. Nothing built.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-invite-deeplink",
    "layerId": "layer-4",
    "name": "Group Invite Deep Links",
    "status": "done",
    "startedAt": "2026-03-20",
    "completedAt": "2026-03-20",
    "timeSpentHours": null,
    "notes": "web.penduu.com/join/:code. Android intent-filter (autoVerify) added to AndroidManifest. app_links package wired in app.dart — handles cold start + warm start. assetlinks.json at web.penduu.com/.well-known/assetlinks.json with SHA-256 fingerprint. Permanent stable SHA credentials locked in — Gradle keystore config hardened so the fingerprint never changes between builds. Web /join/:code page fully built: blue primary (#3b82f6), R2 avatar key resolved via POST /api/uploads/download-url, Redux hydration race fixed (isInitializing guard prevents premature profile-setup redirect), in-app navigation fixed (LoadingScreen gate bypasses /join/* routes). Vercel serverless function api/join/[code].js injects OG meta tags for bots (User-Agent detection, fetches preview API, wraps index.html). Post-login redirect via pendingInviteCode in localStorage. Pending: iOS AASA file + Info.plist (needs iOS provisioning). Pending: add release keystore SHA-256 to assetlinks.json.",
    "files": [
      "android/app/src/main/AndroidManifest.xml",
      "lib/app.dart",
      "pubspec.yaml",
      "pendu-web/src/pages/Groups/JoinGroup.tsx",
      "pendu-web/src/pages/Groups/JoinGroup.scss",
      "pendu-web/src/App.tsx",
      "pendu-web/api/join/[code].js",
      "pendu-web/public/.well-known/assetlinks.json",
      "pendu-web/vercel.json"
    ],
    "bugs": [
      {
        "id": "b-019",
        "description": "JoinGroup page immediately redirected to /auth/profile-setup during Redux hydration — isAuthenticated=true but profile not yet loaded → hasCompletedProfile=false → redirect fired",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-24"
      },
      {
        "id": "b-020",
        "description": "Clicking join link from within the app showed blank page — isJoinRoute fast-path in App.tsx rendered a separate Router; in-app navigation hit main router which was blocked by LoadingScreen",
        "status": "fixed",
        "severity": "high",
        "fixedAt": "2026-03-24"
      },
      {
        "id": "b-021",
        "description": "Group avatar showed broken image — backend returns R2 key (e.g. groups/uuid/file.jpg) not a URL; must resolve via POST /api/uploads/download-url before setting img src",
        "status": "fixed",
        "severity": "medium",
        "fixedAt": "2026-03-24"
      }
    ]
  },
  {
    "id": "f-profile-deeplink",
    "layerId": "layer-4",
    "name": "User Profile Deep Links",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "pendu.app/u/{username}. Share sheet on profile screen. PublicProfileScreen.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-referral-deeplink",
    "layerId": "layer-4",
    "name": "Referral Links",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "pendu.app/r/{code}. Credits referrer with Pendu Points on signup. Deferred deep linking needed.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-communities",
    "layerId": "layer-5",
    "name": "Communities (Tournament Containers)",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Persistent group with Pro subscription, roles (owner/admin/mod/member), contains tournaments.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-tournaments",
    "layerId": "layer-5",
    "name": "Tournament System",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Formats: single elimination, group+knockout, round robin. Bracket generation, standings (football-style pts), match workflow: SCHEDULED→PENDING_APPROVAL→COMPLETED.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-payments",
    "layerId": "layer-5",
    "name": "Pro Subscriptions (Paystack)",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "₦5000/month per community Pro. Webhook signature verification. Feature gating middleware.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-watch-party",
    "layerId": "layer-6",
    "name": "Watch Party",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Stream videos together in a group. See home-page-v2 prototype.",
    "files": [
      "generated/home-page-v2/index.html"
    ],
    "bugs": []
  },
  {
    "id": "f-pov-streaming",
    "layerId": "layer-6",
    "name": "Tournament POV Streaming (LiveKit SFU)",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "Multi-broadcaster, spectator mode. Upgrade from P2P WebRTC to LiveKit SFU. Pro-gated, unlocks from quarterfinals+.",
    "files": [],
    "bugs": []
  },
  {
    "id": "f-screen-share",
    "layerId": "layer-6",
    "name": "Screen Share",
    "status": "not-started",
    "startedAt": null,
    "completedAt": null,
    "timeSpentHours": null,
    "notes": "In-group screen sharing. See home-page-v2 prototype.",
    "files": [],
    "bugs": []
  }
] as const;
