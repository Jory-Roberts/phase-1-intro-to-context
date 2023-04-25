// Your code here
function createEmployeeRecord(employeeInfo) {
    let employeeRecord = {};
    (employeeRecord.firstName = employeeInfo[0]),
        (employeeRecord.familyName = employeeInfo[1]),
        (employeeRecord.title = employeeInfo[2]),
        (employeeRecord.payPerHour = employeeInfo[3]),
        (employeeRecord.timeInEvents = []),
        (employeeRecord.timeOutEvents = []);
    return employeeRecord;
}

function createEmployeeRecords(employeeInfo) {
    return employeeInfo.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(
        (event) => event.date === date
    );
    const timeOut = employeeRecord.timeOutEvents.find(
        (event) => event.date === date
    );

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecord) {
    let wages = employeeRecord.map((employee) => allWagesFor(employee));
    return wages.reduce((total, wage) => total + wage + 0);
}
