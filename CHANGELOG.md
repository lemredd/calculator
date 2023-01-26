## 1.0.0 (2023-01-26)

##### Chores

* **docs:**
  *  use third-party `Vercel` badge (682aab9a)
  *  add more details (301c316f)
* **ui:**
  *  rename color to `police-blue` (7c9ee4a0)
  *  use `Vue` color scheme (d41fbdbc)
  *  adjust neobrutalist shadow offsets (abafcd17)
  *  configure neobrutalist shadow (8b118135)
  *  wrap app and history container (4490b2dd)
  *  add color schemes with custom names (e3ba5219)

##### New Features

* **ui:**
  *  change the logo (4de8d091)
  *  transition hidden history list (4960de6c)
  *  make calculator screens responsive (9f52a29a)
  *  use ocean as border color (a4d6c502)
  *  use mint as container background color (176573e0)
  *  make button to `clearHistory` (62f497b5)
  *  style screens container (20616a30)
  *  use neobrutalist shadow (e9b3ed00)
  *  style scrollbar (c66b34c8)
  *  wrap contents of `.history-list` (df57e5b5)
  *  style `.rim` (9c329b07)
  *  style the parent and `#app` containers (9e93829e)
  *  wrap `Calculator` (7c6f617f)
  *  scroll overflowing history list (c2f5ca7e)
  *  hide button to show history (16cc56d4)
  *  flex the whole `<body>` container (87eee23b)
  *  `teleport` history list (bddbfd50)
* **intg:**  clear `historyList` (51090072)
* **component:**  reverse listed items (0b9ac2e9)

##### Bug Fixes

* **docs:**  add missing reference (b3f72967)
* **ui:**
  *  make text size height responsive (72dc30d7)
  *  use `100%` for heights (0a1f40e6)
  *  limit widths in medium viewport (4328bf79)
*  use proper casing (112cd06f)
* **intg:**
  *  use `operationFromHistory` (67719c5f)
  *  condition by null (9e9c9973)
  *  add to history only if evaluation is `=` (a54212d6)
  *  exclude `%` when saving current entry (60adbd42)
  *  set `lastPassedEntry` manually (8b50c60f)
  *  account `mustClearEntryOnNextAppend` (1bb41ec6)
* **component:**  utilize spread operator (32dbee41)
* **helpers:**  ensure proper throwing of message (2cb1aa12)

##### Refactors

* **ui:**  move styles to external file (f88fce93)

##### Tests

* **intg:**
  *  clear before history recall (1c403b8b)
  *  ensure clearing of `historyList` (cd0dcd83)
  *  find all `.history-item` components (f374c6b7)
  *  mock history container teleport location (2bef60c9)
  *  ensure an edge case in computation (aaf962c6)
* **component:**
  *  ensure proper reverse order (ace3c3fd)
  *  ensure emission to clear history (52c18ae2)
  *  ensure reverse listed items (3564bef9)
* **helpers:**  ensure expression is included (4a23902e)

### 0.5.0 (2023-01-14)

##### Chores

* **lint:**  disable `max-lines` (cae92e28)

##### New Features

* **ui:**
  *  display empty `historyList` (8a95d930)
  *  exclude `no-border` buttons (c7cf18e0)
  *  add some styles (65e201cb)
  *  add overlay (9531f011)
  *  add some styles (a46631dc)
* **intg:**
  *  revert to chosen history (09ecafd3)
  *  add to history list (25d91e9c)
* **component:**
  *  revert to chosen history (c013b6a1)
  *  display history item properly (986b53bc)
  *  allow toggling of history list (08b399bb)

##### Refactors

* **component:**
  *  use `historyItem` (fcf5bbe9)
  *  split `historyItem` (1febe7d7)
* **helpers:**  split into separate file (21893ee0)
* **types:**  split into separate file (c555f553)

##### Code Style Changes

* **intg:**  reduce tabs of `<style>` lines (2acf1521)
* **component:**  reduce tabs of `<style>` lines (fc737db9)

##### Tests

* **intg:**
  *  ensure reverting to chosen history (a7f44255)
  *  ensure adding to history list (8a95c09a)
* **component:**
  *  ensure stubbed component (338eea98)
  *  test `historyItem` proper display (4b1e85ad)
  *  ensure chosen history reversion (dc34cd57)
  *  ensure history items display (e0d51029)
  *  ensure toggling of history list (e957da0f)
* **helpers:**  ensure joining `historyItem` parts (5b3c00ea)

### 0.4.0 (2023-01-07)

##### Chores

* **ui:**
  *  adjust margin (f2b9f4b9)
  *  give distinct class (96112d38)
* **config:**
  *  warn `max-lines` (d7f01f16)
  *  resolve aliases in component unit tests (b1c94061)
* **component:**  prepare cases (e0ece906)
* **intg:**
  *  rename method (19b03afc)
  *  rename state to clear entry (050717c1)
  *  rename a computed state (e4a4cb6f)

##### New Features

* **intg:**
  *  use `previousResult` as `previousEntry` (cc616ac5)
  *  allow incomplete operand evaluation (e1cb9dbf)

##### Bug Fixes

* **ui:**
  *  adjust height (52b64283)
  *  remove absolution of container (7dd2974f)
* **intg:**
  *  split operands in previous expression (fd8ea5f9)
  *  clear `previousExpression` (ef7ab17f)
  *  save `previousEntry` conditionally (112b3687)
  *  provide missing prop (7af96479)
  *  update expression (9920a6dd)
  *  clear `entry` on `operation` modification (1d6fb6a6)
  *  use different condition (2db0a9a4)
  *  use `entry` in `%` evaluation (911d8cee)
  *  use `previousEntry` and `operation` (926eaa86)
  *  save `previousExpression` conditionally (1e610ce3)
  *  nullify entry containers (fc73c286)
  *  save `expressionToEvaluate` (36b37b9b)

##### Refactors

* **component:**
  *  split `expressionToDisplay` (b5fe50f4)
  *  evaluate square root (ce73b9bd)
  *  evaluate square (9fa28a85)
  *  evaluate fraction (291a40a0)
  *  evaluate percentage (79b851cb)
  *  evaluate with equals (5d2d32ea)
  *  use information from parent (b5d3a76c)
  *  evaluate result (44e90583)
* **helper:**  split function into own file (e982c00f)
* **intg:**
  *  make `rightEntry` computed (95adf847)
  *  pass `expressionToEvaluate` (9b7af59f)
  *  unclear `previousResult` optionally (e82d2735)
  *  evaluate continuously (f29360f6)
  *  make a computed value writable (3dadaf00)
  *  save `previousExpressionEvaluated` (6773d967)
  *  remove redundant conditioner (73bf3649)
  *  remove `mustResetOnNextEntry` (b937bd64)
  *  remove `rightEntry` (d91404f2)
* **ui:**  give distinct class (1ab03fb8)

##### Tests

* **component:**
  *  ensure expression to display (ba9d2ce1)
  *  ensure square root evaluation (54a11cf1)
  *  ensure square evaluation (48e2e967)
  *  ensure fraction evaluation (ff10b039)
  *  ensure percentage evaluation (039414d2)
  *  ensure percentage evaluation (5a4375e0)
  *  provide missing props (46e8e11a)
  *  ensure continuous evaluation (ade4c481)
  *  ensure evaluation result emission (a9f10d9e)
  *  ensure distinct class (bd6cff9c)
* **intg:**
  *  change digital button to click (be347457)
  *  rephrase some comment descriptions (2e5fe4f9)
  *  ensure `previousResult` as `previousEntry` (d2cf764c)
  *  ensure incomplete operand evaluation (225262e1)
  *  rename description properly (8a9ed2d7)
  *  split continuous evaluation (c13eebf0)
* **config:**  resolve aliases (14bca696)

### 0.3.0 (2023-01-01)

#### 0.2.2 (2022-12-27)

##### New Features

* **intg:**
  *  clear all values after evaluation (bf649f07)
  *  append  decimal (f4f320ed)
  *  alter `entry` sign (595f2b18)
* **ui:**  put `EntryScreen` to the rightmost side (98f8358a)
* **component:**  emit to alter `entry` sign (8ae66988)

##### Bug Fixes

* **ui:**  use `span` to display value flexibly (2b28459d)

##### Refactors

* **intg:**
  *  move clearing methods above (445deb03)
  *  use `Entries` type (5e34ee30)

##### Tests

* **intg:**
  *  ensure decimal is appended (3b625cab)
  *  ensure proper element selector (54da57f1)
  *  ensure altering sign of `entry` (faf14706)
* **component:**
  *  ensure proper element selector (f7263ef3)
  *  ensure sign altering emission (72439b12)

#### 0.2.1 (2022-12-27)

##### Chores

* **component:**
  *  rename to `ExpressionScreen` (f3211910)
  *  accept string value (6dfd958c)
  *  make `EntryScreen` (27778151)
  *  rename to `EvaluationScreen` (5be27c43)
  *  prepare `OperationalButton` (aba0f92e)
  *  rename to `DigitalButtons` (ac0e3c52)
* **config:**
  *  remove unnecessary option (f700bf66)
  *  require `await` in `async` methods (c5ab3bcd)
  *  allow indented switch statements (552381b8)
  *  turn off explicit `any` warning (7e614e6b)
* **dx:**  recommend `TailwindCSS` extension (445b97b5)
* **types:**
  *  add types for `Entries` (8e9e58da)
  *  collect all `PossibleButtonValues` (6164f7cf)
* **intg:**
  *  cast `evaluatedValue` to string (51887d5a)
  *  prepare using of evaluation helper (904d91e6)
* **helper:**  make expression evaluator a helper (7cf2e626)
* **deps:**  install `math-expression-evaluator` (2f2dce47)
*  adjust spacing (2b874962)

##### Continuous Integration

* **helpers:**  add workflow for helper methods (64e34952)

##### New Features

* **intg:**
  *  set to `0` conditionally (7599cbf7)
  *  evaluate existing operation expression (139e6351)
  *  solve percentage in an expression (5df657e4)
  *  clear screens (2109a519)
  *  obtain `sqrt` of given entry (1511b9ad)
  *  square given entry (ca669b42)
  *  solve for fraction of given entry (755a64af)
  *  calculate percentage (163a9ae6)
  *  save `evaluatedValue` (5f09ecb3)
  *  separate screens (a6c22ad3)
  *  evaluate formed expression (d5a227bb)
  *  prefix with space before appending (345e52bb)
  *  integrate other button types initially (6942087a)
* **ui:**
  *  adjust button markup and some styles (417cdb2f)
  *  use `material-icons` (b08c8da2)
  *  add the rest of the buttons (7f2ef2d5)
  *  prepare button rows (b5ee4b86)
  *  style screens (0608152d)
  *  add initial styles to buttons (d6918d0c)
* **component:**
  *  display evaluated value (26d4a12d)
  *  allow various clearing operations (3669d10a)
  *  make `MemoryButton` (177938a4)
  *  make `CorrectionButton` (9deae04c)
  *  make `EvaluationButton` (f9eacd9a)

##### Bug Fixes

* **helper:**  substitute special characters (cf00bc1e)
* **intg:**  save current entry before replacing (30a5975b)
* **ui:**
  *  persist `evaluationScreen` despite empty (f5de1648)
  *  use a `span` to display evaluation value (dcc93de0)
* **types:**  emit corresponding button value type (a5c91c2d)

##### Other Changes

* **component:**  ensure various clearing emissions (bfc445cd)

##### Refactors

* **intg:**
  *  specialize `expressionToDisplay` (665fc77f)
  *  condition `percent` value (522f415a)
  *  specialize `expressionToDisplay` (e7f8bbe2)
  *  utilize left and right `entries` (3ae4ad27)
  *  save left and right entries (49c830f1)
  *  cast to string when evaluating (1c865d95)
  *  use collected button value types (2ebf50d1)
* **types:**  make button types a dependency (51976f00)

##### Code Style Changes

* **intg:**  reorder code based on type (67a09b6f)

##### Tests

* **intg:**
  *  rename description properly (7afd8f2b)
  *  ensure `0` replacement (849f5f9e)
  *  ensure continuous operation evaluation (c8e76799)
  *  ensure percentage in an expression (a05d6cd1)
  *  rename a wrapper internal properly (5c7917bb)
  *  evaluate continuously (dd5a0248)
  *  ensure continuous evaluation (fc5f9c42)
  *  ensure functionality of `sqrtBtn` (94e91e0f)
  *  ensure functionality of `sqrBtn` (57c3f00b)
  *  ensure functionality of `FractionBtn` (3d8f6db6)
  *  ensure percentage calculation (cb99f397)
  *  ensure proper selector & element (74562dbe)
  *  prepare test for continuous evaluation (d1027369)
  *  ensure evaluated value on entry screen (de3202f3)
  *  ensure entry and evaluation screens (eb695b67)
  *  ensure evaluation integration (ae33d512)
  *  prepare testing for evaluation (ef0a836b)
  *  ensure prefixed spaces (d6ffe081)
  *  prepare test for evaluating expression (c166daa6)
  *  use proper selectors (0ce982e8)
* **unit:**  ensure substituted special characters (e377d848)
* **component:**
  *  ensure proper selector & element (1e13ba76)
  *  ensure `MemoryButton` (624ff90b)
  *  ensure `CorrectionButton` (f79a1382)
  *  ensure `EvaluationButton` (700cb7a2)
  *  prepare unit testing (4d27b23a)

### 0.2.0 (2022-12-24)

##### Chores

* **config:**
  *  remove unnecessary option (f700bf66)
  *  require `await` in `async` methods (c5ab3bcd)
  *  allow indented switch statements (552381b8)
  *  turn off explicit `any` warning (7e614e6b)
* **dx:**  recommend `TailwindCSS` extension (445b97b5)
* **types:**
  *  add types for `Entries` (8e9e58da)
  *  collect all `PossibleButtonValues` (6164f7cf)
* **intg:**
  *  cast `evaluatedValue` to string (51887d5a)
  *  prepare using of evaluation helper (904d91e6)
* **component:**
  *  accept string value (6dfd958c)
  *  make `EntryScreen` (27778151)
  *  rename to `EvaluationScreen` (5be27c43)
  *  prepare `OperationalButton` (aba0f92e)
  *  rename to `DigitalButtons` (ac0e3c52)
* **helper:**  make expression evaluator a helper (7cf2e626)
* **deps:**  install `math-expression-evaluator` (2f2dce47)
*  adjust spacing (2b874962)

##### Continuous Integration

* **helpers:**  add workflow for helper methods (64e34952)

##### New Features

* **intg:**
  *  clear screens (2109a519)
  *  obtain `sqrt` of given entry (1511b9ad)
  *  square given entry (ca669b42)
  *  solve for fraction of given entry (755a64af)
  *  calculate percentage (163a9ae6)
  *  save `evaluatedValue` (5f09ecb3)
  *  separate screens (a6c22ad3)
  *  evaluate formed expression (d5a227bb)
  *  prefix with space before appending (345e52bb)
  *  integrate other button types initially (6942087a)
* **ui:**
  *  adjust button markup and some styles (417cdb2f)
  *  use `material-icons` (b08c8da2)
  *  add the rest of the buttons (7f2ef2d5)
  *  prepare button rows (b5ee4b86)
  *  style screens (0608152d)
  *  add initial styles to buttons (d6918d0c)
* **component:**
  *  display evaluated value (26d4a12d)
  *  allow various clearing operations (3669d10a)
  *  make `MemoryButton` (177938a4)
  *  make `CorrectionButton` (9deae04c)
  *  make `EvaluationButton` (f9eacd9a)

##### Bug Fixes

* **ui:**
  *  persist `evaluationScreen` despite empty (f5de1648)
  *  use a `span` to display evaluation value (dcc93de0)
* **types:**  emit corresponding button value type (a5c91c2d)

##### Other Changes

* **component:**  ensure various clearing emissions (bfc445cd)

##### Refactors

* **intg:**
  *  save left and right entries (49c830f1)
  *  cast to string when evaluating (1c865d95)
  *  use collected button value types (2ebf50d1)
* **types:**  make button types a dependency (51976f00)

##### Tests

* **intg:**
  *  evaluate continuously (dd5a0248)
  *  ensure continuous evaluation (fc5f9c42)
  *  ensure functionality of `sqrtBtn` (94e91e0f)
  *  ensure functionality of `sqrBtn` (57c3f00b)
  *  ensure functionality of `FractionBtn` (3d8f6db6)
  *  ensure percentage calculation (cb99f397)
  *  ensure proper selector & element (74562dbe)
  *  prepare test for continuous evaluation (d1027369)
  *  ensure evaluated value on entry screen (de3202f3)
  *  ensure entry and evaluation screens (eb695b67)
  *  ensure evaluation integration (ae33d512)
  *  prepare testing for evaluation (ef0a836b)
  *  ensure prefixed spaces (d6ffe081)
  *  prepare test for evaluating expression (c166daa6)
  *  use proper selectors (0ce982e8)
* **component:**
  *  ensure proper selector & element (1e13ba76)
  *  ensure `MemoryButton` (624ff90b)
  *  ensure `CorrectionButton` (f79a1382)
  *  ensure `EvaluationButton` (700cb7a2)
  *  prepare unit testing (4d27b23a)
