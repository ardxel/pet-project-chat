import { Listbox } from '@headlessui/react';
import { useField } from 'formik';
import { useMemo, useRef, useState } from 'react';
import PhoneInput, { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import labels from 'react-phone-number-input/locale/ru.json';
import { useAdaptiveMenuPosition } from 'shared/model';
import { IconWrapper } from 'shared/ui/wrappers';
import { twMerge } from 'tailwind-merge';

const SelectCountryComponent = ({ value, onChange, iconComponent, disabled }) => {
  const [country, setCountry] = useState(value);
  const optionsRef = useRef();
  const position = useAdaptiveMenuPosition(optionsRef);

  const countries = useMemo(() => {
    return getCountries().map((country) => (
      <Listbox.Option key={country} value={country} className='w-full'>
        <button className='w-full text-left'>
          {labels[country]} +{getCountryCallingCode(country)}
        </button>
      </Listbox.Option>
    ));
  }, []);

  if (disabled) return null;

  return (
    <Listbox
      value={value}
      onChange={(val) => {
        setCountry(val);
        onChange(val);
      }}>
      <div className='relative'>
        <Listbox.Button className='flex items-center'>
          <IconWrapper className='h-10 !rounded-none !rounded-l-[5px]'>
            {iconComponent({ country })}
            <span className='ml-1'>+{getCountryCallingCode(value)}</span>
          </IconWrapper>
        </Listbox.Button>
        <Listbox.Options
          ref={optionsRef}
          className={twMerge(
            'scroll absolute z-[899] flex h-80 w-[22.8rem] flex-col gap-y-2 rounded-md border-2 border-border bg-bg px-3',
            position === 'top' ? 'bottom-10' : 'top-10',
          )}>
          {countries}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export const MobileInput = ({ value, onChange, disabled, ...rest }) => {
  return (
    <PhoneInput
      disabled={disabled}
      onChange={(val) => {
        onChange(val);
      }}
      focusInputOnCountrySelection
      limitMaxLength
      onCountryChange={(countryCode) => {
        onChange(countryCode);
      }}
      value={value}
      countrySelectProps={{ disabled, unicodeFlags: !disabled, onChange }}
      countrySelectComponent={SelectCountryComponent}
      defaultCountry='RU'
      numberInputProps={{
        ...rest,
        className:
          'form-input h-10 !rounded-md duration-300 focus:border-blue-500 ' +
          `${!disabled ? '!rounded-none !rounded-r-[5px]' : '!rounded-md'}`,
      }}
    />
  );
};
export const MobileInputWithFormik = ({ name, disabled, ...props }) => {
  const [field, meta, helper] = useField({ name });
  return (
    <MobileInput
      value={field.value}
      onChange={(value) => {
        helper.setValue(value);
      }}
      disabled={disabled}
      {...props}
    />
  );
};
