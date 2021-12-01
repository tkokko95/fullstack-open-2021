interface exerciseData {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface exerciseInput {
    dailyExercises: Array<number>,
    target: number
}

const parseArguments = (args: Array<string>): exerciseInput => {
    if (args.length < 4) {
        throw new Error('Must have at least two arguments')
    }

    const target = args[2]
    const exercises = args.slice(3)
    const exercisesNum: Array<number> = []
    exercises.forEach(exercise => {
        if (!isNaN(Number(exercise))) {
            exercisesNum.push(Number(exercise))
        } else {
            throw new Error('All exercise hours must be numbers')
        }
    })

    const targetNum = Number(target)

    if (!isNaN(targetNum)) {
        return {
            dailyExercises: exercisesNum,
            target: targetNum
        }
    } else {
        throw new Error('Target must be a number')
    }

}

const calculateExercises = (exerciseInput: exerciseInput): exerciseData=> {
    const exercises = exerciseInput.dailyExercises
    const target = exerciseInput.target


    const periodLength = exercises.length
    const trainingDays = exercises.filter(exerciseTime => exerciseTime != 0).length
    const average = exercises.reduce((acc, val) => acc + val) / exercises.length
    const success = average >= target
    const diffFromTarget = average / target
    let rating
    let ratingDescription

    if (diffFromTarget >= 1) {
        rating = 3
        ratingDescription = 'Excellent'
    } else if (diffFromTarget >= 0.5) {
        rating = 2
        ratingDescription = 'Not too bad but could be better'
    } else {
        rating = 1
        ratingDescription = 'Poor'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

}

try {
    const exerciseObject = parseArguments(process.argv)
    console.log(exerciseObject)
} catch (err) {
    const errMessage = err instanceof Error ? err.message : 'Something went wrong'
    console.log(errMessage)
}