export type Corrections = "CE"|"C"|""
export type Operations = "+"|"-"|"×"|"÷"
export type Evaluations = "="|"√"|"x²"|"1/x"|"%"
export type MemoryOperations = "MC"|"MR"|"M+"|"M-"|"MS"|"M"
export type PossibleButtonValues =
| number
| Operations
| Corrections
| Evaluations
| MemoryOperations
