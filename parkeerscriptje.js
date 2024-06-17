const FORM_PREFIX = "buildingBlocks:inlineBuildingBlocks:block1:form:";

const suggestedDate = localStorage.getItem("date") || new Date(Date.now() + ( 3600 * 1000 * 24)).toLocaleDateString('nl-NL');
const date = prompt("Datum:", suggestedDate);
localStorage.setItem("date", date);

await setupParking();
await setFieldValues();

async function setupParking(){
    document.getElementsByName(`${FORM_PREFIX}fieldGroupRepeater:1:fieldGroup:fieldRepeater:1:field:fieldContent:field-editor:parkingArea:parkingarea_checkbox`)[0].click();
    await new Promise(r => setTimeout(r, 1000));
    document.querySelector(`.pss_fieldname_parkingarearef .pss_selectvalue_link`).click();
}

async function setFieldValues(){
    document.querySelector(`.pss_fieldname_internalvisitorref .pss_selectvalue_link`).click();

    const changeValues = [
        {name: "date", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:1:field:fieldContent:field-editor:datetimepicker", value: date},
        {name: "startTime", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:2:field:fieldContent:field-editor:datetimepicker", value: "08:00"},
        {name: "endTime", element: "fieldGroupRepeater:0:fieldGroup:fieldRepeater:3:field:fieldContent:field-editor:datetimepicker", value: "09:00"},
    ]
    
    changeValues.forEach(change => {
        console.log(`Applying ${change.name}`)

        document.getElementsByName(`${FORM_PREFIX}${change.element}`)[0].setAttribute('value', change.value);
    })
}
