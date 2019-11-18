const hasFileType = fileType =>
  Boolean(fileType === ("doc" || "docs" || "rtf"));
  
function getTotalPrice(fileType, text, language) {
    const rate = language === "eng" ? 0.12 : 0.05;
    let price = text.length <= 1000 ? rate * 1000 : rate * text.length
    return Math.ceil(fileType ? price : price += (price / 100) * 20);
}

const getTimeEstimate = function (fileType, text, language) {
    const velocity = language === "eng" ? 333 / 60 : 1333 / 60;
    let time = text.length <= 1000 ? 60 : 30 + (text.length / velocity);
    return Math.ceil(fileType ? time : time += (time / 100) * 20);
}
const getCurrentTimeUTC = () => {new Date((Date.now() + ((new Date()).getTimezoneOffset() + 120) * 60000))};

const getFinishTime = function (time, currentTimeUTC) {
    let finishTime = new Date(currentTimeUTC.getTime() + (time * 60000));
    const workTime = {
        start: 10,
        end: 19,
        hours: 9
    }
    if (time <= workTime.hours &&
        finishTime.getHours() >= workTime.start &&
        finishTime.getHours() <= workTime.end &&
        finishTime.getDay() >= 1 &&
        finishTime.getDay() <= 5) {
    } else {
        const workingDaysNeed = time / 60 / workTime.hours;
        const workingHoursLast = workingDaysNeed % 1;
        let weekEnds = 0;
        const totalCalendarTimeNeed = (((Math.floor(workingDaysNeed) + weekEnds) * 24) + (workingHoursLast * workTime.hours)) * 60 * 60000;
        let i = Math.floor(workingDaysNeed);
        let dayOfWeek = currentTimeUTC.getDay();
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
        finishTime = new Date(currentTimeUTC.getTime() + totalCalendarTimeNeed);
        if (finishTime.getHours() <= workTime.start || finishTime.getHours() >= workTime.end) {
            finishTime = new Date(finishTime.getTime() + ((24 - workTime.hours) * 60 * 60000));
        }
        if (finishTime.getDay() === 6) {
            finishTime = new Date(finishTime.getTime() + ((72 - workTime.hours) * 60 * 60000));
        } else if (finishTime.getDay() === 0) {
            finishTime = new Date(finishTime.getTime() + ((48 - workTime.hours) * 60 * 60000));
        }
    }
    return finishTime
}

module.exports = getTotalPrice;
//export default { getFileType, getTotalPrice, testWork};

//console.log(getFinishTime(1700));

//console.log(getTotalPrice("doc", "dasddadasdsadada", "eng"));