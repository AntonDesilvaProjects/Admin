// render a JSON non-editable view with support for code folding, copy
export const renderJsonView = (json) => {
    const markup = `
    <textarea id="w3review" name="w3review" rows="4" cols="50">
        ${json}
    </textarea>`;
    return markup;
};