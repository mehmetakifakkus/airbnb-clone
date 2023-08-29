"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  label: string;
  capital: string[];
  flag: string;
  region: string;
  latlng: [number, number];
};

type Props = {
  value?: CountrySelectValue;
  onChange?: (value: CountrySelectValue) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        value={value}
        options={getAll()}
        isClearable
        onChange={(value) => {
          onChange?.(value as CountrySelectValue);
        }}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex items-center gap-3">
            <span>{option.flag}</span>
            <div>
              <span>{option.label}</span>,
              <span className="text-neutral-400 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "ffe4e6",
          },
        })}
      />
    </div>
  );
}
