import evaluator from "math-expression-evaluator"

interface ExpressionError {
	message: string
}

export default function(expression: string) {
	let normalizedExpression = expression

	if(normalizedExpression.includes("×")) normalizedExpression = normalizedExpression.replace("×", "*")
	if(normalizedExpression.includes("÷")) normalizedExpression = normalizedExpression.replace("÷", "/")

	try {
		return evaluator.eval(normalizedExpression)
	} catch (error: unknown) {
		const expressionError = error as ExpressionError
		throw `${expressionError.message} (expression: ${normalizedExpression})`
	}
}
