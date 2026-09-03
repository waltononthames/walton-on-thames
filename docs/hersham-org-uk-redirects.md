# hersham.org.uk: Cloudflare redirect configuration

Prepared 4 September 2026 for plan item 1.2 in `docs/hersham-head-term-plan.md`. Everything here is applied in the Cloudflare dashboard on the **hersham.org.uk** zone. Nothing in this repo controls it, which is why it needs writing down.

**Goal:** every request to hersham.org.uk or www.hersham.org.uk lands on the matching page of walton-on-thames.org in **one** 301 hop, targeting the **apex** host.

**Current state (verified 4 September 2026):** `https://hersham.org.uk/parakeets/` returns 301 to `https://www.walton-on-thames.org/hersham/`. Two faults: it goes to the www duplicate rather than the apex, and it discards the path. `www.hersham.org.uk` returns Cloudflare error 522 because no DNS record exists for it.

**Do this in order.** Steps 1 and 2 are prerequisites; the rules in step 4 will not fire without them.

---

## 1. Remove the existing redirect first

The current behaviour comes from a rule already in the zone. Find and delete it, or the new rules may never be reached. Check all three places, because any of them could hold it:

1. **Rules > Redirect Rules** (also listed as Rules > Overview). Look for any rule redirecting to `walton-on-thames.org`.
2. **Bulk Redirects** (account level, under Bulk Redirects in the left sidebar of the account home, not the zone). Check every list for hersham.org.uk entries.
3. **Rules > Page Rules** (legacy). A "Forwarding URL" page rule on `hersham.org.uk/*` is the most likely culprit on an older zone.

Delete what you find. The site is then briefly unreachable on hersham.org.uk until step 4 is saved, which is fine.

## 2. DNS

**DNS > Records.** Both hostnames must resolve through Cloudflare's proxy for redirect rules to run. There is no origin server, so use placeholder addresses.

| Type | Name | Content | Proxy status | TTL |
|---|---|---|---|---|
| AAAA | `@` | `100::` | Proxied (orange cloud) | Auto |
| AAAA | `www` | `100::` | Proxied (orange cloud) | Auto |

`100::` is the IPv6 discard prefix, which is what Cloudflare recommends for redirect-only hostnames. If an `A` record already exists on `@` and works, leave it and only add the `www` record. The proxy status **must** be Proxied on both; a grey cloud means the rules never execute.

Then **SSL/TLS > Edge Certificates**: confirm Universal SSL is active and switch **Always Use HTTPS** on. That handles `http://` requests without spending a redirect rule on them.

## 3. Understand the rule budget before you start

The Free plan allows **10 Single Redirect rules per zone**. The five core rules below fit comfortably; the optional aliases in step 5 spend the rest, so add only the ones you will actually print or say out loud.

Redirect rules are **terminating**: the first rule that matches runs, and no later rule is evaluated. Order therefore matters, and the catch-all must be last.

## 4. The five core rules

**Rules > Redirect Rules > Create rule.** For each one: set the name, choose **Custom filter expression**, click **Edit expression** to paste the expression text directly, then set the "Then" side as given.

Rules 1 and 2 use a **dynamic** target. In the "Then" panel choose **Dynamic** for the URL type and paste the expression into the Expression field. If this zone's dashboard offers only a static URL field with no Dynamic option, stop and use the Bulk Redirects fallback in step 6 instead.

For every rule: **Status code 301**, **Preserve query string enabled**.

---

### Rule 1: Hersham spokes, trailing slash

Name: `Hersham spokes (with slash)`

Expression:

```
http.host in {"hersham.org.uk" "www.hersham.org.uk"} and lower(http.request.uri.path) in {"/burhill-and-golf/" "/development-and-planning/" "/famous-residents/" "/food-and-drink/" "/hersham-green/" "/hersham-lodge-and-hersham-place/" "/history/" "/living/" "/parakeets/" "/queen-victoria-first-steam-train/" "/river-mole-walks/" "/sham-69/" "/st-peters-church/" "/whiteley-village/"}
```

Target URL, Dynamic:

```
concat("https://walton-on-thames.org/hersham", lower(http.request.uri.path))
```

### Rule 2: Hersham spokes, no trailing slash

Name: `Hersham spokes (no slash)`

Same fourteen slugs, without the closing slash. The target appends the slash, so the visitor never sees the extra hop that walton-on-thames.org would otherwise add.

Expression:

```
http.host in {"hersham.org.uk" "www.hersham.org.uk"} and lower(http.request.uri.path) in {"/burhill-and-golf" "/development-and-planning" "/famous-residents" "/food-and-drink" "/hersham-green" "/hersham-lodge-and-hersham-place" "/history" "/living" "/parakeets" "/queen-victoria-first-steam-train" "/river-mole-walks" "/sham-69" "/st-peters-church" "/whiteley-village"}
```

Target URL, Dynamic:

```
concat("https://walton-on-thames.org/hersham", lower(http.request.uri.path), "/")
```

### Rule 3: the station

Name: `Hersham station`

Expression:

```
http.host in {"hersham.org.uk" "www.hersham.org.uk"} and lower(http.request.uri.path) in {"/station" "/station/" "/trains" "/trains/"}
```

Target URL, Static: `https://walton-on-thames.org/hersham-railway-station/`

### Rule 4: things to do

Name: `Hersham things to do`

Expression:

```
http.host in {"hersham.org.uk" "www.hersham.org.uk"} and lower(http.request.uri.path) in {"/things-to-do" "/things-to-do/" "/what-to-do" "/what-to-do/"}
```

Target URL, Static: `https://walton-on-thames.org/things-to-do/hersham/`

### Rule 5: catch-all (must be last)

Name: `Hersham catch-all`

Expression:

```
http.host in {"hersham.org.uk" "www.hersham.org.uk"}
```

Target URL, Static: `https://walton-on-thames.org/hersham/`

This is what serves `hersham.org.uk` itself, and anything mistyped or long since dead. Drag it to the bottom of the rules list after saving. If it sits above rules 1 to 4, they will never run.

---

## 5. Optional short aliases

Only worth adding for a URL you will genuinely print on a leaflet or say aloud. Each costs one of the ten rules. Same pattern as rules 3 and 4: a path list on the left, a static apex URL on the right.

| Paths | Target |
|---|---|
| `/green` `/green/` `/the-green` `/the-green/` | `https://walton-on-thames.org/hersham/hersham-green/` |
| `/planning` `/planning/` | `https://walton-on-thames.org/hersham/development-and-planning/` |
| `/food` `/food/` `/pubs` `/pubs/` `/eat` `/eat/` | `https://walton-on-thames.org/hersham/food-and-drink/` |
| `/whats-on` `/whats-on/` `/events` `/events/` | `https://walton-on-thames.org/whats-on/` |

Insert these above the catch-all.

## 6. Fallback if dynamic targets are unavailable

If the "Then" panel offers no Dynamic option, replace rules 1 and 2 with **Bulk Redirects** (account sidebar > Bulk Redirects > Create list). The Free plan allows 20 redirects, and there are 15 to add. Source and target for each:

```
https://hersham.org.uk/                                  https://walton-on-thames.org/hersham/
https://hersham.org.uk/burhill-and-golf                  https://walton-on-thames.org/hersham/burhill-and-golf/
https://hersham.org.uk/development-and-planning          https://walton-on-thames.org/hersham/development-and-planning/
https://hersham.org.uk/famous-residents                  https://walton-on-thames.org/hersham/famous-residents/
https://hersham.org.uk/food-and-drink                    https://walton-on-thames.org/hersham/food-and-drink/
https://hersham.org.uk/hersham-green                     https://walton-on-thames.org/hersham/hersham-green/
https://hersham.org.uk/hersham-lodge-and-hersham-place   https://walton-on-thames.org/hersham/hersham-lodge-and-hersham-place/
https://hersham.org.uk/history                           https://walton-on-thames.org/hersham/history/
https://hersham.org.uk/living                            https://walton-on-thames.org/hersham/living/
https://hersham.org.uk/parakeets                         https://walton-on-thames.org/hersham/parakeets/
https://hersham.org.uk/queen-victoria-first-steam-train  https://walton-on-thames.org/hersham/queen-victoria-first-steam-train/
https://hersham.org.uk/river-mole-walks                  https://walton-on-thames.org/hersham/river-mole-walks/
https://hersham.org.uk/sham-69                           https://walton-on-thames.org/hersham/sham-69/
https://hersham.org.uk/st-peters-church                  https://walton-on-thames.org/hersham/st-peters-church/
https://hersham.org.uk/whiteley-village                  https://walton-on-thames.org/hersham/whiteley-village/
```

Per redirect, set status 301 and enable **Include subdomains**, **Subpath matching** and **Preserve query string**. Subpath matching is what makes the trailing-slash variant work without a second entry. Keep rule 5 above as the catch-all; bulk redirects are evaluated before single redirect rules, so the catch-all still cleans up the rest.

## 7. Verify

Run these after saving. Every line must show a single 301 straight to the apex host, with no `www.` in the target.

```bash
for u in https://hersham.org.uk/ https://hersham.org.uk/parakeets/ https://hersham.org.uk/parakeets https://www.hersham.org.uk/sham-69/ https://hersham.org.uk/station https://hersham.org.uk/nonsense-path; do printf '%-46s ' "$u"; curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' "$u"; done
```

Expected:

| Request | Result |
|---|---|
| `hersham.org.uk/` | 301 to `https://walton-on-thames.org/hersham/` |
| `hersham.org.uk/parakeets/` | 301 to `https://walton-on-thames.org/hersham/parakeets/` |
| `hersham.org.uk/parakeets` | 301 to `https://walton-on-thames.org/hersham/parakeets/` |
| `www.hersham.org.uk/sham-69/` | 301 to `https://walton-on-thames.org/hersham/sham-69/` |
| `hersham.org.uk/station` | 301 to `https://walton-on-thames.org/hersham-railway-station/` |
| `hersham.org.uk/nonsense-path` | 301 to `https://walton-on-thames.org/hersham/` |

A 522 on the www lines means the DNS record in step 2 is missing or grey-clouded. A redirect to a `www.walton-on-thames.org` target means the old rule from step 1 is still live somewhere.

Then add `hersham.org.uk` as a **Domain property** in Google Search Console, so any links pointing at the domain become visible in the Links report.

## 8. Dependency

Plan item 1.1 makes `www.walton-on-thames.org` 301 to the apex. Until that ships, a stray redirect here that targets www would cost a second hop. Every target above already points at the apex, so the two items are independent and can land in either order.

---

## Appendix: paste-ready brief for Cloudflare's dashboard AI assistant

If you would rather have Cloudflare's own AI assistant build these, open it with the **hersham.org.uk** zone selected and paste the block below. Check what it produces against section 7 before trusting it, and confirm the catch-all ended up last in the list. The assistant cannot delete the old rule for you, so do step 1 by hand first.

```text
On the hersham.org.uk zone I want every request, on both hersham.org.uk and
www.hersham.org.uk, to 301 to walton-on-thames.org in a single hop. Always
target the apex host walton-on-thames.org, never www.walton-on-thames.org.

Please create these Single Redirect rules, in this order, all status code 301
with preserve query string enabled:

1. Name "Hersham spokes (with slash)". Match when the host is hersham.org.uk
   or www.hersham.org.uk and the lowercased URI path is one of:
   /burhill-and-golf/ /development-and-planning/ /famous-residents/
   /food-and-drink/ /hersham-green/ /hersham-lodge-and-hersham-place/
   /history/ /living/ /parakeets/ /queen-victoria-first-steam-train/
   /river-mole-walks/ /sham-69/ /st-peters-church/ /whiteley-village/
   Redirect to the dynamic expression:
   concat("https://walton-on-thames.org/hersham", lower(http.request.uri.path))

2. Name "Hersham spokes (no slash)". Same fourteen paths but without the
   trailing slash. Redirect to the dynamic expression:
   concat("https://walton-on-thames.org/hersham", lower(http.request.uri.path), "/")

3. Name "Hersham station". Paths /station /station/ /trains /trains/
   redirect to https://walton-on-thames.org/hersham-railway-station/

4. Name "Hersham things to do". Paths /things-to-do /things-to-do/
   /what-to-do /what-to-do/ redirect to
   https://walton-on-thames.org/things-to-do/hersham/

5. Name "Hersham catch-all", and this one must be ordered last. Match any
   request where the host is hersham.org.uk or www.hersham.org.uk, and
   redirect to https://walton-on-thames.org/hersham/

Also confirm for me: that proxied DNS records exist for both @ and www (use
AAAA 100:: for any that are missing), that Always Use HTTPS is enabled, and
that rule 5 is last in the evaluation order.
```
