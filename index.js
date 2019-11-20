const getMultiplier = fileType => Boolean(fileType === ("doc" || "docs" || "rtf")) ? 1 : 1.2;
const getRate = language => language === "eng" ? 0.12 : 0.05;
const getCost = (multiplier, textLength, rate) => (textLength <= 1000 ? 1000 : textLength) * multiplier * rate;
const getTimeEstimate = function (multiplier, textLength, language) {
    const totalMinutes = Math.ceil(((textLength / (language === "eng" ? 333 : 1333)) * multiplier + 0.5) * 60)
    return totalMinutes < 60 ? 60 : totalMinutes;
}
const milisecPerMin = 60000;
const currentKievTime = new Date((Date.now() + ((new Date()).getTimezoneOffset() + 120) * milisecPerMin));
const getFinishTime = function (time, currentKievTime) {
    let finishTime = new Date(currentKievTime.getTime() + (time * milisecPerMin));
    const workTime = {
        start: 10,
        end: 19,
        hours: 9
    }
    if (time <= workTime.hours &&
        finishTime.getHours() >= workTime.start &&
        finishTime.getHours() < workTime.end &&
        finishTime.getDay() >= 1 &&
        finishTime.getDay() <= 5) {
    } else {
        const workingDaysNeed = time / 60 / workTime.hours;
        const workingHoursLast = workingDaysNeed % 1;
        let weekEnds = 0;
        const totalTimeNeed = (((Math.floor(workingDaysNeed) + weekEnds) * 24) + (workingHoursLast * workTime.hours)) * 60 * milisecPerMin;
        let i = Math.floor(workingDaysNeed);
        let dayOfWeek = currentKievTime.getDay();
        while (i > 0) {
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                dayOfWeek++;
                i--;
            }
            if (dayOfWeek === 0) {
                weekEnds++;
                dayOfWeek++;
            }
            if (dayOfWeek === 6) {
                weekEnds++;
                dayOfWeek = 0;
            }
        }
        finishTime = new Date(currentKievTime.getTime() + totalTimeNeed);
        if (finishTime.getHours() < workTime.start || finishTime.getHours() >= workTime.end) {
            finishTime.setMilliseconds((24 - workTime.hours) * 60 * milisecPerMin);
        }
        if (finishTime.getDay() === 6) {
            finishTime.setMilliseconds(48 * 60 * milisecPerMin)
        } else if (finishTime.getDay() === 0) {
            finishTime.setMilliseconds(24 * 60 * milisecPerMin)
        }
    }
    return finishTime
}
module.exports = {
    getCost,
    getTimeEstimate,
    getFinishTime
};