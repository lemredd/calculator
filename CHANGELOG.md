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
