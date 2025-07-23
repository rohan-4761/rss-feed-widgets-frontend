import _ from 'lodash'

const compareWidgets = (editedWidgetsObject, savedWidgetObject) => {
    var updatedFields=[];
    var updatedData = {};
    Object.entries(editedWidgetsObject).forEach(([key, value]) => {
        if (!_.isEqual(editedWidgetsObject[key], savedWidgetObject[key])){
            updatedFields.push(key)
            updatedData[key] = value
        }   
    })
    return [updatedFields, updatedData];
}

export default compareWidgets;