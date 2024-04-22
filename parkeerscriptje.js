async function initForm(){
    // const suggestedEmployee = localStorage.getItem("employee") || '<ING username>, <lastname>, <firstname>';
    // const employee = prompt("Naam:", suggestedEmployee);
    // localStorage.setItem("employee", employee);

    const suggestedDate = localStorage.getItem("date") || '31-12-2024';
    const date = prompt("Datum:", suggestedDate);
    localStorage.setItem("date", date);

    const suggestedParking = localStorage.getItem("parking");
    const parking = prompt("Parkeerplaats:", suggestedParking);
    localStorage.setItem("parking", parking);


    const FORM_PREFIX = "buildingBlocks:inlineBuildingBlocks:block1:form:";

    // await setupEmployee();
    await setupParking();
    await setFieldValues();
}

async function setupEmployee(){
    document.getElementsByName(`${FORM_PREFIX}fieldRepeater:1:field:fieldContent:field-editor:textfield`)[0].dispatchEvent(new Event('click'));
    document.getElementsByName(`${FORM_PREFIX}fieldRepeater:1:field:fieldContent:field-editor:textfield`)[0].setAttribute('value', employee);


    await new Promise(r => setTimeout(r, 1000));

    Array.from(employee).forEach(char => {

        console.log(char)

        const event = new KeyboardEvent('keyup', {
            key: char,
          });
        document.getElementsByName(`${FORM_PREFIX}fieldRepeater:1:field:fieldContent:field-editor:textfield`)[0].dispatchEvent(event);

    })
    await new Promise(r => setTimeout(r, 10000));
}

async function setupParking(){
    document.getElementsByName(`${FORM_PREFIX}fieldGroupRepeater:1:fieldGroup:fieldRepeater:1:field:fieldContent:field-editor:parkingArea:parkingarea_checkbox`)[0].click();
    document.getElementsByName(`${FORM_PREFIX}fieldRepeater:1:field:fieldContent:field-editor:textfield`)[0].click();

    // Timeout to activate input fields
    await new Promise(r => setTimeout(r, 500));
}


async function setFieldValues(){
    const changeValues = [
        // {name: "employee", element: "fieldRepeater:1:field:fieldContent:field-editor:textfield", value: employee},
        {name: "date", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:1:field:fieldContent:field-editor:datetimepicker", value: date},
        {name: "startTime", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:2:field:fieldContent:field-editor:datetimepicker", value: "08:00"},
        {name: "endTime", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:3:field:fieldContent:field-editor:datetimepicker", value: "09:00"},
        {name: "parking", element: "fieldGroupRepeater:1:fieldGroup:fieldRepeater:1:field:fieldContent:field-editor:parkingArea:textfield", value: parking},
    ]
    
    changeValues.forEach(change => {
        console.log(`Applying ${change.name}`)

        document.getElementsByName(`${FORM_PREFIX}${change.element}`)[0].setAttribute('value', change.value);
    })
}


await fetch('https://raw.githubusercontent.com/timewasternl/parkING/master/parkeerscriptje.js').then(r => r.text()).then(c => c.initForm).then(r => eval(r))