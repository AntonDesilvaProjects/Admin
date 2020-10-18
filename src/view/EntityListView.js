
/* 
    columnConfig = [
        {
            title: "Instance Id",
            dataKey = "instance_id"
        }
    ]
*/
export const renderEntityList = (columnConfig, data) => {
    let tableHeaders = `<tr>${columnConfig.map(column => `<th>${column.title}</th>`).join('\n')}</tr>`;
    let tableRows = data.map(dataObj => generateGridRow(dataObj, columnConfig)).join('\n')
    return `
        <table>
            ${tableHeaders}
            ${tableRows}
        </table>
    `
}

generateGridRow = (columnConfig, dataObj) => {
    return `<tr>${columnConfig.map(column => `<td>${dataObj[column.dataKey]}</td>`).join('\n')}</tr>`;
}