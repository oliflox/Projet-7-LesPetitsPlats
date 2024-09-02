import { displayPages } from '../pages/index.js';
import { setURLParams, getURLParams } from '../utils/getUrlParams.js';

export const updateSelectedItems = (dropdownId, value) => {
    setURLParams(dropdownId, value);
    displayPages();
};

window.removeSelectedItems = (value) => {
    const params = getURLParams();

    for (const key in params) {
        if (params[key].includes(value)) {
            setURLParams(key, value);
            break;
        }
    }
    
    displayPages();
};

export const render = () => {
    const params = getURLParams();
    const listItems = Object.values(params).flat().map(value => `<p class="selected-item">${value}<span onclick="removeSelectedItems('${value}')" class="remove-btn">X</span><p>`).join('');

    return `
        <div class="selected-items" id="selectedItemsContainer">
                ${listItems}
        </div>
    `;
}

export default {
    updateSelectedItems,
    removeSelectedItems,
    render,
}