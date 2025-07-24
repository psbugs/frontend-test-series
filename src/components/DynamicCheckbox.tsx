import { useState } from "react";

const DynamicCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  const [checkboxItems, setCheckboxesItems] = useState([
    { isCheckedItem: false, name: "First" },
    { isCheckedItem: false, name: "Second" },
    { isCheckedItem: false, name: "Third" },
    { isCheckedItem: false, name: "Fourth" },
  ]);

  const handleSelectBtn = () => {
    const newCheckState = !isChecked;
    setIsChecked(newCheckState);

    const updatedCheckboxItems = checkboxItems.map((item) => ({
      ...item,
      isCheckedItem: newCheckState,
    }));

    setCheckboxesItems(updatedCheckboxItems);
  };

  const handleIndividualChange = (index: number) => {
    const updatedCheckboxItems = checkboxItems.map((item, i) =>
      i === index ? { ...item, isCheckedItem: !item.isCheckedItem } : item
    );

    setCheckboxesItems(updatedCheckboxItems);

    // Update isChecked if all are selected or not
    const allChecked = updatedCheckboxItems.every((item) => item.isCheckedItem);
    setIsChecked(allChecked);
  };

  return (
    <div>
      <h2>Checkbox challenge</h2>
      {checkboxItems.map((eachCheckboxItem, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={eachCheckboxItem.isCheckedItem}
            onChange={() => handleIndividualChange(index)}
          />
          {eachCheckboxItem.name}
        </div>
      ))}
      <button onClick={handleSelectBtn}>
        {isChecked ? "Deselect" : "Select"} All
      </button>
    </div>
  );
};

export default DynamicCheckbox;
