import { displayPages } from '../pages/index.js';
import { setURLParams, getURLParams } from '../utils/getUrlParams.js';

export const updateSelectedItems = () => {
    const params = getURLParams();
    const selectedItemsContainer = document.getElementById('selectedItemsContainer');
    selectedItemsContainer.innerHTML = '';

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownId = dropdown.id;
        const selectedValues = new Set(params[dropdownId] || []);

        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            const value = item.getAttribute('data-value');
            const removeBtn = item.querySelector('.remove-btn');
            if (selectedValues.has(value)) {
                item.classList.add('selected');
                removeBtn.classList.remove('hidden');
                addSelectedItemToContainer(selectedItemsContainer, dropdownId, value);
            } else {
                item.classList.remove('selected');
                removeBtn.classList.add('hidden');
            }
        });
    });
    displayPages();
};

export const addSelectedItemToContainer = (container, dropdownId, value) => {
    const item = document.createElement('li');
    item.className = 'selected-item filter-tag-items'; 
    item.textContent = value;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.onclick = () => {
        removeSelectedItem(dropdownId, value);
        updateDropdownItems(document.getElementById(dropdownId));
    };

    item.appendChild(removeBtn);
    container.appendChild(item);
    displayPages();
};

export const removeSelectedItem = (dropdownId, value) => {
    setURLParams(dropdownId, value);
    updateSelectedItems();
    displayPages();
};

export const updateDropdownItems = (dropdown) => {
    const dropdownId = dropdown.id;
    const params = getURLParams();
    const selectedValues = new Set(params[dropdownId] || []);

    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const value = item.getAttribute('data-value');
        item.classList.toggle('selected', selectedValues.has(value));
        const removeBtn = item.querySelector('.remove-btn');
        if (selectedValues.has(value)) {
            item.classList.add('selected');
            removeBtn.classList.remove('hidden');
        } else {
            item.classList.remove('selected');
            removeBtn.classList.add('hidden');
        }
    });
};

export default {
    updateSelectedItems,
    updateDropdownItems,
    removeSelectedItem,
    addSelectedItemToContainer,
}