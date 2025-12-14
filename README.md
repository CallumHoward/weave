# Weave

## Spec

### Functional Requirements

1. Build a basic slide editor which has support for adding text elements.
2. The user should be able to share the link to a single slide/ all slides with
   anyone to start collaborating with them.
3. Multiple users should be able to make simultaneous changes on the same
   slide.

### Technical Requirements

1. Use React as the frontend library.
2. Use liveblocks (or/and YJS) as the real time collaboration backbone.
3. Undo/Redo should work and should only be scoped to your changes
4. The sharing should work for both single slide and multiple slides.

## Product refinement

### Screens

- List page (/)
  - CRUD
  - Share
- Slides Overview (/[slug])
  - Share
  - Presence avatars

* Slides Editor (/[slug]/[slide])
  - Share
  - Presence avatars
  - Editor

### Schema

```json
{
  "presentation": {
    "id": "123",
    "slug": "123",
    "author": "123",
    "name": "My Presentation",
    "created_at": "123",
    "modified_at": "123"
    "slides": [
      {
        "content": [
          {
            "type": "text",
            "body": "lorem ipsum...",
            "rect": {
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0
            }
          }
        ]
      }
    ]
  }
}
```

Better to decouple slug from id, in-case we want functionality to deactivate a shared link in the future.

## Technical refinement

### Base framework

- React (required)
- TypeScript
- Tanstack Start
  - SSR with SPA hydration
    - Show content to the user quickly, responsive UX, no loading spinners
    - Defer heavier multiplayer and text editor libs
- Prettier
- Vitest
- Playwright
- Firebase Auth, Firestore

### Key libraries

- Liveblocks or Y.js
- TipTap or ProseMirror
- Shadcn/ui
- Tanstack Query
  - tanstack-query-firebase

#### Liveblocks or Y.js

Liveblocks

- 👍👍 Hosting and infra sorted
  - Maybe this removes the need for Firebase

* 👎 Paid
* 👎 Heavier
* 👍 Integration with TipTap

Y.js

- 👍 Has local undo, presence
- 👍 Free OSS
- 👍 Integration with TipTap & ProseMirror

### Hosting

- Vercel, allowing SSR
  - May need to host websocket server
- GitHub for code hosting and actions
