import { Listbox } from '@headlessui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { getCountries } from 'react-phone-number-input';
import labels from 'react-phone-number-input/locale/ru.json';
import { useAdaptiveMenuPosition } from 'shared/model';
import { twMerge } from 'tailwind-merge';

const labelCountries = getCountries().map((country) => labels[country]);

export const SelectCountryComponent = ({ disabled, name }: any) => {
  const [field, meta, helper] = useField({ name });
  const [country, setCountry] = useState();
  const [position, optionsRef] = useAdaptiveMenuPosition([disabled]);

  if (disabled) {
    return (
      <button
        aria-disabled
        disabled
        className='flex h-10 w-full items-center rounded-md border border-border p-4 text-left text-sm text-form-color'>
        {field.value ? field.value : 'Страна не выбрана'}
      </button>
    );
  }

  return (
    <Listbox
      value={field.value}
      name={name}
      onChange={(val) => {
        setCountry(val);
        helper.setValue(val);
      }}>
      <div className='relative w-full'>
        <Listbox.Button className='flex h-10 w-full items-center rounded-md border border-border p-4 text-left text-sm text-form-color'>
          {field.value}
        </Listbox.Button>
        <Listbox.Options
          ref={optionsRef}
          className={twMerge(
            'scroll absolute z-[899] flex h-80 w-[22.8rem] flex-col gap-y-2 rounded-md border-2 border-border bg-bg px-3',
            position === 'top' ? 'bottom-10' : 'top-10',
          )}>
          {labelCountries.map((country) => (
            <Listbox.Option key={country} value={country} className='w-full'>
              <button className='w-full text-left'>{country}</button>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
