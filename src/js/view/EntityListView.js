/* 
    columnConfig = [
        {
            title: "Instance Id",
            dataKey = "instance_id"
        }
    ]
*/
export const renderEntityList = (parent, columnConfig, data) => {
    let tableHeaders = `<tr>${columnConfig.map(column => `<th>${column.title}</th>`).join('\n')}</tr>`;
    let tableRows = data.map(dataObj => generateGridRow(columnConfig, dataObj)).join('\n')
    const markup =  `
        <div class="data-grid">
            <table>
                <tbody>
                    ${tableHeaders}
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', markup);
}

const generateGridRow = (columnConfig, dataObj) => {
    return `<tr>${columnConfig.map(column => `<td>${dataObj[column.dataKey]}</td>`).join('\n')}</tr>`;
}
