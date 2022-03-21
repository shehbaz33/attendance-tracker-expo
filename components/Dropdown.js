import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import colors from '../assets/colors/colors';
export function Dropdown({value,setValue}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Work from home', value: 'Work from home'},
    {label: 'Work from office', value: 'Work from office'},
    {label: 'Optional holiday', value: 'Optional holiday'},
    {label: 'Sick leave', value: 'Sick leave'},
    {label: 'Wellness Leave', value: 'Wellness Leave'},
    {label: 'Earned Leave', value: 'Earned Leave'},
    {label: 'Maternity Leave', value: 'Maternity Leave'},
    {label: 'Sabbatical Leave', value: 'Sabbatical Leave'},
    {label: 'Present', value: 'Present'},
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={'Update status'}
      placeholderStyle={{
          color: colors.textSecondary,
          fontFamily:'DMSans-Regular',
          fontSize:18
      }}
      listItemLabelStyle={{
        color: colors.textPrimary,
        fontSize:18,
        fontFamily:'DMSans-Regular'
      }}
      labelStyle={{
        color: colors.textPrimary,
        fontSize:18,
        fontFamily:'DMSans-Regular'
      }}
    />
  );
}
