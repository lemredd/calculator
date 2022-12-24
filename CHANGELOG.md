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

### 0.1.0 (2022-12-17)

##### Chores

* **scripts:**
  *  unautomate pushing of tags (ccc9ff38)
  *  make script for testing components (5aacc6e7)
  *  make initial testing script (45fb801a)
  *  configure release scripts (a04e2c60)
* **config:**
  *  resolve path aliases (cb69b7f7)
  *  add curly spacing lint rule (96c1a258)
  *  add more `vue` linting rules (867a0da3)
  *  use recommended `Vue` lint rules (a0decc2b)
  *  warn unsorted keys in linting (e3f656f9)
  *  parse with typescript (04125f36)
  *  add `function-parens` space rule (3f1d5129)
  *  remove unnecessary inclusion (ee0c0caf)
  *  include `test` directories (91eddb6f)
  *  make alias for `test` location (50a58ab2)
  *  reogranize imports (77f83651)
  *  add `vitest` configuration (6bc9ace5)
  *  use `DOM.Iterable` (aba2b991)
* **dx:**
  *  correct workspace location (03f5c101)
  *  use path aliasing (eafefb2b)
  *  allow viewing of dependency types (69c349b1)
  *  remove pointless issue link (f9867c61)
* **deps:**
  *  remove test dependency (8217fbde)
  *  install unit testing dependencies (b583e8bd)
  *  install changelog generator (7a6f02b3)
  *  use framework parser (5bfe1f57)
* **lint:**
  *  lint unused imports and variables (abd719d7)
  *  setup linting (b2bdb1f7)
*  rename main app file (94ad0636)
*  rename extension (83d7875b)
*  use tabs to indent (2b070b4e)
*  add license (afede40f)
*  setup codebase (461a9987)

##### Continuous Integration

* **intg:**  make workflow for component integration (cf2def85)
*  remove unnecessary workflow (fb075b4e)
*  run general test (ab4d6133)
*  set demo workflow (c719fb6a)
* **component:**
  *  rename workflow (5cd8ac21)
  *  make workflow for component tests (bb8e4c96)

##### Documentation Changes

* **dx:**
  *  add integration testing badge (c6da130d)
  *  add commit scopes for certain frames (8f527dde)
  *  add badge for component unit tests (d174801e)
  *  add scope for UI changes (916808ee)
  *  document conventional commits (68baa733)

##### New Features

* **intg:**
  *  append button value to screen (e61be307)
  *  adhere integration based on test (c28008eb)
* **cmpnt:**  emit button value to screen (13e91108)

##### Bug Fixes

* **scripts:**  escape double quotation (3b49a180)
* **ci:**  group the use of node version (4209fde0)
* **deps:**  install peer dependency (cdf7ec4a)

##### Other Changes

* **dx:**
  *  organize workspace folders (a36c3a6e)
  *  make example code workspace file (a60eb967)
*  change `title` of app (99a155a0)
* **git:**
  *  include `.scss` files (b7b9197d)
  *  add GitHub's generation (4a06bf11)
* **pr:**  setup pull request template (92eef1da)
* **deps:**  configure `TailwindCSS` (deb3494d)

##### Reverts

*  unloosen API usage (967308b5)

##### Code Style Changes

*  use tabs instead of spaces (c8848f23)
*  use `TailwindCSS` directive (f92f3195)
*  import proper file (80701e01)
* **lint:**  fix problems detected by `ESLint` (62737587)

##### Tests

* **config:**
  *  configure integration test (229a7c7b)
  *  adjust component testing location (6934bbed)
  *  configure helper unit testing (1e76db76)
  *  configure component unit testing (eaddbdb0)
  *  use `jsdom` as environment (9188f9a4)
  *  use globals of `vitest` (65183cd8)
* **intg:**  ensure  `CalculatorContainer` (98325a6d)
* **cmpnt:**
  *  ensure displaying of value to screen (a456fd74)
  *  ensure functionality of button (4e58580d)
*  ensure sample component's `innerText` (e102e358)
*  make sample component to test (27617864)
*  utilize `vitest` utilities (0bc36b67)
*  prepare testing of calculator (fb7e0a45)
*  prepare testing of buttons (a3b77e61)
*  use `assert` from `chai` (597e9add)
*  configure framework to test typescript files (9abbaf32)
*  create sample test (876600f1)
*  install `MochaJS` (66259437)
* **deps:**
  *  install `jsdom` (521398b1)
  *  install framework test utilities (d94ac720)
* **refactor:**  loosen API usage (f69b0966)

