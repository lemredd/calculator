import evaluator from "math-expression-evaluator"

export default function(expression: string) {
	let normalizedExpression = expression

	if(normalizedExpression.includes("×")) normalizedExpression = normalizedExpression.replace("×", "*")
	if(normalizedExpression.includes("÷")) normalizedExpression = normalizedExpression.replace("÷", "/")

	return evaluator.eval(normalizedExpression)
}
