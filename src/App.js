import React from 'react';
import { Checkbox, Dropdown, Input, Menu } from 'antd';
import { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: '다음', value: '다음' },
  { label: '네이버', value: '네이버' },
  { label: '구글', value: '구글' },
  { label: '페이스북', value: '페이스북' },
  { label: '인스타그램', value: '인스타그램' },
  { label: '트위터', value: '트위터' },
  { label: '너구리', value: '너구리' },
];

function Adfilter() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleCheckboxChange = (checkedValues) => {
    // setSelectedOptions(checkedValues);
    console.log('1번');
    console.log('checkedValues', checkedValues);
    console.log('selectedOptions', selectedOptions);
    console.log('filteredOptions', filteredOptions);

    if (checkedValues.length === options.length) {
      // If all options are selected, include the "Select All" checkbox in the selected options
      setSelectedOptions([...checkedValues, 'selectAll']);
    } else if (filteredOptions.length === options.length) {
      console.log('2번');
      console.log('checkedValues', checkedValues);
      console.log('filteredOptions', filteredOptions);
      console.log('selectedOptions', selectedOptions);

      // Remove the "Select All" checkbox from the selected options
      setSelectedOptions(
        checkedValues.filter((value) => value !== 'selectAll')
      );
    } else {
      if (
        checkedValues.every(item => {
          return filteredOptions.some(filteredOptionsItem => {
            return filteredOptionsItem.value === item
          })
        })
      ) {
        console.log('3번 진입');
        const filterSelect = [...selectedOptions,...checkedValues];
        setSelectedOptions(filterSelect);
        console.log('filterSelect', filterSelect);
        console.log('checkedValues', checkedValues);
        console.log('selectedOptions', selectedOptions);
        console.log('filteredOptions', filteredOptions);
      } else {
        //const removeSelect = selectedOptions.findIndex(item => item.value===)
        console.log('4번 진입');
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    if (!visible) {
      setInputValue('');
      setSearchValue('');
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedOptions([
        ...options.map((option) => option.value),
        'selectAll',
      ]);
    } else {
      setSelectedOptions([]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const menu = (
    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
      <Menu>
        <Menu.Item key="search">
          <Input
            className="adSearch"
            placeholder="광고주 검색"
            value={searchValue}
            onChange={handleSearchChange}
            style={{
              marginBottom: 3,
              marginLeft: -12,
              marginRight: -10,
              width: '120px',
            }}
          />
        </Menu.Item>
        {!searchValue && (
          <Menu.Item key="selectAll">
            <Checkbox
              style={{
                marginLeft: -12,
              }}
              checked={selectedOptions.length === options.length + 1}
              indeterminate={
                selectedOptions.length > 0 &&
                selectedOptions.length < options.length + 1
              }
              onChange={handleSelectAll}
            >
              전체 선택
            </Checkbox>
          </Menu.Item>
        )}
        <Menu.Divider style={{ marginTop: -4 }} />
        {filteredOptions.length === 0 ? (
          <div style={{ marginLeft: 10 }}>검색 결과 없음.</div>
        ) : (
          <CheckboxGroup
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            options={filteredOptions}
            value={selectedOptions.filter((value) => value !== 'selectAll')}
            onChange={handleCheckboxChange}
          />
        )}
      </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      open={dropdownVisible}
      onOpenChange={handleDropdownVisibleChange}
      trigger={['click']}
    >
      <Input
        className="disp"
        style={{ width: '130px' }}
        value={`선택 광고주 (${
          selectedOptions.length > options.length
            ? selectedOptions.length - 1
            : selectedOptions.length
        }/${options.length})`}
        onChange={handleInputChange}
        onClick={() => setDropdownVisible(!dropdownVisible)}
        readOnly
      />
    </Dropdown>
  );
}

export default Adfilter;
