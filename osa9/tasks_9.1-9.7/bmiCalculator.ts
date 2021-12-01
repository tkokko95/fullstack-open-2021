interface heightAndMass {
    height: number,
    mass: number
}

const verifyArguments = (args:Array<string>): heightAndMass => {
    if (args.length != 4) {
        throw new Error('Incorrect amount of arguments, expected 2')
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3])
        }
    } else {
        throw new Error('All arguments must be numbers')
    }
}

const calculateBmi = (heightAndMass: heightAndMass): string => {

    const bmi = heightAndMass.mass / ((heightAndMass.height / 100) * (heightAndMass.height / 100))

    switch (true) {
        case (bmi < 16.0):
            return ('Underweight (Severe)')
        case (bmi <= 16.9):
            return ('Underweight (Moderate)')
        case (bmi <= 18.4):
            return ('Underweight (Mild)')
        case (bmi <= 24.9):
            return ('Normal')
        case (bmi <= 29.9):
            return ('Overweight')
        case (bmi <= 34.9):
            return ('Obese (Class I)')
        case (bmi <= 39.9):
            return ('Obese (Class II)')
        case (bmi >= 40.0):
            return ('Obese (Class III)')
        default:
            return ('Invalid value')
    }
}

try {
    const data = verifyArguments(process.argv)
    console.log(calculateBmi(data))
} catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Something went wrong'
    console.log(errMessage)
}
