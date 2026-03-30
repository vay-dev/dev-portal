# Pendu Points Plan

Last updated: 2026-03-30

## Goal

Define a fair in-app economy for Pendu that supports:

- group upgrades
- boosts
- premium feature unlocks
- cosmetic gifts
- tournament prize flows
- optional creator / winner cashout

This plan is intentionally **not** based on a predatory TikTok-style conversion gap for tournament winnings.

The model below keeps entertainment spend and cash-value rewards separate.

## Core Model

Pendu should use **two currencies**:

### 1. Coins

Coins are the spend currency.

Users get coins by:

- buying them with real money
- receiving platform bonuses
- earning non-cash rewards such as referrals, streaks, promo campaigns

Coins are used for:

- group boosts
- premium themes / cosmetics
- AI recap packs
- premium group features
- gift sending
- tournament entry fees if desired

Coins are **not cashoutable**.

That makes them safe and simple from a platform-risk perspective.

### 2. Diamonds

Diamonds are the earned value currency.

Users should **not** buy diamonds directly.

Diamonds come from:

- tournament prize payouts
- platform rewards
- referral reward campaigns if desired
- receiving gifts from others

Diamonds can be:

- converted to coins
- cashed out to money

This separates:

- convenience / platform utility spending
- real earned value

That split is the cleanest model for Pendu.

## Why This Is Better Than A Single Currency

A single currency creates confusion:

- if people buy it, they assume it has value
- if people can cash it out, they expect fairness
- if the platform heavily discounts cashout, it feels exploitative

Coins + diamonds avoids that confusion.

Clear rule:

- coins are bought and spent
- diamonds are earned and valued

This is more honest for tournament and community features.

## Fairness Principle

Tournament winnings must feel real.

That means:

- no extreme haircut on earned value
- no “buy 1000, cash out 50” style model
- only modest platform fees where they are visible and justified

Recommended rule:

- coins: not cashoutable
- diamonds: cashoutable at a fair rate minus a transparent platform / processing fee

## Recommended Economic Rules

### Coins

Suggested starting rule:

- `₦1000 = 1000 coins`

Keep the buy rate simple and transparent.

Possible coin uses:

- `200 coins` to boost a group in discovery
- `500 coins` for premium group theme pack
- `100 coins` for a gift
- `300 coins` for AI recap credits bundle

### Diamonds

Diamonds represent earned value.

Suggested principles:

- cashout only for earned diamonds
- purchased coins never convert directly to cash
- allow diamonds -> coins conversion if useful

Cashout should be fair, for example:

- winner earns `1000 diamonds`
- platform deducts a small fee, e.g. `5% to 10%`
- payout happens through Paystack transfer

That is acceptable.

The unfair version would be:

- heavy hidden conversion loss
- separate secret rates
- giant haircut between gift spend and tournament cashout

Do not do that for Pendu.

## Tournament Use Case

Tournament flow should work like this:

1. Players pay entry fees in coins or money.
2. Platform computes the prize pool.
3. Platform takes a transparent fee upfront.
4. Winners receive diamonds.
5. Winners either:
   - cash out diamonds
   - convert diamonds to coins
   - keep them for future use

### Example

Ten players join a tournament:

- `10 × ₦500 = ₦5000 pool`
- platform fee `10% = ₦500`
- prize pool after fee = `₦4500`

If using diamonds as payout:

- winner gets `4500 diamonds`
- cashout may deduct only transfer / platform fee according to policy

This feels fair because:

- users understand the fee
- the winner still receives most of the value
- the platform earns in a transparent way

## Gifts Use Case

Gifts fit naturally into the same system.

Flow:

1. User buys coins.
2. User spends coins on gifts.
3. Recipient receives diamonds.

Examples:

- fire
- rocket
- lion
- universe

This works well in:

- tournament streams
- top-performer rewards
- group social status

## What Should Give Coins vs Diamonds

### Give coins for:

- daily login rewards
- referrals
- campaign rewards
- non-cash loyalty rewards
- feature-use promotions

### Give diamonds for:

- tournament prizes
- performance rewards
- community / creator gifts
- top group or top event rewards

This matters because coins are low-risk to issue freely, but diamonds carry financial meaning.

## Wallet Model

Backend should not store this as one raw balance only.

Use a wallet system with clear accounting.

### User wallet fields

Recommended fields:

- `coinBalance`
- `diamondBalance`
- `diamondPendingBalance` if cashout review is needed
- `lifetimeCoinsPurchased`
- `lifetimeCoinsSpent`
- `lifetimeDiamondsEarned`
- `lifetimeDiamondsCashedOut`

### Transactions table

Every movement should be recorded.

Recommended transaction types:

- `coin_purchase`
- `coin_bonus`
- `coin_spend`
- `gift_send`
- `gift_receive`
- `diamond_reward`
- `diamond_cashout_request`
- `diamond_cashout_paid`
- `diamond_to_coin_conversion`
- `tournament_entry`
- `tournament_prize`

Recommended fields:

- `id`
- `userId`
- `type`
- `currency`
- `amount`
- `status`
- `reference`
- `metadata`
- `createdAt`

## Paystack Integration

### For buying coins

Use Paystack payment flow:

- user chooses package
- platform creates payment reference
- webhook confirms payment
- coins credited only after verified success

### For cashing out diamonds

Use Paystack transfer flow:

- user adds payout bank details
- platform validates minimum cashout threshold
- platform creates payout request
- admin/system approves if needed
- transfer initiated through Paystack Transfer API
- wallet updated only after confirmed payout state

## Anti-Abuse Rules

Do not launch this without safeguards.

Minimum rules:

- minimum cashout threshold
- max daily cashout limit
- transfer review / fraud review state
- no cashout for promo-only balances if policy requires
- suspicious gift loops detection
- self-gifting prevention
- duplicate account abuse checks

Tournament-specific safeguards:

- cancel payout for invalid matches / fraud cases
- hold diamonds in pending state until result is locked
- log who funded prize pool and who received it

## Suggested Rollout Order

Do not ship the full economy in one jump.

### Phase A

Ship coins only:

- buy coins
- spend on boosts / premium features / gifts
- no diamonds yet

Why:

- easiest to build
- low regulatory complexity
- validates whether users even want to spend

### Phase B

Add diamonds as earned value:

- rewards
- gifts received
- tournament prize distribution

Still no instant cashout if you want a cautious rollout.

### Phase C

Add cashout:

- payout method management
- payout thresholds
- transfer workflow
- fraud review rules

This should come only after:

- billing works
- wallet ledger is stable
- tournament workflows are stable

## Suggested Product Positioning

The language shown to users should be simple.

### Coins

Describe coins as:

- in-app spend balance
- used for boosts, features, gifts

### Diamonds

Describe diamonds as:

- earned reward value
- received from prizes and gifts
- redeemable subject to payout rules

Avoid vague wording that makes users assume coins are directly redeemable for cash.

## Open Product Decisions

These still need to be locked:

1. Will tournament entry be coins-only, money-only, or either?
2. What exact platform fee applies to prize pools?
3. Will diamonds convert to coins at 1:1 or another rate?
4. What minimum diamond cashout threshold should exist?
5. Are referral rewards coins-only or can some promo rewards be diamonds?
6. Will gifts always create diamonds, or only in certain contexts?
7. Will cashout be automatic or admin-reviewed at first?

## Recommended Final Direction

If Pendu wants a solid and fair model, the strongest direction is:

- `Coins` = bought / bonus / spend currency
- `Diamonds` = earned / reward / cashout currency

With this rule:

- people buy coins for features and gifts
- people earn diamonds for performance, prizes, and gifted support
- tournament value remains credible
- the platform still has a strong business model

That is the version that feels fair, scalable, and usable for Pendu.
