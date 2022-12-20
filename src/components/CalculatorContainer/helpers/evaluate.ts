import evaluator from "math-expression-evaluator"

export default function(expression: string) {
	return evaluator.eval(expression)
}
