// Bistropulse — hand-authored portal data
// Edit this file directly to update status, add bugs, or add logic entries.
// No generator needed — this is the source of truth.

// ─────────────────────────────────────────────────────────────
// PROJECT META
// ─────────────────────────────────────────────────────────────

export const PROJECT = {
  name: 'Bistropulse',
  tagline: 'Restaurant · Riders · Franchises · Customers',
  startedAt: '2025-12-01',
  platform: 'Angular 19 (web) + Django REST Framework',
  package: 'bistropulse',
  stack: [
    'Angular 19',
    'PrimeNG',
    'SCSS',
    'Django REST Framework',
    'PostgreSQL',
    'WebSocket',
    'Token Auth',
  ],
} as const

// ─────────────────────────────────────────────────────────────
// LAYERS (phases/modules)
// ─────────────────────────────────────────────────────────────

export const LAYERS = [
  {
    id: 'layer-0',
    name: 'Auth & Workspace',
    description: 'Login, token auth, business workspace detection, role-based sidebar routing.',
    color: '#22c55e',
  },
  {
    id: 'layer-1',
    name: 'Orders',
    description: 'Order list, order details, add order, order history — all wired to real API with WebSocket.',
    color: '#3b82f6',
  },
  {
    id: 'layer-2',
    name: 'Riders',
    description: 'Rider list, add rider, shift start/end with secret code, active toggle, rider overview.',
    color: '#8b5cf6',
  },
  {
    id: 'layer-3',
    name: 'Customers',
    description: 'Customer list, add customer, edit customer (dirty tracking), view customer.',
    color: '#f59e0b',
  },
  {
    id: 'layer-4',
    name: 'Food & Menu',
    description: 'Food list, add food, add extra food, food details, food categories.',
    color: '#ec4899',
  },
  {
    id: 'layer-5',
    name: 'Restaurants & Franchises',
    description: 'Restaurant overview, franchise list, branch management, branch riders, upgrade to franchise.',
    color: '#14b8a6',
  },
  {
    id: 'layer-6',
    name: 'Dashboard & UI Polish',
    description: 'Dashboard stats via forkJoin, dark mode, sidebar theming, global layout, dev portal.',
    color: '#f97316',
  },
] as const

// ─────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────

export const FEATURES = [
  // ── LAYER 0 — Auth & Workspace ──────────────────────────────
  {
    id: 'f-auth',
    layerId: 'layer-0',
    name: 'Login & Token Auth',
    status: 'done',
    startedAt: '2025-12-01',
    completedAt: '2025-12-15',
    timeSpentHours: null,
    notes: 'POST /auth/login/ and /auth/register/. Token saved to localStorage (key: auth_token). AuthGuard protects all /admin routes. Logout clears auth_token, user_data, selectedRestaurantId, selectedFranchiseId, selectedBranchId. 401 on any API call triggers auto-logout.',
    files: [
      'src/app/auth/login/login.component.ts',
      'src/app/shared/services/auth.service.ts',
    ],
    bugs: [],
  },
  {
    id: 'f-workspace',
    layerId: 'layer-0',
    name: 'Business Workspace Detection',
    status: 'done',
    startedAt: '2025-12-10',
    completedAt: '2026-01-10',
    timeSpentHours: null,
    notes: 'BusinessWorkspaceService runs at login and resolves the user into one of 6 modes: restaurant-owner, restaurant-manager, franchise-owner, branch-manager, ownership-conflict, none. Manager roles are detected differently from owner roles. Result is stored as BehaviorSubject. Sidebar nav items are conditionally shown based on the resolved mode. getHomeRoute(state) returns the correct landing route per mode.',
    files: [
      'src/app/shared/services/business-workspace.service.ts',
      'src/app/admin/layout/layout.component.ts',
    ],
    bugs: [],
  },

  // ── LAYER 1 — Orders ────────────────────────────────────────
  {
    id: 'f-order-list',
    layerId: 'layer-1',
    name: 'Restaurant Order List',
    status: 'done',
    startedAt: '2026-01-15',
    completedAt: '2026-03-20',
    timeSpentHours: null,
    notes: 'GET /restaurants/:id/orders/ via OrderTrackingService.getRestaurantOrders(). Response is either a plain array or paginated {results: [], count: N} — handled with Array.isArray guard. Status tabs: All, Placed, Accepted, Being Prepared, On The Way, Delivered, Cancelled. Search by order ID or customer name. Paginated 10 per page. Bulk delete. CSV export.',
    files: [
      'src/app/admin/restaurants/restaurant-order-list/restaurant-order-list.component.ts',
      'src/app/shared/services/order-tracking.service.ts',
    ],
    bugs: [
      {
        id: 'b-order-001',
        severity: 'high',
        description: 'apiOrders.map is not a function — backend returns paginated {results: [], count: N} not a plain array. Fixed with Array.isArray(response) ? response : (response?.results ?? []).',
        status: 'fixed',
        fixedAt: '2026-03-20',
      },
      {
        id: 'b-order-002',
        severity: 'medium',
        description: "NG7 template type error — order.status === 'Pending' did not overlap with the union type. Pending was removed from the union. Check now uses order.status === 'Placed' || order.status === 'Accepted'.",
        status: 'fixed',
        fixedAt: '2026-03-20',
      },
    ],
  },
  {
    id: 'f-order-details',
    layerId: 'layer-1',
    name: 'Order Details',
    status: 'done',
    startedAt: '2026-02-01',
    completedAt: '2026-03-21',
    timeSpentHours: null,
    notes: 'GET /restaurants/:restaurantId/orders/:orderId/. Hardcoded IDs replaced with route params. Live WebSocket connection via connect(orderId) — auto-reconnects up to 5 times with exponential backoff (3s * attempt). Incoming WS updates are merged with existing orderData preserving nested objects. Assign rider: fetches rider list, search by name or phone, assigns via updateOrder() with rider_code. Status update, payment update all via PUT to same endpoint. Financial calc: subtotal = sum(unit_price * quantity), total = subtotal + delivery_fee + platform_fee + tax. Delivery timeline: Placed → Accepted → Being Prepared → On The Way → Delivered.',
    files: [
      'src/app/admin/restaurants/restaurant-order-details/restaurant-order-details.component.ts',
      'src/app/shared/services/order-tracking.service.ts',
    ],
    bugs: [],
  },
  {
    id: 'f-add-order',
    layerId: 'layer-1',
    name: 'Add Order',
    status: 'done',
    startedAt: '2026-02-10',
    completedAt: '2026-03-22',
    timeSpentHours: null,
    notes: 'Two-tab UI: Foods and Cart. Foods tab loads GET /restaurants/:id/foods/ grouped by categoryName. Cart tab shows selected items with quantity controls. Customer picker: loads all customers, filters by name/phone, requires selection before checkout. Fixed charges: delivery_fee=50, platform_fee=10, tax=5. Payload includes customer_code, restaurant_code, items[], payment_method, payment_status=Pending, status=Placed, location placeholders (lat:0,lng:0). POST /restaurants/:id/orders/.',
    files: [
      'src/app/admin/restaurants/add-order/add-order.component.ts',
      'src/app/admin/restaurants/add-order/add-order.component.html',
    ],
    bugs: [
      {
        id: 'b-order-003',
        severity: 'low',
        description: "Debug card 'Restaurant context / Restaurant ID: B3786' was visible to restaurant owners in the production UI. Removed from add-order template.",
        status: 'fixed',
        fixedAt: '2026-03-28',
      },
    ],
  },
  {
    id: 'f-order-history',
    layerId: 'layer-1',
    name: 'Order History',
    status: 'done',
    startedAt: '2026-03-01',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'Same endpoint as order list — GET /restaurants/:id/orders/ — but filtered client-side to status Delivered or Cancelled only. Status tabs: All, Delivered, Cancelled. Search, pagination, bulk select, CSV export. Hardcoded 8-item mock replaced with real API.',
    files: [
      'src/app/admin/orders/order-overviews/order-history/order-history.component.ts',
    ],
    bugs: [],
  },

  // ── LAYER 2 — Riders ────────────────────────────────────────
  {
    id: 'f-rider-list',
    layerId: 'layer-2',
    name: 'Rider List',
    status: 'done',
    startedAt: '2026-02-15',
    completedAt: '2026-03-25',
    timeSpentHours: null,
    notes: 'GET /restaurants/:restaurantId/riders/ via getRestaurantRiders(). Active/inactive toggle via PATCH /riders/:id/ with {is_active}. Rider IDs are URL-encoded with encodeURIComponent() due to special characters. Dropdown actions: View, Edit, Enable/Disable.',
    files: [
      'src/app/admin/riders/riders/riders.component.ts',
      'src/app/shared/services/rider.service.ts',
    ],
    bugs: [
      {
        id: 'b-rider-001',
        severity: 'medium',
        description: "(optionSelected) was the wrong event name on app-dropdown — the component emits (selected) not (optionSelected). Fixed across rider and customer list components.",
        status: 'fixed',
        fixedAt: '2026-03-25',
      },
    ],
  },
  {
    id: 'f-rider-shifts',
    layerId: 'layer-2',
    name: 'Rider Shifts',
    status: 'done',
    startedAt: '2026-03-01',
    completedAt: '2026-03-26',
    timeSpentHours: null,
    notes: 'Shift types (templates) loaded from GET /restaurants/:id/shift-types/. Starting a shift: POST /restaurants/:id/rider/:riderId/start-shift/ with {shift_type_id} — returns shift object with an ID. Ending a shift: POST /restaurants/:id/rider-shift/:shiftId/end/ with {secret_code}. The secret code is not pre-validated on the frontend — it is just a confirmation field sent to the backend. Per-rider state stored as Record<number, {shiftStarted, activeShiftId, selectedShiftTypeId, secretCode, counter, intervalId}> — keyed by rider.id so multiple riders can be in different states simultaneously. Timer increments every 1000ms and rolls over HH:MM:SS. All intervals cleared on ngOnDestroy.',
    files: [
      'src/app/admin/riders/rider-shifts/rider-shifts.component.ts',
      'src/app/admin/riders/rider-shifts/rider-shifts.component.html',
      'src/app/shared/services/rider.service.ts',
    ],
    bugs: [
      {
        id: 'b-rider-002',
        severity: 'high',
        description: "NG5002 — Angular template parser rejects single-quoted string literals inside single-quoted HTML attribute bindings like [modalId]=\"'start-' + i\". All string literals moved to TS class methods (startModalKey(i), endModalKey(i)).",
        status: 'fixed',
        fixedAt: '2026-03-26',
      },
    ],
  },
  {
    id: 'f-rider-overview',
    layerId: 'layer-2',
    name: 'Rider Overview',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'Individual rider profile/stats page. Likely stub — needs real API wiring via getRidersById().',
    files: ['src/app/admin/riders/rider-overview/rider-overview.component.ts'],
    bugs: [],
  },

  // ── LAYER 3 — Customers ─────────────────────────────────────
  {
    id: 'f-customer-list',
    layerId: 'layer-3',
    name: 'Customer List',
    status: 'done',
    startedAt: '2026-02-01',
    completedAt: '2026-03-27',
    timeSpentHours: null,
    notes: 'GET /customers/?page=1&page_size=10. Paginated, search by name, CSV export. Dropdown: View navigates to /:id/view, Edit navigates to /:id/edit. Disable/Enable was removed — not a listed feature and the backend CustomerDetailView had no PATCH handler (would 405). toggleCustomerActive() removed from service.',
    files: ['src/app/admin/customers/customers/customers.component.ts'],
    bugs: [
      {
        id: 'b-customer-001',
        severity: 'medium',
        description: 'Disable/Enable option in customer dropdown called PATCH /customers/:id/ but CustomerDetailView only defined GET and PUT — no patch() handler. Backend returned 405 Method Not Allowed. Feature was not in the PRD so the option was removed entirely.',
        status: 'fixed',
        fixedAt: '2026-03-29',
      },
    ],
  },
  {
    id: 'f-add-customer',
    layerId: 'layer-3',
    name: 'Add Customer',
    status: 'done',
    startedAt: '2026-02-05',
    completedAt: '2026-03-10',
    timeSpentHours: null,
    notes: 'POST /customers/ as FormData. Fields: name, email, phone, photo (File), gender, location, is_student. PrimeNG float labels. FormData upload removes Content-Type header so browser sets multipart boundary automatically.',
    files: ['src/app/admin/customers/add-customer/add-customer.component.ts'],
    bugs: [],
  },
  {
    id: 'f-edit-customer',
    layerId: 'layer-3',
    name: 'Edit Customer',
    status: 'done',
    startedAt: '2026-03-28',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'GET /customers/:id/ pre-fills the form on load. Saves a snapshot of original values. isDirty flag is recalculated on every (ngModelChange) and (onChange) event. Save button is disabled until isDirty=true. Detects field changes, new image file selected, or existing image removed. PUT /customers/:encodedId/ with JSON payload (not FormData for edits). Customer IDs are URL-encoded.',
    files: [
      'src/app/admin/customers/edit-customer/edit-customer.component.ts',
      'src/app/admin/customers/edit-customer/edit-customer.component.html',
    ],
    bugs: [],
  },
  {
    id: 'f-view-customer',
    layerId: 'layer-3',
    name: 'View Customer',
    status: 'done',
    startedAt: '2026-03-28',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'GET /customers/:id/. Read-only profile view. Shows avatar (or initial fallback), name, email, phone, location, customer ID, joined date, active status badge. Route: /admin/customers/:id/view.',
    files: ['src/app/admin/customers/view-customer/view-customer.component.ts'],
    bugs: [],
  },

  // ── LAYER 4 — Food & Menu ───────────────────────────────────
  {
    id: 'f-food-list',
    layerId: 'layer-4',
    name: 'Food List',
    status: 'done',
    startedAt: '2026-03-28',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'GET /restaurants/:id/foods/ via FoodService.getFoods(). Handles paginated or plain array response. Maps API fields: id/food_id, name, category_name, price (parsed as float), is_available/available, image/photo_url. Search by name via FilterByPipe. View/edit/delete dropdown per row. Delete calls DELETE /restaurants/foods/:pk/ — backend URL registered (FoodRetrieveUpdateDestroyView was unregistered). Edit action stub exists but has no route yet.',
    files: ['src/app/admin/restaurants/food/food-list/food-menu.component.ts'],
    bugs: [],
  },
  {
    id: 'f-add-food',
    layerId: 'layer-4',
    name: 'Add Food',
    status: 'done',
    startedAt: null,
    completedAt: '2026-03-29',
    timeSpentHours: null,
    notes: 'POST /restaurants/:id/foods/ via FoodService.createFood(). isLoading signal now toggles during request — spinner shows on submit. On success: toastr + redirect to /admin/restaurants/:id/food. On error: toastr with backend detail message. Page title was incorrectly "Add Restaurant" — fixed to "Add Food". Debug console.log loop removed.',
    files: ['src/app/admin/restaurants/food/add-food/add-food.component.ts'],
    bugs: [],
  },
  {
    id: 'f-add-extra',
    layerId: 'layer-4',
    name: 'Add Extra Food',
    status: 'done',
    startedAt: '2026-03-28',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'POST /restaurants/:id/foods/ as FormData with name, price, image. Validates name and price before submitting. isSubmitting flag disables button during request. Redirects to food list on success. restaurantId read from route param :id.',
    files: ['src/app/admin/restaurants/food/add-extra/add-extra.component.ts'],
    bugs: [],
  },
  {
    id: 'f-food-details',
    layerId: 'layer-4',
    name: 'Food Details',
    status: 'done',
    startedAt: null,
    completedAt: '2026-03-29',
    timeSpentHours: null,
    notes: 'GET /restaurants/foods/:pk/ via FoodService.getFood(). foodId read from route param. Backend returns averageRating, totalRatings, reviews, sizes, image — all mapped to the template. Rating breakdown computed from real reviews. Sizes section only renders if food has multiple size prices. Empty reviews state added. Was fully hardcoded mock data before wiring.',
    files: ['src/app/admin/restaurants/food/food-details/food-details.component.ts'],
    bugs: [],
  },
  {
    id: 'f-categories',
    layerId: 'layer-4',
    name: 'Food Categories',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'GET /restaurants/:id/food-categories/ and POST /restaurants/:id/food-categories/. Both service methods exist. UI wiring status needs verification.',
    files: ['src/app/admin/restaurants/food/categories/categories.component.ts'],
    bugs: [],
  },

  // ── LAYER 5 — Restaurants & Franchises ──────────────────────
  {
    id: 'f-restaurant-overview',
    layerId: 'layer-5',
    name: 'Restaurant Overview',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'Overview page for a single restaurant. GET /restaurants/:id/. API wiring status needs verification.',
    files: ['src/app/admin/restaurants/restaurant-overview/restaurant-overview.component.ts'],
    bugs: [],
  },
  {
    id: 'f-franchise-list',
    layerId: 'layer-5',
    name: 'Franchise List',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'GET franchisesUrl (separate base URL from apiUrl). FranchisesService.getFranchises(). Wiring status needs audit.',
    files: ['src/app/admin/franchises/franchise-list/franchise-list.component.ts'],
    bugs: [],
  },
  {
    id: 'f-branch-list',
    layerId: 'layer-5',
    name: 'Branch List',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'GET franchisesUrl/:id/branches. FranchisesService.getBranches(franchiseId). Needs audit.',
    files: ['src/app/admin/franchises/branch-list/branch-list.component.ts'],
    bugs: [],
  },
  {
    id: 'f-franchise-orders',
    layerId: 'layer-5',
    name: 'Franchise Order List & History',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'Branch-level equivalents of restaurant order list and history. Route: /franchises/:franchiseId/branches/:branchId/orders. Likely stubs — needs full wiring.',
    files: [
      'src/app/admin/franchises/orders/franchise-order-list/franchise-order-list.component.ts',
      'src/app/admin/franchises/orders/franchise-order-history/franchise-order-history.component.ts',
    ],
    bugs: [],
  },
  {
    id: 'f-branch-riders',
    layerId: 'layer-5',
    name: 'Branch Riders & Shifts',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'Rider management for franchise branches. Route: /franchises/:franchiseId/branches/:branchId/riders and /riders/shifts. Likely stubs.',
    files: [
      'src/app/admin/franchises/riders/branch-riders/branch-riders.component.ts',
      'src/app/admin/franchises/riders/branch-rider-shifts/branch-rider-shifts.component.ts',
    ],
    bugs: [],
  },
  {
    id: 'f-invitations',
    layerId: 'layer-5',
    name: 'Invitations',
    status: 'in-progress',
    startedAt: null,
    completedAt: null,
    timeSpentHours: null,
    notes: 'Invite drawer component exists. Does it POST to backend? InvitationService exists. Needs verification that the invite flow is fully wired.',
    files: [
      'src/app/admin/invitations/invitations-list/invitations-list.component.ts',
      'src/app/admin/invitations/invite-drawer/invite-drawer.component.ts',
      'src/app/shared/services/invitation.service.ts',
    ],
    bugs: [],
  },

  // ── LAYER 6 — Dashboard & UI Polish ─────────────────────────
  {
    id: 'f-dashboard',
    layerId: 'layer-6',
    name: 'Dashboard Stats',
    status: 'done',
    startedAt: '2026-03-01',
    completedAt: '2026-03-15',
    timeSpentHours: null,
    notes: 'forkJoin loads foods, orders, customers in parallel. 4 stat cards: Total Menus (food count), Total Orders Today (filtered by date), Total Clients (pagination count), Revenue Today (sum of total/total_price for today). Progress bars use soft maxes: menus=100, orders=50, clients=200, revenue=500. Revenue = sum(o.total_price ?? o.total ?? 0). Today filter: date_ordered.startsWith(todayISO).',
    files: ['src/app/admin/dashboard/dashboard.component.ts'],
    bugs: [],
  },
  {
    id: 'f-dark-mode',
    layerId: 'layer-6',
    name: 'Dark Mode & Theming',
    status: 'done',
    startedAt: '2026-03-20',
    completedAt: '2026-03-22',
    timeSpentHours: null,
    notes: 'Dark mode class .app-dark is set on the <html> element. PrimeNG components like p-drawer use a portal/teleport to append to document.body — which is a child of <html> but CSS custom properties do not cascade through the teleport boundary in all browsers. Fixed by adding explicit global overrides in styles.scss: .p-drawer { background: #fff } and .app-dark .p-drawer { background: #0c1220 }.',
    files: ['src/styles.scss'],
    bugs: [
      {
        id: 'b-ui-001',
        severity: 'medium',
        description: 'Mobile sidebar (p-drawer) showed white/light background in dark mode. PrimeNG teleports the drawer to document.body which is outside the .app-dark scope on <html>. CSS custom properties did not resolve correctly. Fixed with explicit global overrides.',
        status: 'fixed',
        fixedAt: '2026-03-22',
      },
    ],
  },
  {
    id: 'f-upload-tile',
    layerId: 'layer-6',
    name: 'Upload Tile & Form Layout',
    status: 'done',
    startedAt: '2026-03-28',
    completedAt: '2026-03-28',
    timeSpentHours: null,
    notes: 'Upload tile used across add-customer, edit-customer, add-food. Was stretching into a wide banner when a prefilled image (landscape/wide) was shown because min-height: 14rem had no aspect constraint. Fixed with aspect-ratio: 4/3. Customer form layout classes (.customer-form__layout, .customer-form__media, .customer-form__details, .student-toggle) moved to global styles.scss so both add-customer and edit-customer inherit them without duplication.',
    files: ['src/styles.scss'],
    bugs: [
      {
        id: 'b-ui-002',
        severity: 'low',
        description: 'Upload tile with a prefilled customer photo stretched into a full-width banner. min-height: 14rem with no width constraint caused landscape images to expand horizontally. Fixed with aspect-ratio: 4/3.',
        status: 'fixed',
        fixedAt: '2026-03-28',
      },
    ],
  },
] as const

// ─────────────────────────────────────────────────────────────
// LOGIC — human-readable technical explanations
// Edit or add entries here to document how the system works.
// ─────────────────────────────────────────────────────────────

export interface LogicEntry {
  id: string
  title: string
  category: string
  summary: string
  endpoints: string[]
  flow: string[]
  decisions: string[]
  gotchas: string[]
}

export const LOGIC: LogicEntry[] = [
  {
    id: 'logic-workspace',
    title: 'How Workspace Detection Works',
    category: 'Auth & Routing',
    summary: 'When a user logs in, the app does not just check a role string. It runs BusinessWorkspaceService.initialize() which queries the backend to figure out exactly what the user owns or manages — and then derives the correct sidebar and home route from that.',
    endpoints: [
      'GET /restaurants/ — checks if user owns any restaurants',
      'GET /franchises/ — checks if user owns any franchises',
      'GET /restaurants/:id/staff/ — checks if user is a manager',
    ],
    flow: [
      '1. User logs in — token saved to localStorage.',
      '2. Layout component calls BusinessWorkspaceService.initialize().',
      '3. Service queries the backend in parallel for restaurants, franchises, and staff assignments.',
      '4. If the user owns restaurants but no franchises → mode = restaurant-owner, restaurantId is stored.',
      '5. If the user owns franchises but no restaurants → mode = franchise-owner, franchiseId is stored.',
      '6. If the user is listed as a manager on a restaurant → mode = restaurant-manager.',
      '7. If the user is listed as a manager on a branch → mode = branch-manager.',
      '8. If the user somehow owns both a restaurant and a franchise → mode = ownership-conflict (error state).',
      '9. Mode is stored in a BehaviorSubject. Sidebar reads the mode and shows/hides nav items accordingly.',
      '10. getHomeRoute(state) returns /admin/restaurants/:id for restaurant-owner, /admin/franchises for franchise-owner, etc.',
    ],
    decisions: [
      'Workspace is resolved at runtime on every login — not stored in the token — so it stays accurate if ownership changes.',
      'Manager detection is separate from owner detection because the backend treats them differently.',
      'ownership-conflict is an explicit mode not an error — it renders a specific UI asking the user to contact support.',
    ],
    gotchas: [
      'The service normalizes collection responses from the backend — some endpoints return a plain array, others return {results: [], count: N}. The service handles both.',
      'selectedRestaurantId, selectedFranchiseId, selectedBranchId are also saved to localStorage for route context persistence across page refreshes.',
    ],
  },
  {
    id: 'logic-order-flow',
    title: 'How the Full Order Flow Works',
    category: 'Orders',
    summary: 'An order goes through a lifecycle from Placed to Delivered. The owner creates it, assigns a rider, tracks it in real time via WebSocket, and confirms payment. Each stage is a status update on the same order record.',
    endpoints: [
      'POST /restaurants/:id/orders/ — create order',
      'GET /restaurants/:id/orders/ — list orders (paginated)',
      'GET /restaurants/:id/orders/:orderId/ — get order details',
      'PUT /restaurants/:id/orders/:orderId/ — update order (status, rider, payment)',
      'DELETE /restaurants/:id/orders/:orderId/ — delete order',
      'WS ws://host/orders/:orderId/ — real-time order updates',
    ],
    flow: [
      '1. Owner opens Add Order — foods load from GET /restaurants/:id/foods/ grouped by category.',
      '2. Owner searches for a customer by name or phone and selects one.',
      '3. Owner adds food items to the cart, sets quantities.',
      '4. On Place Order: payload is built with customer_code, restaurant_code, items[], fixed fees (delivery=50, platform=10, tax=5), status=Placed, payment_status=Pending.',
      '5. POST to /restaurants/:id/orders/ — order is created. Owner is redirected to order list.',
      '6. Order list shows all orders with status tabs. Owner clicks an order to open details.',
      '7. Order details page connects to WebSocket ws://host/orders/:orderId/ for live updates.',
      '8. Owner assigns a rider by searching the rider list and selecting one — PUT with rider_code.',
      '9. Owner advances status (Accepted → Being Prepared → On The Way → Delivered) — each is a PUT with the new status.',
      '10. Owner confirms payment — PUT with payment_status=Paid.',
      '11. WebSocket pushes any backend-initiated changes (e.g. rider location) to the UI in real time.',
    ],
    decisions: [
      'Delivery fee, platform fee, and tax are fixed constants on the frontend for MVP. No backend pricing engine yet.',
      'Location fields (pickup, dropoff, current) are sent as {lat:0, lng:0} placeholders for now — GPS integration is post-MVP.',
      'Rider assignment is fully manual — the owner picks from a list. There is no automatic dispatch.',
      'Orders are created by the restaurant owner on behalf of the customer for MVP. Customer self-ordering is Phase 5.',
    ],
    gotchas: [
      'The order list endpoint returns either a plain array OR a paginated object depending on backend config. Always use Array.isArray(response) ? response : (response?.results ?? []).',
      'WebSocket auto-reconnects up to 5 times with exponential backoff: 3s, 6s, 9s, 12s, 15s. After that it gives up and shows a stale state.',
      'Incoming WebSocket updates are merged with existing orderData — nested objects (rider, customer) are spread-merged, not replaced entirely.',
    ],
  },
  {
    id: 'logic-rider-shifts',
    title: 'How Rider Shifts Work',
    category: 'Riders',
    summary: 'Shift types are templates defined by the restaurant (e.g. Morning, Evening). A rider starts a shift by selecting a type — this creates a RiderShift instance in the backend with a unique ID. To end it, the rider provides a secret code.',
    endpoints: [
      'GET /restaurants/:id/shift-types/ — load available shift templates',
      'POST /restaurants/:id/rider/:riderId/start-shift/ — start a shift, returns shift object with ID',
      'POST /restaurants/:id/rider-shift/:shiftId/end/ — end a shift with secret code',
      'GET /restaurants/:id/rider-shifts/ — list all shifts for the restaurant',
    ],
    flow: [
      '1. Rider Shifts page loads — all restaurant riders fetched from GET /restaurants/:id/riders/.',
      '2. Shift types fetched from GET /restaurants/:id/shift-types/ — shown in a dropdown per rider.',
      '3. Owner selects a shift type for a rider and clicks Start Shift.',
      '4. POST /restaurants/:id/rider/:riderId/start-shift/ with {shift_type_id} — backend creates a RiderShift record.',
      '5. Response contains the new shift object. The shift ID is stored in per-rider state: riderShiftState[rider.id].activeShiftId.',
      '6. A per-rider timer starts counting up (HH:MM:SS), incrementing every 1000ms.',
      '7. To end the shift, the owner enters a secret code in the modal.',
      '8. POST /restaurants/:id/rider-shift/:shiftId/end/ with {secret_code} — backend validates and closes the shift.',
      '9. Timer stops. Shift state is cleared for that rider. Other riders are unaffected.',
    ],
    decisions: [
      'Per-rider state is a Record<number, {...}> keyed by rider.id — not an array. This means each rider has completely independent shift state and multiple riders can be active simultaneously.',
      'The secret code is not pre-validated on the frontend. It is sent to the backend which decides if it is correct. This was intentional for MVP simplicity.',
      'ShiftType = template (name, duration). RiderShift = actual instance (start time, end time, rider, shift type used).',
    ],
    gotchas: [
      'All per-rider interval timers must be cleared in ngOnDestroy. If the component unmounts while a shift is active, the timer would leak into memory.',
      'NG5002: Angular template parser rejects single-quoted string literals inside single-quoted HTML attribute bindings. E.g. [modalId]="\'start-\' + i" throws a parse error. Solution: move all string-building to TS class methods like startModalKey(i).',
    ],
  },
  {
    id: 'logic-auth-headers',
    title: 'How API Authentication Works',
    category: 'Auth & Routing',
    summary: 'Every API call across all services uses a Token authentication header. The token comes from localStorage. There is no refresh token — if a 401 is received, the user is logged out immediately.',
    endpoints: [
      'POST /auth/login/ — returns token',
      'POST /auth/register/ — returns token',
      'All other endpoints — require Authorization: Token {token}',
    ],
    flow: [
      '1. User logs in via POST /auth/login/ with credentials.',
      '2. Backend returns {token: "..."} which is saved to localStorage under key auth_token.',
      '3. Every service has a getAuthHeaders() method that reads the token from AuthService.getToken().',
      '4. Header is set: Authorization: Token {token.trim()}.',
      '5. For FormData uploads (photos, files), Content-Type is NOT set manually — the browser sets it with the correct multipart boundary.',
      '6. For JSON requests, Content-Type: application/json is set explicitly.',
      '7. If any API call returns 401, AuthService.logout() is called — clears localStorage and navigates to /auth/login.',
    ],
    decisions: [
      'Django REST Framework Token auth (not JWT) is used on the backend. Tokens do not expire by default.',
      'No refresh token pattern. Session ends on 401 or manual logout.',
      'token.trim() is always called because some backends return tokens with trailing whitespace.',
    ],
    gotchas: [
      'Never manually set Content-Type when uploading FormData. Let the browser handle it — if you set it manually the multipart boundary will be missing and the backend will reject the request.',
      'encodeURIComponent() is applied to customer IDs and rider IDs in URL paths because these IDs sometimes contain characters like slashes or special chars that would break the URL.',
    ],
  },
  {
    id: 'logic-food-service',
    title: 'How Food & Category Management Works',
    category: 'Food & Menu',
    summary: 'Foods and categories are scoped per restaurant. FoodService handles both and detects whether to send FormData or JSON based on the data type passed in.',
    endpoints: [
      'GET /restaurants/:id/foods/ — list all foods for a restaurant',
      'POST /restaurants/:id/foods/ — create a food item (FormData with image or JSON)',
      'GET /restaurants/:id/food-categories/ — list categories',
      'POST /restaurants/:id/food-categories/ — create a category',
    ],
    flow: [
      '1. Food list loads on component init — GET /restaurants/:id/foods/ where :id is from the route param.',
      '2. Response is either a plain array or paginated {results: []}. Component handles both.',
      '3. Each food is mapped: id/food_id, name, category_name, price (parseFloat), is_available/available, image/photo_url.',
      '4. To create a food: name and price are required. If an image is included, a FormData payload is sent.',
      '5. FoodService.createFood() detects if data is instanceof FormData — if yes, Content-Type header is omitted.',
      '6. Categories are fetched separately and used to populate dropdowns in the add food form.',
    ],
    decisions: [
      'Food and category creation both hit restaurant-scoped endpoints — there is no global food registry. Each restaurant owns its own menu.',
      'AddOrderService also has a getFoods() method pointing to the same endpoint — this exists for the Add Order flow which needs to list foods for cart selection.',
    ],
    gotchas: [
      'Two services (FoodService and AddOrderService) both call the same GET /restaurants/:id/foods/ endpoint. FoodService is the canonical one for food management. AddOrderService wraps it for the ordering flow.',
    ],
  },
  {
    id: 'logic-customer-edit',
    title: 'How the Edit Customer Dirty Tracking Works',
    category: 'Customers',
    summary: 'The edit form loads the current customer data, snapshots it, and compares every change against the snapshot. The Save button stays disabled until something actually changes — preventing accidental empty saves.',
    endpoints: [
      'GET /customers/:id/ — load customer for pre-filling',
      'PUT /customers/:encodedId/ — save updated customer',
      'PATCH /customers/:encodedId/ — toggle is_active only',
    ],
    flow: [
      '1. Component loads — GET /customers/:id/ fetches the customer.',
      '2. formData is populated and a deep copy is saved as originalData.',
      '3. originalImageUrl is saved from the API response photo_url.',
      '4. Every input has (ngModelChange)="checkDirty()" — every checkbox has (onChange)="checkDirty()".',
      '5. checkDirty() compares each key in formData against originalData.',
      '6. Also checks: did the user select a new File (new image)? Did the user remove the existing image?',
      '7. isDirty = true if any field changed or image changed. Save button [disabled]="!isDirty".',
      '8. On save: payload is built with field name mapping (fullName → name, emailAddress → email, etc.).',
      '9. File objects are excluded from the JSON payload — image upload is separate (not yet wired for edit).',
      '10. PUT /customers/:encodedId/ with the JSON payload. Navigates back on success.',
    ],
    decisions: [
      'Edit uses PUT (full replacement) not PATCH (partial). The full payload is always sent even if only one field changed.',
      'Image editing is tracked for dirty state but the actual file upload on edit is not yet wired to the backend.',
      'Customer IDs are URL-encoded because they can contain special characters.',
    ],
    gotchas: [
      "Angular's change detection does not automatically detect mutations on plain objects. Using a getter (get hasChanges()) was tried first but did not re-evaluate reliably because formData mutations are not tracked as signal changes. Switched to isDirty boolean property updated imperatively on every change event.",
      "PrimeNG p-button [disabled]='true' renders the button visually disabled but does not apply cursor: not-allowed because it sets pointer-events: none which hides the cursor. Workaround: ::ng-deep .p-button:disabled { pointer-events: all !important; cursor: not-allowed !important }",
    ],
  },
  {
    id: 'logic-websocket',
    title: 'How Real-Time Order Updates Work',
    category: 'Orders',
    summary: 'The order details page maintains a live WebSocket connection to receive real-time updates pushed by the backend — rider location changes, status changes, or any update to the order record.',
    endpoints: [
      'WS ws://host/orders/:orderId/ — real-time order channel',
    ],
    flow: [
      '1. Order details component loads — HTTP GET fetches the full order first.',
      '2. connect(orderId) opens a WebSocket to ws://host/orders/:orderId/.',
      '3. On successful open: connectionStatus BehaviorSubject is set to true, reconnectAttempts reset to 0.',
      '4. Incoming messages are pushed to orderUpdates$ BehaviorSubject.',
      '5. Component subscribes to getUpdates() which filters out null values.',
      '6. Incoming update is merged with existing orderData: top-level fields are spread, nested objects (rider, customer) are spread-merged.',
      '7. On close: handleReconnection() is called. If reconnectAttempts < 5, schedules reconnect after (3s * attempts).',
      '8. After 5 failed attempts: gives up, connection stays closed, UI shows last known state.',
      '9. On component destroy: disconnect() is called, WebSocket is completed.',
    ],
    decisions: [
      'Exponential backoff for reconnection: 3s, 6s, 9s, 12s, 15s. Not truly exponential but proportional to attempt count.',
      'Nested object merging prevents a partial WS update (e.g. just a status change) from wiping out the customer or rider data already loaded.',
    ],
    gotchas: [
      'The WebSocket URL is built from enviroment.wsUrl (note: typo in the codebase — "enviroment" not "environment" — this is consistent throughout and must not be changed or imports will break).',
      'webSocket() from rxjs/webSocket is used — not the native WebSocket class. This gives an Observable interface but requires calling .complete() to close cleanly.',
    ],
  },
]
