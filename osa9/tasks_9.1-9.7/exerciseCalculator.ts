interface exerciseData {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises: Array<number>, target: number): exerciseData=> {

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))