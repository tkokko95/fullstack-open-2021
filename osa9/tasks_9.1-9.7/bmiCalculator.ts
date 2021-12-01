const calculateBmi = (height: number, mass: number): string => {
    const heightInMeters = height / 100
    const bmi = mass / (heightInMeters*heightInMeters)

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

console.log(calculateBmi(180, 74))